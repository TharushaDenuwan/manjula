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
  manufactureDate: string | null;
  expirationDate: string | null;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface GetProductsQueryParams {
  page?: string | number;
  limit?: string | number;
  sort?: "desc" | "asc";
  search?: string;
}

export interface GetProductsMeta {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface GetProductsResponse {
  data: ProductResponse[];
  meta: GetProductsMeta;
}

export async function getAllProducts(
  queryParams?: GetProductsQueryParams
): Promise<GetProductsResponse> {
  const client = await getClient();

  const response = await client.api.products.$get({
    query: {
      page: queryParams?.page?.toString() || "",
      limit: queryParams?.limit?.toString() || "",
      sort: queryParams?.sort || "desc",
      search: queryParams?.search || ""
    }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch products");
  }

  const productsData = (await response.json()) as GetProductsResponse;
  return productsData;
}
