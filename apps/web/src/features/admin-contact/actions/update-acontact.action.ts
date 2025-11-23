"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface UpdateContactSchema {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  updatedAt: string | null;
  createdAt: string | null;
}

export async function updateContact(
  id: string,
  data: UpdateContactSchema
): Promise<ContactResponse> {
  const client = await getClient();

  const response = await client.api.contacts[":id"].$patch({
    json: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    },
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to update contact");
  }

  const contactData = (await response.json()) as ContactResponse;

  // Revalidate the page to show the updated contact
  revalidatePath("/");
  return contactData;
}
