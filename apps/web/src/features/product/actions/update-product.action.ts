"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface UpdateProductSchema {
  productImageUrl?: string | null;
  productName?: string;
  description?: string | null;
  price?: string | null;
  manufactureDate?: string | null;
  expirationDate?: string | null;
}

export interface ProductResponse {
  id: string;
  organizationId: string | null;
  userId: string;
  productImageUrl: string | null;
  productName: string;
  description: string | null;
  price: string | null;
  manufactureDate: string | null;
  expirationDate: string | null;
  updatedAt: string | null;
  createdAt: string | null;
}

export async function updateProduct(
  id: string,
  data: UpdateProductSchema
): Promise<ProductResponse> {
  const client = await getClient();

  const response = await client.api.products[":id"].$patch({
    json: {
      productImageUrl: data.productImageUrl,
      productName: data.productName,
      description: data.description,
      price: data.price,
      manufactureDate: data.manufactureDate,
      expirationDate: data.expirationDate
    },
    param: { id }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to update product");
  }

  const productData = (await response.json()) as ProductResponse;

  // Revalidate the page to show the updated product
  revalidatePath("/");
  return productData;
}
