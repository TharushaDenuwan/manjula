// app/yoga/page.tsx

"use client";

import Image from "next/image";
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

      {/* YOGA POLICY SECTION */}
      <section className="bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-amber-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#D7B11E] dark:text-[#E6C45A] mb-3">
                Yoga Sessions (Samstag)
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7B11E] to-transparent mx-auto"></div>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg font-medium text-center">
                Wir bieten Yoga-Sessions jeden Samstag an.
              </p>

              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#D7B11E] dark:bg-[#E6C45A]"></div>
                  <span>Die Einheiten finden vor Ort statt.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#D7B11E] dark:bg-[#E6C45A]"></div>
                  <span>
                    Es werden sowohl private Einzelstunden als auch
                    Gruppensessions angeboten.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#D7B11E] dark:bg-[#E6C45A]"></div>
                  <span>
                    Die Teilnahme ist ausschließlich nach telefonischer
                    Terminvereinbarung möglich.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#D7B11E] dark:bg-[#E6C45A]"></div>
                  <span>
                    Uhrzeiten und Ablauf werden individuell bzw. je nach
                    Gruppengröße festgelegt.
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-amber-100 dark:border-gray-700">
                <p className="text-center text-base font-medium text-gray-800 dark:text-gray-200">
                  Für Terminvereinbarungen bitten wir um telefonische
                  Kontaktaufnahme.
                </p>
                <div className="mt-6 text-center">
                  <a
                    href="tel:+436648865343"
                    className="inline-flex items-center gap-2 bg-[#D7B11E] hover:bg-[#C5A01B] dark:bg-[#E6C45A] dark:hover:bg-[#D7B11E] text-white dark:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +43 664 88653430
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
