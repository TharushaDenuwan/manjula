"use client";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { DiscountPosts } from "./discount-posts";

export function Hero() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form submitted:", formData);
      setFormData({ email: "", message: "" });
      alert("Nachricht gesendet! Vielen Dank 🙏");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white text-[#0F172A] overflow-hidden">
      {/* HERO WITH VIDEO BACKGROUND */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/back4.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay + golden accent */}
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-x-0 top-0 h1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Ayubowan{" "}
            <span className="block text-4xl md:text-6xl text-[#D4AF37] mt-4">
              ~ Ich wünsche Dir ein langes, gesundes Leben ~
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
            Mein Name ist <strong>Hakkini Manjula De Silva</strong> – Freunde
            nennen mich „Manju“. Ich komme aus Balapitiya, Sri Lanka und bringe
            über <strong className="text-[#D4AF37]">27 Jahre Erfahrung</strong>{" "}
            in traditioneller Ayurveda-Massage mit.
          </p>
          <div className="mt-10">
            <p className="text-2xl italic">Ayubowan</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION – ELEGANT & GOLD ACCENTS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-4">
            Willkommen bei Manjula
          </h2>
          <p className="text-[#D4AF37] text-xl mb-16">
            Ayurveda Wohlfühlpraktik aus Sri Lanka
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left text-lg leading-relaxed">
              <p>
                Seit 2021 führe ich meine eigene Praxis in der{" "}
                <strong className="text-[#D4AF37]">Steiermark</strong>. Davor
                leitete ich 10 Jahre lang einen Ayurveda-Spa in einem
                Wellnesshotel in Salzburg.
              </p>
              <p>
                Mit meinem ganzheitlichen Ansatz verbinde ich traditionelle
                singhalesische Techniken mit tiefem Wissen über{" "}
                <strong>Doshas, Marmapunkte und Kräuteröle</strong>.
              </p>
              <p className="text-xl font-semibold text-[#0F172A]">
                Ich freue mich sehr, wenn ich{" "}
                <span className="text-[#D4AF37]">Ihnen</span> helfen darf.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-10 rounded-full">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-80 h-80" />
                {/* Replace with your photo later */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES – GOLDEN CARDS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-[#0F172A] mb-4">
            Meine Leistungen
          </h2>
          <p className="text-[#D4AF37] text-center text-xl mb-16">
            Tradition trifft Wohlbefinden
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Massagen",
                icon: "꩜",
                desc: "Abhyanga, Shirodhara, Pinda Sveda & mehr",
              },
              {
                title: "Yoga & Meditation",
                icon: "🕉",
                desc: "Privatstunden & Gruppenkurse",
              },
              {
                title: "Ayurveda",
                icon: "☾𖤓",
                desc: "Individuelle Öle & Packungen",
              },
              {
                title: "Termin buchen",
                icon: "⏲",
                desc: "Persönliche Lebensberatung",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-2xl p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-3 border border-[#D4AF37]/20"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOUNT POSTS */}
      <DiscountPosts />

      {/* CONTACT & MAP – LUXURIOUS GOLD/WHITE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-[#0F172A] mb-4">
            Kontaktieren Sie mich
          </h2>
          <p className="text-[#D4AF37] text-center text-xl mb-16">
            Ich freue mich auf Ihre Nachricht
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-gradient-to-br from-[#FAF9F6] to-white p-10 rounded-3xl shadow-xl border border-[#D4AF37]/30">
              <h3 className="text-3xl font-bold text-[#0F172A] mb-8">
                Nachricht senden
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="email"
                  required
                  placeholder="Ihre E-Mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none transition"
                />
                <textarea
                  required
                  rows={6}
                  placeholder="Ihre Nachricht..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none resize-none transition"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] hover:bg-[#C19A2F] text-[#0F172A] font-bold text-lg py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  {loading ? "Wird gesendet..." : "Nachricht senden 🙏"}
                </Button>
              </form>
            </div>

            {/* Map & Info */}
            <div className="space-y-8">
              <div className="bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  title="Praxis Manjula Standort"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.5463841262886!2d15.4477!3d47.1672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765c5e8d5d5d5d5%3A0x0!2sSteiermark!5e0!3m2!1sde!2sat!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] p-8 rounded-2xl text-[#0F172A]">
                <h3 className="text-2xl font-bold mb-4">
                  Ayurveda-Massage-Praxis „Manjula“
                </h3>
                <p className="text-lg font-medium">Steiermark, Österreich</p>
                <div className="mt-6 space-y-2">
                  <p>☎ Telefon: +43 (0) 660 ...</p>
                  <p>✉ E-Mail: info@manjula.at</p>
                  <p>🕉️ Termin nach Vereinbarung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
