"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface UpdatePostSchema {
  postImageUrl?: string | null;
  postTitle?: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface PostResponse {
  id: string;
  organizationId: string | null;
  userId: string;
  postImageUrl: string | null;
  postTitle: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  updatedAt: string | null;
  createdAt: string | null;
}

export async function updatePost(
  id: string,
  data: UpdatePostSchema
): Promise<PostResponse> {
  const client = await getClient();

  const response = await client.api.posts[":id"].$patch({
    json: {
      postImageUrl: data.postImageUrl,
      postTitle: data.postTitle,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate
    },
    param: { id }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to update post");
  }

  const postData = (await response.json()) as PostResponse;

  // Revalidate the page to show the updated post
  revalidatePath("/");
  return postData;
}
