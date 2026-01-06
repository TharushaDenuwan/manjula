"use client";

import { UserCalendar } from "@/features/calendar/components/user-calendar";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Clock,
  CreditCard,
  Heart,
  Info,
  Leaf,
  MessageCircle,
  Move,
  Phone,
  Sparkles,
  Target,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MassagePage() {
  // Sample images from local assets
  const carouselImages = [
    "/assets/p17.JPG",
    "/assets/p8.JPG",
    "/assets/3.JPG",
    "/assets/5.JPG",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsAnimated, setCardsAnimated] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  // Check if services section is in view on mount and trigger animations
  useEffect(() => {
    const checkInitialView = () => {
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        // Check if section is visible in viewport
        const isInView =
          rect.top < window.innerHeight + 300 && rect.bottom > -300;
        if (isInView) {
          // Trigger animations after a short delay to ensure page is loaded
          setTimeout(() => {
            setCardsAnimated(true);
          }, 200);
        }
      }
    };

    // Check after a delay to ensure DOM is ready
    const timer = setTimeout(checkInitialView, 300);

    // Also check on scroll in case section wasn't in view initially
    const handleScroll = () => {
      if (!cardsAnimated && servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const isInView =
          rect.top < window.innerHeight + 300 && rect.bottom > -300;
        if (isInView) {
          setCardsAnimated(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cardsAnimated]);
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
      duration: "1 1/2 Stunden",
      price: "€ 150,-",
      subtitle: "Pro Behandlung",
      upgrade: true,
      description: "Behandlungsdauer & Preis",
      optimalFor: [
        "Dauer: 1,5 Stunden",
        "Individuelle Massageanwendung",
        "Inkl. Anamnese & Beratung",
        "Hochwertige Kräuteröle",
      ],
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white dark:bg-gray-900 min-h-screen">
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
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Schenken Sie sich Zeit & Ihrem
              <br />
              Körper Wohlgefühl!
            </motion.h1>

            {/* Separator Line */}
            <motion.div
              className="w-24 h-0.5 bg-white mx-auto my-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95 break-words px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Wählen Sie eine meiner speziellen Anwendungen, oder vertrauen Sie
              mir, Ihnen diese Entscheidung situationsbedingt und taggenau für
              Sie zu treffen...
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isLastItem = index === services.length - 1;
              const itemsInLastRow = services.length % 3;
              const shouldCenter = isLastItem && itemsInLastRow === 1;

              return (
                <motion.div
                  key={service.id}
                  data-service-card
                  className={shouldCenter ? "lg:col-start-2" : ""}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    cardsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                >
                  <Card className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/40 hover:shadow-xl transition-all duration-500 h-full w-full max-w-full">
                    <CardHeader className="text-center pb-4">
                      {/* Icon Circle */}
                      <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/20 group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-lg font-bold text-[#0F172A] dark:text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {service.subtitle}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Description */}
                      <p
                        className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center break-words hyphens-auto"
                        lang="de"
                      >
                        {service.description}
                      </p>

                      {/* Duration */}
                      <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Sie sollten sich {service.duration} Zeit nehmen.
                        </p>
                      </div>

                      {/* Long Duration Note for ABHYANGA */}
                      {service.durationLong && (
                        <div className="pt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                            ({service.durationLong})
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 overflow-x-hidden"
        id="calendar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Terminverfügbarkeit
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Prüfen Sie hier ganz einfach, ob Ihr Wunschtermin noch frei ist.
              <br />
              <span className="text-sm text-[#D4AF37] font-medium mt-2 block">
                Hinweis: Buchungen sind direkt über den Kalender oder
                telefonisch möglich.
              </span>
            </motion.p>
          </motion.div>

          <UserCalendar />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-x-hidden">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Preise & Pakete
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Wählen Sie das perfekte Paket für Ihr Wohlbefinden
            </motion.p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Column: Pricing Card */}
            <div className="max-w-md mx-auto lg:mx-0 w-full order-2 lg:order-1">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                >
                  {/* Recommended Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] text-[#0F172A] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                      Premium Behandlung
                    </div>
                  </div>

                  <Card className="relative h-full bg-white dark:bg-gray-800 rounded-2xl border border-[#D4AF37] shadow-2xl ring-2 ring-[#D4AF37]/20 transition-all duration-500 overflow-hidden">
                    {/* Header with gradient */}
                    <div className="relative bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent pt-10 pb-8 px-6">
                      {/* Duration Badge */}
                      <div className="inline-flex items-center justify-center w-full mb-4">
                        <div className="px-6 py-2 rounded-full text-base font-bold bg-[#D4AF37] text-[#0F172A]">
                          {plan.duration}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-6xl md:text-7xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                            {plan.price.split(",")[0]}
                          </span>
                          <span className="text-2xl text-gray-500 dark:text-gray-400">
                            {plan.price.includes(",")
                              ? plan.price.split(",")[1]
                              : ""}
                          </span>
                        </div>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8 space-y-8">
                      {/* Services List */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                          <p className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider whitespace-nowrap px-2">
                            Leistungen
                          </p>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                        </div>
                        <ul className="space-y-4">
                          {plan.optimalFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#D4AF37]" />
                              <span className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Button
                        asChild
                        className="group/btn w-full py-8 text-lg font-bold transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        <Link href="/termin-buchen">
                          Termin telefonisch anfragen
                          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>

                      <p className="text-center text-sm text-[#D4AF37] font-semibold">
                        Buchen Sie Ihren Termin direkt im Kalender
                      </p>
                    </CardContent>

                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E6C45A] to-[#D4AF37]" />
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Important Notes */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-200 dark:border-gray-700 shadow-xl relative overflow-hidden h-full">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-bl-full -mr-20 -mt-20" />

                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                      <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-white">
                        ✨ Wichtige Hinweise
                      </h3>
                    </div>
                    <p className="text-[#D4AF37] font-semibold text-lg ml-11">
                      Damit Ihr Besuch so angenehm wie möglich wird
                    </p>
                  </div>

                  <div className="grid gap-8 text-gray-700 dark:text-gray-300">
                    {/* Booking Methods Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-2">
                        <CalendarCheck className="w-5 h-5 text-[#D4AF37]" />
                        Termine
                      </h4>

                      <div className="space-y-4 ml-8">
                        <ul className="space-y-2 text-sm list-disc pl-4">
                          <li>
                            Termine können vorrangig online über das
                            Buchungssystem vereinbart werden.
                          </li>
                          <li>
                            Telefonische Buchungen sind ergänzend möglich,
                            insbesondere bei Rückfragen oder Sonderfällen.
                          </li>
                          <li>
                            Termine können frühestens 2 Tage im Voraus gebucht
                            werden.
                          </li>
                        </ul>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mt-4">
                          <div>
                            <p className="text-xs font-bold uppercase text-[#D4AF37] mb-1">
                              Behandlungsdauer
                            </p>
                            <p className="font-bold">1,5 Stunden</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase text-[#D4AF37] mb-1">
                              Preis
                            </p>
                            <p className="font-bold">€150</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-2">
                        <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                        Anzahlung & Restzahlung
                      </h4>
                      <div className="space-y-4 ml-8">
                        <div>
                          <p className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-2">
                            Anzahlung
                          </p>
                          <ul className="space-y-2 text-sm list-disc pl-4">
                            <li>
                              Mit jeder Buchung ist eine Anzahlung von 35%{" "}
                              <span className="font-bold text-[#D4AF37]">
                                (€52,50)
                              </span>{" "}
                              zu leisten.
                            </li>
                            <li>
                              Der Termin gilt erst nach Eingang der Anzahlung
                              als verbindlich reserviert.
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-2">
                            Restzahlung
                          </p>
                          <p className="text-sm">
                            Der Restbetrag{" "}
                            <span className="font-bold text-[#D4AF37]">
                              (€97,50)
                            </span>{" "}
                            ist am Tag der Behandlung zu bezahlen.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Online Booking Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-2">
                        <CalendarCheck className="w-5 h-5 text-[#D4AF37]" />
                        Online-Buchung
                      </h4>
                      <div className="space-y-4 ml-8">
                        <ul className="space-y-2 text-sm list-disc pl-4">
                          <li>
                            Online-Buchungen sind für Termine möglich, die
                            mindestens 2 Tage im Voraus liegen.
                          </li>
                          <li>
                            Bei Online-Buchungen ist die Anzahlung direkt im
                            Buchungsvorgang zu leisten.
                          </li>
                          <li>
                            Eine kostenfreie Stornierung ist bis 24 Stunden vor
                            dem Termin möglich.
                          </li>
                          <li>
                            Bei späterer Stornierung oder Nichterscheinen wird
                            die Anzahlung einbehalten.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Phone Booking Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-2">
                        <Phone className="w-5 h-5 text-[#D4AF37]" />
                        Telefonische Buchung
                      </h4>
                      <div className="space-y-4 ml-8">
                        <ul className="space-y-2 text-sm list-disc pl-4">
                          <li>
                            Die Anzahlung ist innerhalb von 24 Stunden nach dem
                            Telefonat zu leisten.
                          </li>
                          <li>
                            Nach Durchführung der Zahlung ist ein
                            Zahlungsnachweis (z.B. Überweisungsbestätigung) per
                            Telefon (z.B. WhatsApp oder SMS) zu übermitteln.
                          </li>
                          <li>
                            Der Termin gilt erst nach Eingang der Anzahlung und
                            Übermittlung des Zahlungsnachweises als verbindlich
                            reserviert.
                          </li>
                          <li>
                            Erfolgt kein Zahlungseingang oder kein
                            Zahlungsnachweis innerhalb von 24 Stunden, kann der
                            Termin ohne weitere Benachrichtigung freigegeben
                            werden.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Cancellation Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-2">
                        <AlertCircle className="w-5 h-5 text-[#D4AF37]" />
                        Stornierung & Umbuchung
                      </h4>
                      <div className="space-y-4 ml-8">
                        <ul className="space-y-2 text-sm list-disc pl-4">
                          <li>
                            Eine kostenfreie Stornierung oder Umbuchung ist bis
                            24 Stunden vor dem Termin möglich.
                          </li>
                          <li>
                            Bei späterer Stornierung oder Nichterscheinen
                            (No-Show) wird die Anzahlung{" "}
                            <span className="font-bold text-[#D4AF37]">
                              (€52,50)
                            </span>{" "}
                            einbehalten.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Punctuality Section */}
                    <div className="space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                        <p className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-400 mb-2">
                          <Clock className="w-4 h-4" /> Pünktlichkeit
                        </p>
                        <ul className="space-y-1 text-sm text-amber-900/80 dark:text-amber-300/80 list-disc pl-4">
                          <li>
                            Bitte mindestens 10 Minuten vor dem Termin
                            erscheinen, um den Anamnesebogen und die
                            Einwilligung auszufüllen.
                          </li>
                          <li>
                            Bei verspätetem Erscheinen verkürzt sich die
                            Behandlungszeit, der volle Preis bleibt fällig.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* General Notes */}
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-[#D4AF37]" /> Nur nach
                          Termin
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-[#D4AF37]" /> Max. 5
                          Kund:innen/Tag
                        </span>
                      </div>
                      <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed italic">
                        Mit der Buchung – online oder telefonisch – erklärst du
                        dich mit diesen Buchungs- & Stornierungsbedingungen
                        einverstanden.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900 overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div
            className="bg-gradient-to-br from-[#D4AF37]/5 dark:from-[#D4AF37]/10 to-transparent rounded-2xl p-12 border border-[#D4AF37]/20 dark:border-[#D4AF37]/30 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            >
              <MessageCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Sie haben Fragen?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Dann kontaktieren Sie mich gerne. Ich werde versuchen, Ihre Fragen
              gerne zu beantworten.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-white font-semibold text-lg px-8 py-6 transition-all"
              >
                <Link href="/#contact">
                  Kontakt
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
