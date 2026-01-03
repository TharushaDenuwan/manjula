"use client";

import { AddNewReview } from "@/features/review/components/add-new-review";
import { ReviewList } from "@/features/review/components/review-list";
import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { Separator } from "@repo/ui/components/separator";
import { useState } from "react";

export default function ReviewManagementPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewCreated = () => {
    // Trigger refresh of the review list
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <AppPageShell
            title="Manage Customer Reviews"
            description="Review, approve, reject, and manage customer feedback"
            actionComponent=""
          />
          <div>
            <AddNewReview onSuccess={handleReviewCreated} />
          </div>
        </div>

        <Separator />

        <ReviewList key={refreshKey} />
      </div>
    </PageContainer>
  );
}
