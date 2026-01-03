"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  const client = await getClient();

  const response = await client.api.posts[":id"].$delete({
    param: { id }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to delete post");
  }

  // Revalidate the page to reflect the deletion
  revalidatePath("/");
}
