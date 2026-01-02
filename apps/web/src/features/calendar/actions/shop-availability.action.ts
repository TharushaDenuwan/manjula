"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface ShopClosedDay {
  id: string;
  startDate: string;
  endDate: string;
  reason: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export async function getShopClosedDays(): Promise<ShopClosedDay[]> {
  const client = await getClient();
  const response = await client.api["shop-availability"].$get();

  if (!response.ok) {
    throw new Error("Failed to fetch shop closed days");
  }

  return await response.json() as ShopClosedDay[];
}

export async function addShopClosedDays(data: {
  startDate: string;
  endDate: string;
  reason?: string;
}) {
  const client = await getClient();
  const response = await client.api["shop-availability"].$post({
    json: data,
  });

  if (!response.ok) {
    const error = await response.json() as { message?: string };
    throw new Error(error.message || "Failed to block days");
  }

  revalidatePath("/admin/calendar");
  revalidatePath("/massage"); // revalidate user calendar page
  return await response.json();
}

export async function deleteShopClosedDays(id: string) {
  const client = await getClient();
  const response = await client.api["shop-availability"][":id"].$delete({
    param: { id },
  });

  if (!response.ok) {
    throw new Error("Failed to remove blocked days");
  }

  revalidatePath("/admin/calendar");
  revalidatePath("/massage");
  return true;
}
