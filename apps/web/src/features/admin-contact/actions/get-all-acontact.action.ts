"use server";

import { getClient } from "@/lib/rpc/server";

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface GetContactsQueryParams {
  page?: string | number;
  limit?: string | number;
  sort?: "desc" | "asc";
  search?: string;
}

export interface GetContactsMeta {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface GetContactsResponse {
  data: ContactResponse[];
  meta: GetContactsMeta;
}

export async function getAllContacts(
  queryParams?: GetContactsQueryParams
): Promise<GetContactsResponse> {
  const client = await getClient();

  const response = await client.api.contacts.$get({
    query: {
      page: queryParams?.page?.toString() || "",
      limit: queryParams?.limit?.toString() || "",
      sort: queryParams?.sort || "desc",
      search: queryParams?.search || "",
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch contacts");
  }

  const contactsData = (await response.json()) as GetContactsResponse;
  return contactsData;
}
