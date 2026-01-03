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

export interface GetPostsQueryParams {
  page?: string | number;
  limit?: string | number;
  sort?: "desc" | "asc";
  search?: string;
}

export interface GetPostsMeta {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface GetPostsResponse {
  data: PostResponse[];
  meta: GetPostsMeta;
}

export async function getAllPosts(
  queryParams?: GetPostsQueryParams
): Promise<GetPostsResponse> {
  const client = await getClient();

  const response = await client.api.posts.$get({
    query: {
      page: queryParams?.page?.toString() || "",
      limit: queryParams?.limit?.toString() || "",
      sort: queryParams?.sort || "desc",
      search: queryParams?.search || ""
    }
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch posts");
  }

  const postsData = (await response.json()) as GetPostsResponse;
  return postsData;
}
