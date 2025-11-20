"use client";
import { formatDistanceToNow } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

import { toast } from "sonner";
import { deletePost } from "../actions/delete-post.action";
import { type PostResponse } from "../actions/get-all-post.action";
import { UpdatePostForm } from "./update-post-form";

type Props = {
  post: PostResponse;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export function PostCard({ post, onDelete, onUpdate }: Props) {
  const toastId = useId();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setIsDeleting(true);
      toast.loading("Deleting post...", { id: toastId });

      await deletePost(post.id);

      toast.success("Post deleted successfully!", { id: toastId });
      onDelete?.();
    } catch (err) {
      const error = err as Error;
      console.error("Failed to delete post:", error);
      toast.error(`Failed: ${error.message}`, {
        id: toastId
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return null;
    }
  };

  return (
    <>
      <Card key={post.id} className={"p-0 flex flex-col gap-y-3"}>
        <CardHeader className="pt-4 pb-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle>{post.postTitle}</CardTitle>
              {post.description && (
                <CardDescription className="mt-2 line-clamp-2">
                  {post.description}
                </CardDescription>
              )}
            </div>
          </div>
          <CardDescription className="p-0 mt-2">
            Created {formatDistanceToNow(new Date(post.createdAt))} ago
          </CardDescription>
          {(post.startDate || post.endDate) && (
            <CardDescription className="p-0 mt-1">
              {post.startDate && `Start: ${formatDate(post.startDate)}`}
              {post.startDate && post.endDate && " • "}
              {post.endDate && `End: ${formatDate(post.endDate)}`}
            </CardDescription>
          )}
        </CardHeader>

        {post.postImageUrl && (
          <div className="px-4">
            <img
              src={post.postImageUrl}
              alt={post.postTitle}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        <Separator />

        <CardContent className="px-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 h-6">
            <Button
              size="sm"
              icon={<TrashIcon />}
              variant={"ghost"}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </Button>

            <Separator orientation="vertical" />

            <Button
              size="sm"
              icon={<PencilIcon />}
              variant={"ghost"}
              onClick={() => setIsEditOpen(true)}
            >
              Edit Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <UpdatePostForm
        post={post}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={onUpdate}
      />
    </>
  );
}
