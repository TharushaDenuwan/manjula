"use client";

import { AddNewPost } from "@/features/post/components/add-new-post";
import { PostList } from "@/features/post/components/post-list";
import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { Separator } from "@repo/ui/components/separator";
import { useState } from "react";

export default function PostManagementPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    // Trigger refresh of the post list
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <AppPageShell
            title="Manage All Posts"
            description="Create, edit, and manage your posts"
            actionComponent=""
          />
          <div>
            <AddNewPost onSuccess={handlePostCreated} />
          </div>
        </div>

        <Separator />

        <PostList key={refreshKey} />
      </div>
    </PageContainer>
  );
}
