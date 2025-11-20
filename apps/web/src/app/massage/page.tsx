"use client";

import { Heart, Leaf, Move, Sparkles, Target, Wind, Zap } from "lucide-react";
import { useState } from "react";

export default function MassagePage() {
  const [expandedService, setExpandedService] = useState(null);

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
      description:
        "Ein auf Ihre Bedürfnisse abgestimmtes Kräuteröl und Massagetechnik sind Ausdruck von Individualität. Die Anregung der Selbstheilungskräfte und die entgiftende Wirkung vermitteln ein Gefühl von Ausgeglichenheit, Ruhe und Harmonie.",
      icon: Heart,
    },
    {
      id: 4,
      name: "VITALE KOMBI-MASSAGE",
      subtitle: "FUSSREFLEXZONEN + RÜCKENMASSAGE",
      duration: "1 Stunde",
      description:
        "Eine Kombination aus Fußreflexzonen Massage und Rückenmassage für ganzheitliche Entspannung und Revitalisierung.",
      icon: Zap,
    },
    {
      id: 5,
      name: "INTENSIVE GELENKS-MASSAGE",
      subtitle: "MOBILITÄT UND KRAFT",
      duration: "1 1/2 Stunden",
      description:
        "Die intensive Massage und Dehnung löst Verspannungen und steigert die Gelenkigkeit. Perfekt für verbesserte Bewegungsfreiheit.",
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
        "Intensiv wird der Körper durchmassiert. Spezielle traditionelle Massagetechnik zur Auflösung auch sehr lang zurückliegender Blockaden. Marmapunkte sind Verbindungsstellen zwischen Körper und Bewusstsein. Durch intensive, spezielle Massage von Kopf bis Fuß kann somit der Zugang zu unserem Energiesystem geschaffen werden. Körperliche und emotionale Blockaden werden aufgelöst und die Energien können wieder fließen. Alle 116 Meridiane werden aktiviert.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Massage Therapie
        </h1>
        <p className="text-lg text-gray-600">
          Schenken Sie sich Zeit & Ihrem Körper Wohlgefühl!
        </p>
      </header>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
                className={`cursor-pointer transition-all duration-300 ${
                  expandedService === service.id
                    ? "md:col-span-2 lg:col-span-3"
                    : ""
                }`}
              >
                <div
                  className={`flex flex-col items-center text-center p-8 rounded-lg transition-all duration-300 ${
                    expandedService === service.id
                      ? "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300"
                      : "bg-white border-2 border-gray-100 hover:border-amber-200 hover:shadow-md"
                  }`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`mb-6 p-4 rounded-full transition-all duration-300 ${
                      expandedService === service.id
                        ? "bg-amber-100 border-2 border-amber-400"
                        : "bg-amber-50 border-2 border-amber-300"
                    }`}
                  >
                    <IconComponent
                      className={`transition-all duration-300 ${
                        expandedService === service.id
                          ? "w-12 h-12 text-amber-600"
                          : "w-10 h-10 text-amber-500"
                      }`}
                    />
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-lg font-bold text-amber-600 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm font-semibold text-amber-500 mb-4">
                    {service.subtitle}
                  </p>

                  {/* Duration */}
                  <p className="text-sm text-gray-500 mb-4">
                    Sie sollten sich {service.duration} Zeit nehmen.
                  </p>

                  {/* Expanded Description */}
                  {expandedService === service.id && (
                    <div className="mt-6 pt-6 border-t-2 border-amber-200 w-full animate-in fade-in duration-300">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {service.description}
                      </p>
                      <button className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-amber-300/50 transition-all duration-300 transform hover:scale-105">
                        Termin vereinbaren
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
