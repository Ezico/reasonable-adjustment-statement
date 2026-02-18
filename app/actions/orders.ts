// lib/orders.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import type { IntakeFormData } from "@/lib/types";

export async function createOrder(data: {
  email: string;
  intakeData: IntakeFormData;
  outputFormat: string;
}) {
  const supabase = createClient();

  // Merge outputFormat into intakeData
  const intakeDataWithFormat = {
    ...data.intakeData,
    output_format: data.outputFormat,
  };

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      email: data.email,
      intake_data: intakeDataWithFormat,
      status: "pending_payment",
      amount: 5000, // £50.00 in pence
    })
    .select("id")
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Failed to create order: " + error.message);
  }

  return order.id;
}

export async function getOrder(orderId: string) {
  const supabase = createClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) return null;
  return order;
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  updates?: Record<string, any>,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status, ...updates })
    .eq("id", orderId);

  if (error) throw new Error("Failed to update order: " + error.message);
}
