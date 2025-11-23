"use server";

import { getClient } from "@/lib/rpc/server";

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

export async function getOrderById(id: string): Promise<OrderResponse> {
  const client = await getClient();

  const response = await client.api.orders[":id"].$get({
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch order");
  }

  const orderData = (await response.json()) as OrderResponse;
  return orderData;
}
