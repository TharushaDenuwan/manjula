"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface AddOrderSchema {
  productName: string;
  description: string | null;
  price: string | null;
  quantity: number | null;
  name: string;
  email: string;
  contactNo: string;
}

export interface OrderResponse {
  id: string;
  productName: string;
  description: string | null;
  price: string | null;
  quantity: number | null;
  name: string;
  email: string;
  contactNo: string;
  updatedAt: string | null;
  createdAt: string | null;
}

export async function addOrder(
  data: AddOrderSchema
): Promise<OrderResponse> {
  const client = await getClient();

  const response = await client.api.orders.$post({
    json: {
      productName: data.productName,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      name: data.name,
      email: data.email,
      contactNo: data.contactNo,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to create order");
  }

  const orderData = (await response.json()) as OrderResponse;

  // Revalidate the page to show the new order
  revalidatePath("/");
  return orderData;
}
