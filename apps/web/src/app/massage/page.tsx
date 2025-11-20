"use client";

import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ArrowRight, Clock, Heart, Leaf, MessageCircle, Move, Sparkles, Target, Wind, Zap } from "lucide-react";
import Link from "next/link";

export default function MassagePage() {
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
      {/* Hero Section with Background Image */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Using a placeholder, replace with actual image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100" />
          {/* Placeholder for background image - replace with actual image path */}
          <div className="absolute inset-0 bg-[url('/assets/massage-hero.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Schenken Sie sich Zeit & Ihrem
              <br />
              Körper Wohlgefühl!
            </h1>

            {/* Separator Line */}
            <div className="w-24 h-0.5 bg-white mx-auto my-6" />

            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
              Wählen Sie eine meiner speziellen Anwendungen, oder vertrauen Sie mir, Ihnen diese Entscheidung situationsbedingt und taggenau für Sie zu treffen...
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
              return (
                <Card
                  key={service.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-[#D4AF37]/40 hover:shadow-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
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
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`
                  bg-white rounded-xl border-2 overflow-hidden
                  ${plan.upgrade ? "border-[#D4AF37] shadow-xl scale-105" : "border-gray-200 hover:border-[#D4AF37]/40"}
                  hover:shadow-xl transition-all duration-300
                  animate-in fade-in slide-in-from-bottom-4
                `}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <CardHeader className="text-center pb-4 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
                  {plan.upgrade && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                        upgrade
                      </span>
                    </div>
                  )}
                  <div className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
                    {plan.duration}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                    {plan.price}
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {plan.subtitle}
                  </CardDescription>
                  {plan.description && (
                    <p className="text-xs text-gray-500 mt-2">{plan.description}</p>
                  )}
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A] mb-3">
                      Optimal für
                    </p>
                    {Array.isArray(plan.optimalFor) ? (
                      <ul className="space-y-2">
                        {plan.optimalFor.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-[#D4AF37] mt-1 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-600">{plan.optimalFor}</p>
                    )}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-semibold transition-all transform hover:scale-105"
                    onClick={() => {
                      // Handle booking
                    }}
                  >
                    Jetzt buchen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-2xl p-12 border border-[#D4AF37]/20 shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <MessageCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Sie haben Fragen?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Dann kontaktieren Sie mich gerne. Ich werde versuchen, Ihre Fragen gerne zu beantworten.
            </p>
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-semibold text-lg px-8 py-6 transition-all transform hover:scale-105"
              >
                Kontakt
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
