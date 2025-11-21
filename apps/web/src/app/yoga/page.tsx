// app/yoga/page.tsx

"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function YogaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/assets/yoga1.png", alt: "Yoga 1" },
    { src: "/assets/yoga2.png", alt: "Yoga 2" },
    { src: "/assets/yoga3.png", alt: "Yoga 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      {/* FULLSCREEN BACKGROUND SLIDESHOW – NOW REALLY WORKS */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <Image
              key={index}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover brightness-75 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Dark overlay + big text */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-6 drop-shadow-2xl">
              YOGA
            </h1>
            <p className="text-3xl md:text-5xl font-light tracking-wide drop-shadow-xl">
              Training für Körper, Geist & Seele
            </p>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* TWO BUTTONS */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Link
              href="/kontakt"
              className="group block bg-white rounded-3xl p-12 shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 border border-amber-100 hover:border-[#D7B11E]"
            >
              <h3 className="text-4xl md:text-4xl font-bold text-[#D7B11E] mb-6">
                Individuelle Anfrage
              </h3>
              <p className="text-gray-700 text-lg mb-8">
                Privatstunden, Personal-Coaching oder maßgeschneiderte Programme
              </p>
              <span className="inline-flex items-center text-[#D7B11E] font-bold text-xl group-hover:translate-x-4 transition">
                Jetzt anfragen <ArrowRight className="ml-3 w-7 h-7" />
              </span>
            </Link>

            <Link
              href="/team-events"
              className="group block bg-[#D7B11E] rounded-3xl p-12 shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500"
            >
              <h3 className="text-4xl font-bold text-white mb-6">
                Team-Events
              </h3>
              <p className="text-amber-50 text-lg mb-8">
                Firmen-Yoga, Workshops & Teambuilding mit Achtsamkeit
              </p>
              <span className="inline-flex items-center text-white font-bold text-xl group-hover:translate-x-4 transition">
                Mehr erfahren <ArrowRight className="ml-3 w-7 h-7" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
