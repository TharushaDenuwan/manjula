"use client";

import { addReview } from "@/features/review/actions/add-review.action";
import {
  getAllReviews,
  type ReviewResponse,
} from "@/features/review/actions/get-all-review.action";
import { Button } from "@repo/ui/components/button";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ReviewSection() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    reviewImageUrl: null as string | null,
  });

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getAllReviews({ limit: 10, sort: "desc" });
      // Filter only approved reviews
      const approvedReviews = response.data.filter(
        (review) => review.status === "approved"
      );
      setReviews(approvedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Auto-scroll logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPos = scrollContainer.scrollTop;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPos += 0.5; // Adjust speed here
        if (
          scrollPos >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollPos = 0; // Reset to top
        }
        scrollContainer.scrollTop = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, reviews]); // Re-run when reviews change to handle height updates

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addReview({
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment,
        reviewImageUrl: formData.reviewImageUrl,
        helpfulCount: 0,
      });

      // Reset form
      setFormData({
        name: "",
        rating: 5,
        comment: "",
        reviewImageUrl: null,
      });

      // Refresh reviews
      await fetchReviews();
      alert("Vielen Dank für Ihre Bewertung!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Fehler beim Senden der Bewertung. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({
    rating,
    onRatingChange,
    interactive = false,
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex gap-0.5 sm:gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              star <= rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white mb-3 sm:mb-4">
            Kundenbewertungen
          </h2>
          <p className="text-[#D4AF37] text-base sm:text-lg md:text-xl">
            Was unsere Kunden sagen
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Side - Review Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-[#D4AF37]/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white mb-4 sm:mb-6">
              Bewertung schreiben
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                  placeholder="Ihr Name"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Bewertung *
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) =>
                    setFormData({ ...formData, rating })
                  }
                  interactive
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Kommentar
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Teilen Sie Ihre Erfahrung..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Wird gesendet..." : "Bewertung absenden"}
              </Button>
            </form>
          </motion.div>

          {/* Right Side - Reviews List */}
          <motion.div
            className="space-y-4 sm:space-y-6 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white mb-4 sm:mb-6">
              Alle Bewertungen ({reviews.length})
            </h3>

            {/* Reviews List with Smoke Effect */}
            <div className="relative">
              {/* Top Smoke Gradient */}
              <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-gray-50 via-gray-50/60 to-transparent dark:from-gray-800 dark:via-gray-800/60 z-10 pointer-events-none" />

              {/* Reviews List */}
              <div
                ref={scrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-4 sm:py-6 md:py-8"
              >
                {reviews.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 md:py-16 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg px-4">
                      Noch keine Bewertungen vorhanden. Seien Sie der Erste!
                    </p>
                  </div>
                ) : (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-base sm:text-lg shrink-0">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white">
                              {review.name}
                            </h4>
                            {review.createdAt && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "de-DE",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      {review.comment && (
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {review.comment}
                        </p>
                      )}
                    </motion.div>
                  ))
                )}
              </div>

              {/* Bottom Smoke Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-t from-gray-50 via-gray-50/60 to-transparent dark:from-gray-800 dark:via-gray-800/60 z-10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
