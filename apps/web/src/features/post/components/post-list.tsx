"use client";
import { useEffect, useState } from "react";

import { Button } from "@repo/ui/components/button";
import { Loader2 } from "lucide-react";
import { getAllPosts, type PostResponse } from "../actions/get-all-post.action";
import { PostCard } from "./post-card";

export function PostList() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllPosts({
        sort: "desc"
      });
      setPosts(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to load posts");
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refetchKey]);

  const handleRefresh = () => {
    setRefetchKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-destructive">{error}</p>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-muted-foreground">No posts found.</p>
        <Button onClick={handleRefresh} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleRefresh}
            onUpdate={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
}
