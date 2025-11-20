"use client";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Clock, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@repo/ui/components/card";

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
      <Card
        key={post.id}
        className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#D4AF37]/20 flex flex-col p-0 max-w-xs w-full"
      >
        {/* Image Section - At the Top, No Padding */}
        {post.postImageUrl ? (
          <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
            <Image
              src={post.postImageUrl}
              alt={post.postTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-[#D4AF37]/20 to-[#E6C45A]/10 flex items-center justify-center">
            <div className="text-4xl opacity-30">📝</div>
          </div>
        )}

        {/* Content Section - Below Image */}
        <CardHeader className="px-4  pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                {post.postTitle}
              </CardTitle>
              {post.description && (
                <CardDescription className="text-gray-600 leading-snug line-clamp-2 mt-1 text-sm">
                  {post.description}
                </CardDescription>
              )}
            </div>
          </div>

          {/* Date Information */}
          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#D4AF37]/20">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
              <span className="truncate">Created {formatDistanceToNow(new Date(post.createdAt))} ago</span>
            </div>
            {(post.startDate || post.endDate) && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">
                  {post.startDate && formatDate(post.startDate)}
                  {post.startDate && post.endDate && " → "}
                  {post.endDate && formatDate(post.endDate)}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Action Buttons - Beautified */}
        <CardContent className="px-4 pb-3 ">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              icon={<PencilIcon className="w-3.5 h-3.5" />}
              onClick={() => setIsEditOpen(true)}
              className="flex-1 h-8 bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-semibold text-xs transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Edit
            </Button>
            <Button
              size="sm"
              icon={<TrashIcon className="w-3.5 h-3.5" />}
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-all transform hover:scale-105 font-semibold text-xs"
            >
              Delete
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
