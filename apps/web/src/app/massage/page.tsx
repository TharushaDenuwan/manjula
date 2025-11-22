"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Heart,
  Leaf,
  MessageCircle,
  Move,
  Sparkles,
  Target,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MassagePage() {
  // Sample images from local assets
  const carouselImages = [
    "/assets/p17.JPG",
    "/assets/p8.JPG",
    "/assets/3.JPG",
    "/assets/5.JPG",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);
  const services = [
    {
      id: 1,
      name: "SHIROABHYANGA",
      subtitle: "ACHTSAME FREIHEIT",
      duration: "1 Stunde",
      description:
        "Intensive Kopf- Nacken- Schultermassage. Verspannungen, Kopflastigkeit und Blockaden lösen sich. Der Kopf fühlt sich frei und beweglich an. Entspannt, beruhigt und sorgt für besseren Schlaf.",
      icon: Leaf,
    },
    {
      id: 2,
      name: "NATURKRAFT",
      subtitle: "KRÄUTERSTEMPEL MASSAGE",
      duration: "1 Stunde",
      description:
        "Warme heiß gemachte Kräuterstempel massieren die wertvollen ätherischen Öle in ihre Haut ein. Handverlesene Kräuter schenken ihnen Vitalität und Kraft. Mit angemessenem Druck, rhythmischen und kreisenden Bewegungen wird ihr Körper entspannt und sie bekommen wieder neue Lebensenergie.",
      icon: Wind,
    },
    {
      id: 3,
      name: "ABHYANGA",
      subtitle: "GENUSSVOLLE HARMONIE",
      duration: "1 Stunde",
      durationLong: "1 1/2 Stunden (inkl. Kopf oder Fußreflexzonen)",
      description:
        "Ein auf Ihre Bedürfnisse abgestimmtes Kräuteröl und Massagetechnik sind Ausdruck von Individualität. Die Anregung der Selbstheilungskräfte und die entgiftende Wirkung vermitteln ein Gefühl von Ausgeglichenheit, Ruhe und Harmonie",
      icon: Heart,
    },
    {
      id: 4,
      name: "VITALE KOMBI-MASSAGE",
      subtitle: "FUSSREFLEXZONEN + RÜCKENMASSAGE",
      duration: "1 Stunde",
      description: "Fußreflexzonen Massage + Rückenmassage",
      icon: Zap,
    },
    {
      id: 5,
      name: "INTENSIVE GELENKS-MASSAGE",
      subtitle: "MOBILITÄT UND KRAFT",
      duration: "1 1/2 Stunden",
      description:
        "Die intensive Massage und Dehnung löst Verspannungen und steigert die Gelenkigkeit.",
      icon: Move,
    },
    {
      id: 6,
      name: "PROBLEMZONEN BEHANDLUNG",
      subtitle: "GEZIELTE THERAPIE",
      duration: "1 Stunde",
      description:
        "Eine Massage je nach Schwerpunkt, spezielle Massagegriffe lösen Verspannungen, vitalisiert und steigert die Selbstheilungskräfte.",
      icon: Target,
    },
    {
      id: 7,
      name: "MARMA PUNKT THERAPIE",
      subtitle: "TIEFE ENERGIEERZEUGUNG",
      duration: "1 1/2 Stunden",
      description:
        "Intensiv wird der Körper durchmassiert. Spezielle traditionelle Massagetechnik zur Auflösung auch sehr lang zurückliegender Blockaden. Marmapunkte sind Verbindungsstellen zwischen Körper und Bewusstsein. Durch intensive, spezielle Massage von Kopf bis Fuß kann somit der Zugang zu unserem Energiesystem geschaffen werden. Körperliche und emotionale Blockaden werden aufgelöst und die Energien können wieder fließen. Ich werde durch meine Therapie alle ihre 116 (!) Meridiane aktivieren und zu neuen Funktionen animieren.",
      icon: Sparkles,
    },
  ];

  const pricingPlans = [
    {
      duration: "1 Stunde",
      price: "€ 80,-",
      subtitle: "Pro Behandlung",
      optimalFor: [
        "SHIROABHYANGA - ACHTSAME FREIHEIT",
        "NATURKRAFT - KRÄUTERSTEMPEL MASSAGE",
        "VITALE KOMBIMASSAGE",
        "PROBLEMZONEN BEHANDLUNG",
      ],
    },
    {
      duration: "1 1/2 Stunden",
      price: "€ 120,-",
      subtitle: "Pro Behandlung",
      optimalFor: [
        "ABHYANGA - GENUSSVOLLE HARMONIE",
        "INTENSIVE GELENKSMASSAGE",
        "MARMA PUNKT THERAPIE",
      ],
    },
    {
      duration: "2 Stunden",
      price: "€ 140,-",
      subtitle: "Pro Behandlung",
      upgrade: true,
      description: "für alle Anwendungen",
      optimalFor: "Optimal für einen noch intensiveren Effekt",
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section with Sliding Carousel */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Image Carousel Background */}
        <div className="absolute inset-0 z-0">
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100" />

          {/* Carousel Container */}
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full will-change-transform"
              style={{
                transform: `translateX(calc(-100% * ${currentSlide} / ${carouselImages.length}))`,
                width: `${carouselImages.length * 100}%`,
              }}
            >
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-full flex-shrink-0"
                  style={{ width: `${100 / carouselImages.length}%` }}
                >
                  <img
                    src={image}
                    alt={`Massage ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Additional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10" />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-30 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 z-30 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Schenken Sie sich Zeit & Ihrem
              <br />
              Körper Wohlgefühl!
            </h1>

            {/* Separator Line */}
            <div className="w-24 h-0.5 bg-white mx-auto my-6" />

            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
              Wählen Sie eine meiner speziellen Anwendungen, oder vertrauen Sie
              mir, Ihnen diese Entscheidung situationsbedingt und taggenau für
              Sie zu treffen...
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isLastItem = index === services.length - 1;
              const itemsInLastRow = services.length % 3;
              const shouldCenter = isLastItem && itemsInLastRow === 1;

              return (
                <Card
                  key={service.id}
                  className={`group bg-white rounded-xl border border-gray-200 hover:border-[#D4AF37]/40 hover:shadow-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${
                    shouldCenter ? "lg:col-start-2" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/20 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 font-medium">
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed text-center">
                      {service.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <p className="text-sm text-gray-600">
                        Sie sollten sich {service.duration} Zeit nehmen.
                      </p>
                    </div>

                    {/* Long Duration Note for ABHYANGA */}
                    {service.durationLong && (
                      <div className="pt-2">
                        <p className="text-xs text-gray-500 text-center italic">
                          ({service.durationLong})
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Preise & Pakete
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wählen Sie das perfekte Paket für Ihr Wohlbefinden
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`
                  relative group
                  ${plan.upgrade ? "md:-mt-4 md:mb-4" : ""}
                  animate-in fade-in slide-in-from-bottom-4
                `}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Popular Badge */}
                {plan.upgrade && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] text-[#0F172A] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                      Empfohlen
                    </div>
                  </div>
                )}

                <Card
                  className={`
                    relative h-full bg-white rounded-2xl border overflow-hidden
                    ${
                      plan.upgrade
                        ? "border-[#D4AF37] shadow-2xl ring-2 ring-[#D4AF37]/20 scale-105"
                        : "border-gray-200 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-2xl"
                    }
                    transition-all duration-500 hover:-translate-y-2
                  `}
                >
                  {/* Header with gradient */}
                  <div
                    className={`relative ${plan.upgrade ? "bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent" : "bg-gradient-to-br from-gray-50 to-transparent"} pt-8 pb-6 px-6`}
                  >
                    {/* Duration Badge */}
                    <div className="inline-flex items-center justify-center w-full mb-4">
                      <div
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                          plan.upgrade
                            ? "bg-[#D4AF37] text-[#0F172A]"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {plan.duration}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight">
                          {plan.price.split(",")[0]}
                        </span>
                        <span className="text-xl text-gray-500">
                          {plan.price.includes(",")
                            ? plan.price.split(",")[1]
                            : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {plan.subtitle}
                      </p>
                      {plan.description && (
                        <p className="text-xs text-gray-400 mt-1 italic">
                          {plan.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 space-y-6">
                    {/* Services List */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                        <p className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider whitespace-nowrap">
                          Enthaltene Anwendungen
                        </p>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                      </div>
                      {Array.isArray(plan.optimalFor) ? (
                        <ul className="space-y-3">
                          {plan.optimalFor.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 group/item"
                            >
                              <div
                                className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                                  plan.upgrade
                                    ? "bg-[#D4AF37]"
                                    : "bg-gray-300 group-hover/item:bg-[#D4AF37] transition-colors"
                                }`}
                              />
                              <span className="text-sm text-gray-700 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed text-center py-2">
                          {plan.optimalFor}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`
                        group/btn w-full py-6 text-base font-semibold transition-all duration-300
                        ${
                          plan.upgrade
                            ? "bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] shadow-lg hover:shadow-xl"
                            : "bg-[#0F172A] hover:bg-[#1e293b] text-white hover:scale-105"
                        }
                        transform hover:scale-105
                      `}
                    >
                      <Link href="/termin-buchen">
                        Jetzt buchen
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>

                  {/* Decorative bottom border */}
                  {plan.upgrade && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E6C45A] to-[#D4AF37]" />
                  )}
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div
            className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: "450ms" }}
          >
            <p className="text-sm text-gray-500">
              Alle Preise verstehen sich inklusive MwSt. • Flexible
              Terminvereinbarung möglich
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-2xl p-12 border border-[#D4AF37]/20 shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <MessageCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
              Sie haben Fragen?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Dann kontaktieren Sie mich gerne. Ich werde versuchen, Ihre Fragen
              gerne zu beantworten.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-white font-semibold text-lg px-8 py-6 transition-all transform hover:scale-105"
            >
              <Link href="/#contact">
                Kontakt
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
