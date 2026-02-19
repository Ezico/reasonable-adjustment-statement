import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  generatePersonalLetter,
  generateFormalReport,
} from "@/lib/generate-statement";
import type { IntakeFormData } from "@/lib/types";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Admin client for all DB and storage operations (bypasses RLS)
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

  // 1. Fetch order using admin client
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

  // 2. Generate HTML
  const html =
    format === "formal_report"
      ? generateFormalReport(intakeData)
      : generatePersonalLetter(intakeData);

  // 3. Generate PDF with chrome-aws-lambda + puppeteer-core
  let pdfBuffer: Buffer;
  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
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

  // 4. Log buffer info
  console.log(`PDF buffer size: ${pdfBuffer.length} bytes`);
  console.log(
    `PDF first 20 bytes (hex): ${pdfBuffer.slice(0, 20).toString("hex")}`,
  );

  // 5. Upload to Supabase Storage using admin client
  const fileName = `statement-${orderId}.pdf`;
  console.log(`Uploading to statements bucket as ${fileName}`);

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

  // 6. Get public URL
  const { data: urlData } = supabaseAdmin.storage
    .from("statements")
    .getPublicUrl(fileName);
  const pdfUrl = urlData.publicUrl;

  // 7. Update order status to 'generated' and store PDF URL
  await supabaseAdmin
    .from("orders")
    .update({
      status: "generated",
      pdf_url: pdfUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  // 8. Send email with PDF attachment + download link
  try {
    const base64Content = pdfBuffer.toString("base64");
    console.log(`Base64 attachment length: ${base64Content.length}`);

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "ClearGuide <onboarding@resend.dev>",
      to: [order.email],
      subject: "Your Reasonable Adjustment Statement",
      html: `
        <p>Dear ${intakeData.individualName},</p>
        <p>Your Reasonable Adjustment Statement is now ready.</p>
        <p>If the attachment does not work, you can download it directly here:</p>
        <p><a href="${pdfUrl}">Download your statement</a></p>
        <p>Best regards,<br/>The ClearGuide Team</p>
      `,
      attachments: [
        {
          filename: `Reasonable_Adjustment_Statement_${orderId}.pdf`,
          content: base64Content,
        },
      ],
    });

    if (emailError) throw emailError;

    // 9. Mark as delivered
    await supabaseAdmin
      .from("orders")
      .update({ status: "delivered", updated_at: new Date().toISOString() })
      .eq("id", orderId);
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
  }

  return NextResponse.json({ success: true, orderId });
}
