"use server";

import { getClient } from "@/lib/rpc/server";

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

export async function getPostById(id: string): Promise<PostResponse> {
  const client = await getClient();

  const response = await client.api.posts[":id"].$get({
    param: { id }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch post");
  }

  const postData = (await response.json()) as PostResponse;
  return postData;
}
