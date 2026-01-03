"use server";

import { getClient } from "@/lib/rpc/server";

export interface ProductResponse {
  id: string;
  organizationId: string | null;
  userId: string;
  productImageUrl: string | null;
  productName: string;
  description: string | null;
  price: string | null;
  quantity: number | null;
  manufactureDate: string | null;
  expirationDate: string | null;
  updatedAt: string | null;
  createdAt: string | null;
}

export async function getProductById(id: string): Promise<ProductResponse> {
  const client = await getClient();

  const response = await client.api.products[":id"].$get({
    param: { id }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch product");
  }

  const productData = (await response.json()) as ProductResponse;
  return productData;
}
