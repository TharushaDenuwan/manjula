"use client";

import { getAllPosts, PostResponse } from "@/features/post/actions/get-all-post.action";
import { useEffect, useState } from "react";
import { DiscountPostCard } from "./discount-post-card";

export function DiscountPosts() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsData = await getAllPosts({ limit: 4, sort: "desc" });
        setPosts(postsData.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#0F172A] dark:text-white mb-3">
          Aktuelle Angebote
        </h2>
        <p className="text-[#D4AF37] dark:text-[#E6C45A] text-center text-lg mb-12">
          Spezielle Aktionen & Rabatte
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post, index) => (
            <DiscountPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
