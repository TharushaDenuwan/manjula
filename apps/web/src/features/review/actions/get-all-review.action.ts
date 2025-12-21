"use server";

import { getClient } from "@/lib/rpc/server";

export interface ReviewResponse {
  id: string;
  rating: number;
  reviewImageUrl: string | null;
  name: string;
  comment: string | null;
  helpfulCount: number | null;
  status: "pending" | "approved" | "rejected";
  updatedAt: string | null;
  createdAt: string | null;
}

export interface GetReviewsQueryParams {
  page?: string | number;
  limit?: string | number;
  sort?: "desc" | "asc";
  search?: string;
}

export interface GetReviewsMeta {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface GetReviewsResponse {
  data: ReviewResponse[];
  meta: GetReviewsMeta;
}

export async function getAllReviews(
  queryParams?: GetReviewsQueryParams
): Promise<GetReviewsResponse> {
  const client = await getClient();

  const response = await client.api.reviwes.$get({
    query: {
      page: queryParams?.page?.toString() || "",
      limit: queryParams?.limit?.toString() || "",
      sort: queryParams?.sort || "desc",
      search: queryParams?.search || "",
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch reviews");
  }

  const reviewsData = (await response.json()) as GetReviewsResponse;
  return reviewsData;
}
