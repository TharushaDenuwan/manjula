"use client";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white border-t-2 border-amber-400 dark:border-amber-500">
      {/* Newsletter Section */}
      <div className="border-b border-amber-400/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">
              Sie haben Fragen?
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-6">
              Dann kontaktieren Sie mich gerne. Ich werde versuchen, Ihre Fragen
              gerne zu beantworten.
            </p>

            <Link
              href="/#contact"
              className="inline-block bg-[#D6AF15] hover:bg-amber-300 text-white px-9 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Abonnieren
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-1 py-12 max-w-7xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Image
                src="/assets/logo.png"
                alt="Manjula Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
              <h4 className="text-xl font-bold text-[#D4AF37]">Manjula</h4>
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
              Ayurveda Wohlfühlpraxis aus Sri Lanka. Ihre vertrauenswürdige
              Partnerin für traditionelle Ayurveda-Massagen und Wellness.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Youtube, Instagram, Music2].map((Icon, i) => (
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
            <h5 className="text-lg font-semibold text-black dark:text-white">Über mich</h5>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Massage", href: "/massage" },
                { label: "Ayurveda", href: "/ayurveda" },
                { label: "Produkts", href: "/produkts" },
                { label: "Termin buchen", href: "/termin-buchen" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-black dark:text-white">Kontakt</h5>
            <div className="space-y-3 text-gray-400 dark:text-gray-300 text-sm">
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

          {/* Right Side Logo */}
          <div className="flex justify-center lg:justify-end items-start">
            <Image
              src="/assets/logo.png"
              alt="Manjula Logo Right"
              width={300}
              height={300}
              className="rounded-full  "
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-400/20">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
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
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-400 dark:hover:text-amber-500 text-sm transition-colors"
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
