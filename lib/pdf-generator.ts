// lib/pdf-generator.ts
export async function generatePDF(html: string): Promise<Buffer> {
  const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`api:${process.env.PDFSHIFT_API_KEY}`).toString("base64")}`,
    },
    body: JSON.stringify({
      source: html,
      format: "A4",
      //   print_background: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PDF generation failed: ${error}`);
  }

  const pdfBuffer = Buffer.from(await response.arrayBuffer());
  return pdfBuffer;
}
