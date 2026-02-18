import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  console.log("Webhook received. Signature present:", !!signature);

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log("Webhook signature verified. Event type:", event.type);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    console.error("Body preview:", body.substring(0, 50));
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      console.error("No order_id in session metadata");
      return NextResponse.json({ received: true }); // Still acknowledge receipt
    }

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Failed to update order:", updateError.message);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 },
      );
    }

    // Construct base URL from the request itself – always correct
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    console.log("Triggering PDF generation at:", `${baseUrl}/api/generate-pdf`);

    // Trigger PDF generation asynchronously (don't await)
    fetch(`${baseUrl}/api/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRIPE_WEBHOOK_SECRET}`,
      },
      body: JSON.stringify({ orderId }),
    }).catch((err) => {
      console.error("Failed to trigger PDF generation:", err);
    });
  }

  return NextResponse.json({ received: true });
}
