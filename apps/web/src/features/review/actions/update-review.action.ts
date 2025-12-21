"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface UpdateReviewSchema {
  rating?: number;
  reviewImageUrl?: string | null;
  name?: string;
  comment?: string | null;
  helpfulCount?: number | null;
  status?: "pending" | "approved" | "rejected";
}

export interface ReviewResponse {
  rating: number;
  reviewImageUrl: string | null;
  name: string;
  comment: string | null;
  helpfulCount: number | null;
  status: "pending" | "approved" | "rejected";
}

export async function updateReview(
  id: string,
  data: UpdateReviewSchema
): Promise<ReviewResponse> {
  const client = await getClient();

  const response = await client.api.reviwes[":id"].$patch({
    json: {
      rating: data.rating,
      reviewImageUrl: data.reviewImageUrl,
      name: data.name,
      comment: data.comment,
      helpfulCount: data.helpfulCount,
      status: data.status,
    },
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to update review");
  }

  const reviewData = (await response.json()) as ReviewResponse;

  // Revalidate the page to show the updated review
  revalidatePath("/");
  return reviewData;
}
