"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface AddProductSchema {
  productImageUrl: string | null;
  productName: string;
  description: string | null;
  price: string | null;
  quantity: number | null;
  manufactureDate: string | null;
  expirationDate: string | null;
}

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

export async function addProduct(
  data: AddProductSchema
): Promise<ProductResponse> {
  const client = await getClient();

  const response = await client.api.products.$post({
    json: {
      productImageUrl: data.productImageUrl,
      productName: data.productName,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      manufactureDate: data.manufactureDate,
      expirationDate: data.expirationDate
    }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to create product");
  }

  const productData = (await response.json()) as ProductResponse;

  // Revalidate the page to show the new product
  revalidatePath("/");
  return productData;
}
