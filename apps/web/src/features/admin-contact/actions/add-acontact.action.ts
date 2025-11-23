"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface AddContactSchema {
  name: string;
  email: string;
  phone: string;
  message: string;
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

export async function addContact(
  data: AddContactSchema
): Promise<ContactResponse> {
  const client = await getClient();

  const response = await client.api.contacts.$post({
    json: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to create contact");
  }

  const contactData = (await response.json()) as ContactResponse;

  // Revalidate the page to show the new contact
  revalidatePath("/");
  return contactData;
}
