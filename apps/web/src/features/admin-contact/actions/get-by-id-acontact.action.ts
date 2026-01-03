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

export async function getContactById(id: string): Promise<ContactResponse> {
  const client = await getClient();

  const response = await client.api.contacts[":id"].$get({
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch contact");
  }

  const contactData = (await response.json()) as ContactResponse;
  return contactData;
}
