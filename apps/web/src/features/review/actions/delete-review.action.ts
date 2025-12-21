"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export async function deleteReview(id: string) {
  const client = await getClient();

  const response = await client.api.reviwes[":id"].$delete({
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to delete review");
  }

  // Revalidate the page to reflect the deletion
  revalidatePath("/");
}
