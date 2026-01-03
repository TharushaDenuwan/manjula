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

export async function getReviewById(id: string): Promise<ReviewResponse> {
  const client = await getClient();

  const response = await client.api.reviwes[":id"].$get({
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch review");
  }

  const reviewData = (await response.json()) as ReviewResponse;
  return reviewData;
}
