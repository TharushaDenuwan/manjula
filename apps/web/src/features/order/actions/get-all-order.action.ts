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
  address: string;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface GetOrdersQueryParams {
  page?: string | number;
  limit?: string | number;
  sort?: "desc" | "asc";
  search?: string;
}

export interface GetOrdersMeta {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface GetOrdersResponse {
  data: OrderResponse[];
  meta: GetOrdersMeta;
}

export async function getAllOrders(
  queryParams?: GetOrdersQueryParams
): Promise<GetOrdersResponse> {
  const client = await getClient();

  const response = await client.api.orders.$get({
    query: {
      page: queryParams?.page?.toString() || "",
      limit: queryParams?.limit?.toString() || "",
      sort: queryParams?.sort || "desc",
      search: queryParams?.search || "",
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch orders");
  }

  const ordersData = (await response.json()) as GetOrdersResponse;
  return ordersData;
}
