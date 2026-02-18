// app/actions/stripe.ts
"use server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function startCheckoutSession(orderId: string) {
  const supabase = createClient();

  // Fetch the order to pre‑fill the customer email
  const { data: order } = await supabase
    .from("orders")
    .select("email")
    .eq("id", orderId)
    .single();

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    customer_email: order?.email || undefined,
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Reasonable Adjustment Statement",
            description:
              "A professionally drafted Reasonable Adjustment Statement grounded in the UK Equality Act 2010, tailored to your neurodivergence profile and workplace or academic needs.",
          },
          unit_amount: 5000, // £50.00 in pence
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      order_id: orderId,
    },
  });

  return session.client_secret;
}
