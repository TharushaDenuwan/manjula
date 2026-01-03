"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface AddReviewSchema {
  rating: number;
  reviewImageUrl: string | null;
  name: string;
  comment: string | null;
  helpfulCount: number | null;
}

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

export async function addReview(
  data: AddReviewSchema
): Promise<ReviewResponse> {
  const client = await getClient();

  const response = await client.api.reviwes.$post({
    json: {
      rating: data.rating,
      reviewImageUrl: data.reviewImageUrl,
      name: data.name,
      comment: data.comment,
      helpfulCount: data.helpfulCount,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to create review");
  }

  const reviewData = (await response.json()) as ReviewResponse;

  // Revalidate the page to show the new review
  revalidatePath("/");
  return reviewData;
}
