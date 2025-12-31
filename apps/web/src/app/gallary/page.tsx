"use client";
import {
  ChevronLeft,
  ChevronRight,
  Columns2,
  Grid3x3,
  Pause,
  Play,
  Rows3,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [layout, setLayout] = useState("masonry");
  const [direction, setDirection] = useState("next");

  // Lightbox / modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // keep the main gallery in sync with last viewed image
    setCurrentIndex(lightboxIndex);
  };

  const lightboxPrev = () =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const lightboxNext = () => setLightboxIndex((i) => (i + 1) % images.length);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen]);

  // Touch/swipe handlers
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0]?.clientX ?? null);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) lightboxPrev();
    else if (dx < -50) lightboxNext();
    setTouchStartX(null);
  };

  const images = [
    { id: 1, url: "/assets/1.JPG" },
    { id: 2, url: "/assets/2.JPG" },
    { id: 3, url: "/assets/5.JPG" },
    { id: 4, url: "/assets/6.JPG" },
    { id: 5, url: "/assets/p4.JPG" },
    { id: 6, url: "/assets/p8.JPG" },
    { id: 7, url: "/assets/p9.JPG" },
    { id: 8, url: "/assets/p17.JPG" },
    { id: 9, url: "/assets/new/4.JPG" },
    { id: 10, url: "/assets/new/5.JPG" },
    { id: 11, url: "/assets/new/p1.JPG" },
    { id: 12, url: "/assets/new/p2.JPG" },
    { id: 13, url: "/assets/new/p6.JPG" },
    { id: 14, url: "/assets/new/p10.JPG" },
    { id: 15, url: "/assets/new/p11.JPG" },
    { id: 16, url: "/assets/new/p12.JPG" },
    { id: 17, url: "/assets/new/p13.JPG" },
    { id: 18, url: "/assets/new/p15.JPG" },
    { id: 19, url: "/assets/new/p17.JPG" },
    { id: 20, url: "/assets/new/p18.JPG" },
  ];

  useEffect(() => {
    if (!isAutoPlay || layout !== "slideshow") return;
    const timer = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, images.length, layout]);

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  const SlideshowLayout = () => (
    <div className="relative group mb-8">
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden dark:bg-slate-800 bg-white dark:shadow-2xl shadow-md">
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <img
                src={image.url}
                alt={`Image ${image.id}`}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => openLightbox(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 animate-slideUp" />
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 dark:bg-white/10 bg-white/50 dark:hover:bg-white/20 hover:bg-gray-100 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 dark:bg-white/10 bg-white/50 dark:hover:bg-white/20 hover:bg-gray-100 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute top-4 right-4 z-30 dark:bg-white/10 bg-white/50 dark:hover:bg-white/20 hover:bg-gray-100 backdrop-blur-md p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          {isAutoPlay ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white" />
          )}
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-1 dark:bg-gray-700/30 bg-gray-200 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#E4BF3C] to-purple-400 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
          ></div>
        </div>
        <div className="absolute top-4 left-4 z-30 dark:bg-white/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full dark:text-white text-gray-800 font-semibold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 px-4 md:px-0 scroll-smooth mt-6">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 group ${index === currentIndex ? "ring-2 ring-[#E4BF3C] scale-105" : "opacity-60 hover:opacity-100"}`}
          >
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-[#E4BF3C]/20"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const GridLayout = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          onClick={() => openLightbox(index)}
          className="group relative overflow-hidden rounded-xl dark:bg-slate-800 bg-white aspect-square cursor-pointer transform transition-all duration-500 hover:scale-105 animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/80 dark:via-black/20 dark:to-transparent bg-gradient-to-t from-white/70 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4" />
        </div>
      ))}
    </div>
  );

  const MasonryLayout = () => (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          onClick={() => openLightbox(index)}
          className="group relative overflow-hidden rounded-xl dark:bg-slate-800 bg-white mb-4 md:mb-6 break-inside-avoid cursor-pointer transform transition-all duration-500 hover:shadow-2xl animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/80 dark:via-black/20 dark:to-transparent bg-gradient-to-t from-white/70 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4" />
        </div>
      ))}
    </div>
  );

  const ListLayout = () => (
    <div className="space-y-4 md:space-y-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group flex gap-4 md:gap-6 dark:bg-slate-800/50 bg-white/50 backdrop-blur rounded-xl overflow-hidden hover:bg-slate-800 transition-all duration-300 animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative w-32 md:w-48 h-24 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-zoom-in"
              onClick={() => openLightbox(index)}
            />
          </div>
          <div className="flex flex-col justify-center py-4 pr-4 md:pr-8 flex-1">
            <h3 className="dark:text-white text-gray-900 font-bold text-lg md:text-xl mb-2 group-hover:text-[#E4BF3C] transition-colors">
              {/* title removed */}
            </h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base">
              {/* description removed */}
            </p>
          </div>
          <div className="hidden md:flex items-center pr-4">
            <ChevronRight className="text-gray-500 group-hover:text-[#E4BF3C] transition-colors" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-white via-gray-50 to-white mb-5">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl dark:opacity-5 opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl dark:opacity-5 opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#E4BF3C] rounded-full mix-blend-multiply filter blur-3xl dark:opacity-5 opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 pt-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto mb-8 flex justify-center gap-3 flex-wrap animate-fadeIn">
          <button
            onClick={() => {
              setLayout("slideshow");
              setIsAutoPlay(true);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${layout === "slideshow" ? "bg-[#E4BF3C] text-white shadow-lg shadow-[0_10px_15px_-3px_rgba(228,191,60,0.5)]" : "dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            <Columns2 size={18} /> Slideshow
          </button>
          <button
            onClick={() => setLayout("grid")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${layout === "grid" ? "bg-[#E4BF3C] text-white shadow-lg shadow-[0_10px_15px_-3px_rgba(228,191,60,0.5)]" : "dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            <Grid3x3 size={18} /> Grid
          </button>
          <button
            onClick={() => setLayout("masonry")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${layout === "masonry" ? "bg-[#E4BF3C] text-white shadow-lg shadow-[0_10px_15px_-3px_rgba(228,191,60,0.5)]" : "dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            <Rows3 size={18} /> Masonry
          </button>

          {/* Small theme hint on the gallery controls for convenience */}
          <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400 px-2"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          {layout === "slideshow" && <SlideshowLayout />}
          {layout === "grid" && <GridLayout />}
          {layout === "masonry" && <MasonryLayout />}
          {layout === "list" && <ListLayout />}
        </div>
      </div>
      {/* Lightbox / Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-black/60 text-gray-800 dark:text-white z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={lightboxPrev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/60 text-gray-800 dark:text-white z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center">
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].title}
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-md shadow-2xl"
              />
            </div>

            <button
              onClick={lightboxNext}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/60 text-gray-800 dark:text-white z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="mt-3 text-center text-sm text-gray-100 dark:text-gray-300">
              <div className="text-xs text-gray-200/70 mt-2">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
