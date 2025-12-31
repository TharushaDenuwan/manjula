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
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Heart,
  Leaf,
  MessageCircle,
  Move,
  Sparkles,
  Star,
  Target,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface Service {
  id: number;
  name: string;
  subtitle: string;
  duration: string;
  durationLong?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PricingPlan {
  duration: string;
  price: string;
  subtitle: string;
  optimalFor: string[];
  description?: string;
  upgrade?: boolean;
}

const CAROUSEL_IMAGES = [
  "/assets/p17.JPG",
  "/assets/p8.JPG",
  "/assets/3.JPG",
  "/assets/5.JPG",
];

const SERVICES: Service[] = [
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

const PRICING_PLANS: PricingPlan[] = [
  {
    duration: "1 1/2 Stunden",
    price: "€ 150,-",
    subtitle: "Pro Behandlung",
    optimalFor: [
      "ABHYANGA - GENUSSVOLLE HARMONIE",
      "INTENSIVE GELENKSMASSAGE",
      "MARMA PUNKT THERAPIE",
    ],
    upgrade: true,
  },
];

const POLICIES = [
  {
    title: "Buchungs- und Stornierungsbedingungen",
    description: `Telefonische Buchung
• Termine können ausschließlich telefonisch vereinbart werden.
• Online-Buchungen sind nicht möglich.
• Termine können frühestens 1-2 Tage im Voraus gebucht werden.

Behandlungsdauer & Preis
• Dauer: 1,5 Stunden
• Preis: €150

Anzahlung
• Nach der telefonischen Terminvereinbarung ist eine Anzahlung von 35 % (€52,50) zu leisten.
• Die Anzahlung ist innerhalb von 24 Stunden nach dem Telefonat zu leisten.
• Nach Durchführung der Zahlung ist ein Zahlungsnachweis (z. B. Überweisungsbestätigung oder Beleg) per Telefon (z. B. via WhatsApp oder SMS) zu übermitteln.
• Der Termin gilt erst nach Eingang der Anzahlung als verbindlich reserviert.
• Erfolgt kein Zahlungseingang innerhalb von 24 Stunden, kann der Termin ohne weitere Benachrichtigung freigegeben werden.

Restzahlung
• Der Restbetrag (€97,50) ist am Tag der Behandlung zu bezahlen.

Stornierung & Umbuchung
• Bei Terminen, die mehr als 2 Tage im Voraus gebucht wurden, ist eine kostenfreie Stornierung bis 24 Stunden vor dem Termin möglich.
• Wird ein Termin nur 1 Tag im Voraus gebucht, ist eine kostenfreie Stornierung bis spätestens 6 Stunden vor dem Termin möglich.
• Bei späteren Stornierungen oder Nichterscheinen (No-Show) wird die Anzahlung (€52,50) einbehalten.

Pünktlichkeit
• Bitte mindestens 10 Minuten vor dem Termin erscheinen, um den Anamnesebogen und die Einwilligung auszufüllen.
• Bei verspätetem Erscheinen verkürzt sich die Behandlungszeit, der volle Preis bleibt fällig.

Hinweis
• Behandlungen erfolgen ausschließlich nach Terminvereinbarung.
• Pro Tag werden maximal 5 Kund:innen betreut.

Mit der telefonischen Buchung erklärst du dich mit diesen Buchungs- & Stornierungsbedingungen einverstanden.`,
  },
];

// ============================================================================
// SUB-COMPONENTS: HERO SECTION
// ============================================================================

interface CarouselProps {
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
  images: string[];
}

const HeroCarousel: React.FC<CarouselProps> = ({
  currentSlide,
  onPrevious,
  onNext,
  images,
}) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100" />

      {/* Carousel Container */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full will-change-transform"
          style={{
            transform: `translateX(calc(-100% * ${currentSlide} / ${images.length}))`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
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

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/60"
            }`}
            onClick={() => {}}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <CarouselNavigation onPrevious={onPrevious} onNext={onNext} />
    </div>
  );
};

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const CarouselNavigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
}) => (
  <>
    <motion.button
      onClick={onPrevious}
      className="absolute left-6 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300"
      aria-label="Previous slide"
      whileHover={{ scale: 1.15, x: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="w-6 h-6 text-white" />
    </motion.button>
    <motion.button
      onClick={onNext}
      className="absolute right-6 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300"
      aria-label="Next slide"
      whileHover={{ scale: 1.15, x: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowRight className="w-6 h-6 text-white" />
    </motion.button>
  </>
);

const HeroContent: React.FC = () => (
  <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="inline-block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-sm font-medium">
          ✨ Premium Massage Therapies
        </div>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Schenken Sie sich Zeit &
        <br />
        <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
          Ihrem Körper Wohlgefühl!
        </span>
      </motion.h1>

      {/* Separator Line */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      <motion.p
        className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95 font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Wählen Sie eine meiner speziellen Anwendungen, oder vertrauen Sie mir,
        Ihnen diese Entscheidung situationsbedingt und taggenau für Sie zu
        treffen...
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          asChild
          className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-bold text-base px-8 py-6 rounded-full shadow-2xl transition-all hover:shadow-3xl"
        >
          <Link href="#services">Erkundigen Sie sich jetzt</Link>
        </Button>
      </motion.div>
    </motion.div>
  </div>
);

const HeroSection: React.FC<{
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ currentSlide, onPrevious, onNext }) => (
  <section className="relative w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
    <HeroCarousel
      currentSlide={currentSlide}
      onPrevious={onPrevious}
      onNext={onNext}
      images={CAROUSEL_IMAGES}
    />
    <HeroContent />
  </section>
);

// ============================================================================
// SUB-COMPONENTS: SERVICES SECTION
// ============================================================================

interface ServiceCardProps {
  service: Service;
  index: number;
  cardsAnimated: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  cardsAnimated,
}) => {
  const IconComponent = service.icon;

  return (
    <motion.div
      key={service.id}
      data-service-card
      initial={{ opacity: 0, y: 50 }}
      animate={cardsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{
        y: -12,
        scale: 1.05,
      }}
    >
      <Card className="group relative h-full bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Gradient accent on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="text-center pb-4 relative z-10">
          {/* Icon Circle with glow */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-lg" />
              <div className="relative p-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 border-2 border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-all duration-300">
                <IconComponent className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
            {service.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-widest">
            {service.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 relative z-10">
          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            {service.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

          {/* Duration with icon */}
          <motion.div
            className="flex items-center justify-center gap-3 group/duration"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-5 h-5 text-[#D4AF37] group-hover/duration:scale-110 transition-transform" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {service.duration}
            </p>
          </motion.div>

          {/* Long Duration Note */}
          {service.durationLong && (
            <div className="pt-2">
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center italic">
                ({service.durationLong})
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesSection: React.FC<{
  cardsAnimated: boolean;
  servicesRef: React.RefObject<HTMLDivElement>;
}> = ({ cardsAnimated, servicesRef }) => (
  <section
    id="services"
    className="py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900 relative"
  >
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="inline-block text-[#D4AF37] font-semibold uppercase tracking-widest text-sm mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ✨ Unsere Anwendungen
        </motion.span>
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Spezialisierte Massage-Therapien
        </motion.h2>
        <motion.div
          className="w-32 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E6C45A] to-[#D4AF37] mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Services Grid */}
      <div
        ref={servicesRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            cardsAnimated={cardsAnimated}
          />
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// SUB-COMPONENTS: PRICING SECTION
// ============================================================================

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index }) => (
  <motion.div
    key={index}
    className="relative group w-full"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{
      y: -8,
      scale: 1.01,
    }}
  >
    {/* Popular Badge */}
    <motion.div
      className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] text-[#0F172A] text-xs font-bold px-5 py-2 rounded-full shadow-xl">
        <Star className="w-4 h-4" />
        Empfohlen
      </div>
    </motion.div>

    {/* Card Container */}
    <Card className="relative h-full bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl border-2 border-[#D4AF37] shadow-2xl ring-2 ring-[#D4AF37]/20 overflow-hidden transition-all duration-500 hover:shadow-3xl">
      {/* Accent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <PricingCardHeader plan={plan} />

      {/* Content */}
      <CardContent className="p-10 space-y-8 relative z-10">
        {/* Services List */}
        <PricingServices plan={plan} />

        {/* CTA Button */}
        <PricingCTAButton plan={plan} />
      </CardContent>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E6C45A] to-[#D4AF37]" />
    </Card>
  </motion.div>
);

interface PricingHeaderProps {
  plan: PricingPlan;
}

const PricingCardHeader: React.FC<PricingHeaderProps> = ({ plan }) => {
  const [wholePart, decimalPart] = plan.price.includes(",")
    ? plan.price.split(",")
    : [plan.price, ""];

  return (
    <div className="relative bg-gradient-to-br from-[#D4AF37]/15 via-[#D4AF37]/8 to-transparent pt-14 pb-10 px-10">
      {/* Duration Badge */}
      <motion.div
        className="inline-flex items-center justify-center w-full mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="px-7 py-3 rounded-full text-base font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] text-[#0F172A] shadow-lg">
          {plan.duration}
        </div>
      </motion.div>

      {/* Price Section */}
      <div className="text-center space-y-4">
        <motion.div
          className="flex items-baseline justify-center gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-7xl lg:text-8xl font-black text-[#0F172A] dark:text-white tracking-tight">
            {wholePart}
          </span>
          {decimalPart && (
            <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
              {decimalPart}
            </span>
          )}
        </motion.div>
        <motion.p
          className="text-lg font-semibold text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {plan.subtitle}
        </motion.p>
        {plan.description && (
          <p className="text-sm text-gray-500 dark:text-gray-500 italic">
            {plan.description}
          </p>
        )}
      </div>
    </div>
  );
};

const PricingServices: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    {/* Section Header */}
    <div className="flex items-center gap-4">
      <div className="h-1 flex-1 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent rounded-full" />
      <p className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-widest whitespace-nowrap">
        ✓ Enthaltene Anwendungen
      </p>
      <div className="h-1 flex-1 bg-gradient-to-l from-[#D4AF37] via-[#D4AF37]/50 to-transparent rounded-full" />
    </div>

    {/* Services List */}
    {Array.isArray(plan.optimalFor) ? (
      <ul className="space-y-4">
        {plan.optimalFor.map((item, idx) => (
          <motion.li
            key={idx}
            className="flex items-start gap-4 group/item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <motion.div
              className="mt-1.5 flex-shrink-0"
              whileHover={{ scale: 1.2 }}
            >
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            </motion.div>
            <span className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium group-hover/item:text-[#D4AF37] transition-colors">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    ) : (
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center py-4">
        {plan.optimalFor}
      </p>
    )}
  </motion.div>
);

const PricingCTAButton: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.5 }}
  >
    <Button
      asChild
      className="group/btn w-full py-8 px-6 text-lg font-bold transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 active:scale-95"
    >
      <Link
        href="/termin-buchen"
        className="flex items-center justify-center gap-2"
      >
        Termin Buchen
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </Link>
    </Button>
  </motion.div>
);

interface PoliciesSidebarProps {}

const PoliciesSidebar: React.FC<PoliciesSidebarProps> = () => (
  <aside
    className="hidden md:block w-96 shrink-0 mt-8 md:mt-0"
    role="complementary"
    aria-label="Policies Right"
  >
    <motion.div
      className="sticky top-32"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-[#D4AF37]/30 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] bg-clip-text text-transparent mb-3">
              ✨ Wichtige Hinweise
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Damit Ihr Besuch so angenehm wie möglich wird
            </p>
          </motion.div>

          {/* Policies List */}
          <ul className="space-y-4">
            {POLICIES.map((policy, idx) => (
              <motion.li
                key={idx}
                className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
              >
                <div className="font-bold text-[#D4AF37] text-sm uppercase tracking-wide mb-1">
                  {policy.title}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {policy.description}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* Footer Note */}
          <motion.div
            className="mt-8 pt-6 border-t-2 border-[#D4AF37]/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-xs text-gray-500 dark:text-gray-500 italic leading-relaxed">
              Bei Fragen kontaktieren Sie uns bitte vorab unter den angegebenen
              Kontaktdaten.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  </aside>
);

const PricingSection: React.FC = () => (
  <section className="py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900 relative overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-40 left-20 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="inline-block text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          💎 Transparente Preisgestaltung
        </motion.span>
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Preise & Pakete
        </motion.h2>
        <motion.div
          className="w-32 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E6C45A] to-[#D4AF37] mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Pricing Cards */}
      <div className="md:flex md:items-start md:gap-8">
        <div className="md:flex-1">
          <div className="grid grid-cols-1 gap-0">
            {PRICING_PLANS.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
        <PoliciesSidebar />
      </div>

      {/* Additional Info */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          💳 Alle Preise verstehen sich inklusive MwSt. • Flexible
          Terminvereinbarung • Zahlbar vor Ort
        </p>
      </motion.div>
    </div>
  </section>
);

// ============================================================================
// SUB-COMPONENTS: CONTACT CTA SECTION
// ============================================================================

const ContactCTASection: React.FC = () => (
  <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 right-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
    </div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        className="bg-gradient-to-br from-[#D4AF37]/8 to-transparent rounded-3xl p-16 border-2 border-[#D4AF37]/30 shadow-2xl hover:shadow-3xl transition-shadow"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.01 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
        >
          <MessageCircle className="w-20 h-20 text-[#D4AF37] mx-auto mb-8" />
        </motion.div>
        <motion.h2
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Sie haben Fragen?
        </motion.h2>
        <motion.p
          className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Kontaktieren Sie mich gerne! Ich antworte Ihnen schnellstmöglich und
          beantworte gerne alle Ihre Fragen zu den Behandlungen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-bold text-lg px-10 py-7 rounded-full transition-all shadow-xl hover:shadow-2xl"
          >
            <Link
              href="/#contact"
              className="flex items-center justify-center gap-2"
            >
              Kontaktieren Sie mich
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function MassagePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsAnimated, setCardsAnimated] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check if services section is in view on mount and trigger animations
  useEffect(() => {
    const checkInitialView = () => {
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const isInView =
          rect.top < window.innerHeight + 300 && rect.bottom > -300;
        if (isInView) {
          setTimeout(() => {
            setCardsAnimated(true);
          }, 200);
        }
      }
    };

    const timer = setTimeout(checkInitialView, 300);

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

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
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
                transform: `translateX(calc(-100% * ${currentSlide} / ${CAROUSEL_IMAGES.length}))`,
                width: `${CAROUSEL_IMAGES.length * 100}%`,
              }}
            >
              {CAROUSEL_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className="relative h-full flex-shrink-0"
                  style={{ width: `${100 / CAROUSEL_IMAGES.length}%` }}
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
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
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
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95"
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
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              const isLastItem = index === service.length - 1;
              const itemsInLastRow = service.length % 3;
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
                  <Card className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/40 hover:shadow-xl transition-all duration-500">
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
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center">
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

      <section className="py-20 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800" id="calendar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                Hinweis: Buchungen sind nur telefonisch oder per Nachricht möglich.
              </span>
            </motion.p>
          </motion.div>

          <UserCalendar />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
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

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative group ${plan.upgrade ? "md:-mt-4 md:mb-4" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  y: plan.upgrade ? -8 : -12,
                  scale: plan.upgrade ? 1.03 : 1.02,
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
                    relative h-full bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden
                    ${
                      plan.upgrade
                        ? "border-[#D4AF37] shadow-2xl ring-2 ring-[#D4AF37]/20 scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/50 shadow-lg hover:shadow-2xl"
                    }
                    transition-all duration-500 hover:-translate-y-2
                  `}
                >
                  {/* Header with gradient */}
                  <div
                    className={`relative ${plan.upgrade ? "bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent" : "bg-gradient-to-br from-gray-50 dark:from-gray-700 to-transparent"} pt-8 pb-6 px-6`}
                  >
                    {/* Duration Badge */}
                    <div className="inline-flex items-center justify-center w-full mb-4">
                      <div
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                          plan.upgrade
                            ? "bg-[#D4AF37] text-[#0F172A]"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {plan.duration}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                          {plan.price.split(",")[0]}
                        </span>
                        <span className="text-xl text-gray-500 dark:text-gray-400">
                          {plan.price.includes(",")
                            ? plan.price.split(",")[1]
                            : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {plan.subtitle}
                      </p>
                      {plan.description && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
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
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-white uppercase tracking-wider whitespace-nowrap">
                          Enthaltene Anwendungen
                        </p>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
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
                                    : "bg-gray-300 dark:bg-gray-600 group-hover/item:bg-[#D4AF37] transition-colors"
                                }`}
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center py-2">
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
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Alle Preise verstehen sich inklusive MwSt. • Flexible
              Terminvereinbarung möglich
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
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
