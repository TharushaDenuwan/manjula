"use client";

import { PostResponse } from "@/features/post/actions/get-all-post.action";
import { Tag } from "lucide-react";
import Image from "next/image";

interface DiscountPostCardProps {
  post: PostResponse;
  index: number;
}

export function DiscountPostCard({ post, index }: DiscountPostCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Discount Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span>Angebot</span>
        </div>
      </div>

      {/* Post Image */}
      <div className="relative w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {post.postImageUrl ? (
          <Image
            src={post.postImageUrl}
            alt={post.postTitle}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5">
            <Tag className="w-8 h-8 text-[#D4AF37]" />
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-bold text-[#0F172A] dark:text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300 min-h-[2.5rem]">
          {post.postTitle}
        </h3>

        {/* Description */}
        {post.description && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Date Range */}
        {(post.startDate || post.endDate) && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              {post.startDate && (
                <span className="font-medium">
                  {formatDate(post.startDate)}
                </span>
              )}
              {post.startDate && post.endDate && (
                <span className="mx-1">-</span>
              )}
              {post.endDate && (
                <span className="font-medium">{formatDate(post.endDate)}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37] transition-all duration-300" />
    </div>
  );
}
