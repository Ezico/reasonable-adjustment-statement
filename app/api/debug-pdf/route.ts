import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  generatePersonalLetter,
  generateFormalReport,
} from "@/lib/generate-statement";
import type { IntakeFormData } from "@/lib/types";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const supabase = createClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const intakeData = order.intake_data as IntakeFormData;
  const format = intakeData.output_format || "personal_letter";
  const html =
    format === "formal_report"
      ? generateFormalReport(intakeData)
      : generatePersonalLetter(intakeData);

  let pdfBuffer: Buffer;
  try {
    // Launch with default options (Puppeteer knows its own Chromium path)
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Add these for Windows
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
  } catch (err) {
    console.error("PDF generation failed:", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="statement-${orderId}.pdf"`,
    },
  });
}
