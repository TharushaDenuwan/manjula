"use client";

import { PostResponse } from "@/features/post/actions/get-all-post.action";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import Image from "next/image";

interface DiscountPostCardProps {
  post: PostResponse;
  index: number;
}

export function DiscountPostCard({ post, index }: DiscountPostCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="group relative flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#D4AF37]/30 dark:hover:border-[#D4AF37]/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-auto sm:h-[220px]"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Discount Badge - Absolute */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-[#D4AF37] px-2.5 py-1 rounded-md shadow-sm border border-[#D4AF37]/20 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
          <Tag className="w-3 h-3" />
          <span>Deal</span>
        </div>
      </div>

      {/* Post Image (Left Side) - 40% width */}
      <div className="relative w-full sm:w-[40%] h-48 sm:h-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
        {post.postImageUrl ? (
          <Image
            src={post.postImageUrl}
            alt={post.postTitle}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/10 to-[#E6C45A]/20">
            <Tag className="w-10 h-10 text-[#D4AF37]/40" />
          </div>
        )}
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
      </div>

      {/* Content (Right Side) - 60% width */}
      <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-r from-transparent to-gray-50/50 dark:to-gray-900/50">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white leading-tight line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
            {post.postTitle}
          </h3>

          {/* Description */}
          {post.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        {/* Footer Area */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            {/* Dates */}
            {(post.startDate || post.endDate) && (
              <div className="flex flex-col gap-1">
                {post.startDate && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                    <CalendarDays className="w-3 h-3" />
                    <span className="font-semibold">
                      Start: {formatDate(post.startDate)}
                    </span>
                  </div>
                )}
                {post.endDate && (
                  <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-400">
                    <CalendarDays className="w-3 h-3" />
                    <span className="font-semibold">
                      Ende: {formatDate(post.endDate)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#D4AF37] text-white p-2 rounded-lg shadow-md shadow-[#D4AF37]/20 group-hover:scale-110 transition-transform duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
