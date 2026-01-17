"use client";

import {
  getAllPosts,
  PostResponse,
} from "@/features/post/actions/get-all-post.action";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DiscountPostCard } from "./discount-post-card";

export function DiscountPosts() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 1 : 2;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsData = await getAllPosts({ limit: 10, sort: "desc" });
        setPosts(postsData.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, posts.length - itemsPerPage);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, posts.length - itemsPerPage);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  if (loading) {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#0F172A] dark:text-white mb-2">
              Aktuelle Angebote
            </h2>
            <p className="text-[#D4AF37] dark:text-[#E6C45A] text-xl font-medium">
              Exklusive Deals für Sie
            </p>
          </div>

          {/* Navigation Buttons */}
          {posts.length > itemsPerPage && (
            <div className="flex gap-2 justify-center mt-6 md:absolute md:right-0 md:bottom-1 md:mt-0">
              <button
                onClick={handlePrev}
                className="bg-white dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-white dark:hover:bg-[#D4AF37] text-gray-700 dark:text-gray-300 rounded-full p-3 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-white dark:hover:bg-[#D4AF37] text-gray-700 dark:text-gray-300 rounded-full p-3 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden -mx-4 px-4 pb-10">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6 [transform:translateX(calc(var(--slide-index)*-1*(100%+24px)))] md:[transform:translateX(calc(var(--slide-index)*-1*(50%+12px)))]"
            style={
              {
                "--slide-index": currentIndex,
              } as any
            }
          >
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="w-full md:w-[calc(50%-12px)] flex-shrink-0"
              >
                <DiscountPostCard post={post} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
