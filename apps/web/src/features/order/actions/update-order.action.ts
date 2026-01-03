"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface UpdateOrderSchema {
  productName?: string;
  description?: string | null;
  price?: string | null;
  quantity?: number | null;
  name?: string;
  email?: string;
  contactNo?: string;
}

export interface OrderResponse {
  productName: string;
  description: string | null;
  price: string | null;
  quantity: number | null;
  name: string;
  email: string;
  contactNo: string;
}

export async function updateOrder(
  id: string,
  data: UpdateOrderSchema
): Promise<OrderResponse> {
  const client = await getClient();

  const response = await client.api.orders[":id"].$patch({
    json: {
      productName: data.productName,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      name: data.name,
      email: data.email,
      contactNo: data.contactNo,
    },
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to update order");
  }

  const orderData = (await response.json()) as OrderResponse;

  // Revalidate the page to show the updated order
  revalidatePath("/");
  return orderData;
}
