import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  generatePersonalLetter,
  generateFormalReport,
} from "@/lib/generate-statement";
import type { IntakeFormData } from "@/lib/types";
import { generatePDF } from "@/lib/pdf-generator";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.STRIPE_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await request.json();
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  // Fetch order
  const { data: order, error: fetchError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (fetchError || !order) {
    console.error("Order fetch error:", fetchError);
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const intakeData = order.intake_data as IntakeFormData;
  const format = intakeData.output_format || "personal_letter";

  // Generate HTML
  const html =
    format === "formal_report"
      ? generateFormalReport(intakeData)
      : generatePersonalLetter(intakeData);

  // Generate PDF via cloud API
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await generatePDF(html);
  } catch (err) {
    console.error("PDF generation failed:", err);
    await supabaseAdmin
      .from("orders")
      .update({ status: "failed" })
      .eq("id", orderId);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }

  // Upload to Supabase Storage
  const fileName = `statement-${orderId}.pdf`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("statements")
    .upload(fileName, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    console.error("Storage upload failed:", uploadError);
    await supabaseAdmin
      .from("orders")
      .update({ status: "failed" })
      .eq("id", orderId);
    return NextResponse.json(
      { error: "Storage upload failed" },
      { status: 500 },
    );
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("statements")
    .getPublicUrl(fileName);
  const pdfUrl = urlData.publicUrl;

  // Update order status
  await supabaseAdmin
    .from("orders")
    .update({ status: "generated", pdf_url: pdfUrl })
    .eq("id", orderId);

  // Send email
  try {
    await resend.emails.send({
      from: "ClearGuide <onboarding@resend.dev>",
      to: [order.email],
      subject: "Your Reasonable Adjustment Statement",
      html: `
        <p>Dear ${intakeData.individualName},</p>
        <p>Your Reasonable Adjustment Statement is ready.</p>
        <p><a href="${pdfUrl}">Download your statement</a></p>
      `,
      attachments: [
        {
          filename: `statement-${orderId}.pdf`,
          content: pdfBuffer.toString("base64"),
        },
      ],
    });
    await supabaseAdmin
      .from("orders")
      .update({ status: "delivered" })
      .eq("id", orderId);
  } catch (emailError) {
    console.error("Email failed:", emailError);
  }

  return NextResponse.json({ success: true });
}
