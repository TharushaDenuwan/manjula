"use client";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white text-black border-t-2 border-amber-400">
      {/* Newsletter Section */}
      <div className="border-b border-amber-400/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">
              Sie haben Fragen?
            </h3>
            <p className="text-gray-300 mb-6">
              Dann kontaktieren Sie mich gerne. Ich werde versuchen, Ihre Fragen
              gerne zu beantworten.
            </p>

            <button className="bg-[#D4AF37] hover:bg-amber-600 text-white px-9 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ">
              Abonnieren
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#D4AF37]">Manjula</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ayurveda Wohlfühlpraxis aus Sri Lanka. Ihre vertrauenswürdige
              Partnerin für traditionelle Ayurveda-Massagen und Wellness.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-amber-400/20 hover:bg-amber-400/40 text-amber-400 rounded-full flex items-center justify-center transition-all"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Über mich</h5>
            <ul className="space-y-2">
              {[
                { label: "Mein Profil", href: "#" },
                { label: "Meine Leistungen", href: "#services" },
                { label: "Erfahrungen", href: "#testimonials" },
                { label: "Kontakt", href: "#contact" },
                { label: "Impressum", href: "#" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Leistungen</h5>
            <ul className="space-y-2">
              {[
                { label: "Ayurveda Massagen", href: "#" },
                { label: "Yoga & Meditation", href: "#" },
                { label: "Kräuterbehandlungen", href: "#" },
                { label: "Dosha-Analyse", href: "#" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Kontakt</h5>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={16}
                  className="text-amber-400 flex-shrink-0 mt-1"
                />
                <span>Großpesendorf 41, 8211 Ilztal, Österreich</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-amber-400" />
                <span>+43 664 88 65 34 30</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-amber-400" />
                <span>relax@manjula.at</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-400/20">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2025 Manjula – Ayurveda aus Sri Lanka. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              {[
                { label: "Impressum", href: "#" },
                { label: "Datenschutz", href: "#" },
                { label: "AGB", href: "#" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-500 hover:text-amber-400 text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
