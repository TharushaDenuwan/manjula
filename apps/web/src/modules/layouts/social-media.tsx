// components/ContactSidebar.tsx
"use client";

import { Facebook, Instagram, Mail, Music, Phone, Youtube } from "lucide-react";
import { useState } from "react";

export function ContactSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainIcons = [
    { icon: Phone, href: "tel:+43660", title: "Anrufen", ariaLabel: "Telefon" },
    {
      icon: Instagram,
      href: "https://instagram.com",
      title: "Instagram",
      ariaLabel: "Instagram",
      isExpander: true,
    },
    {
      icon: Mail,
      href: "mailto:info@manjula.at",
      title: "E-Mail senden",
      ariaLabel: "E-Mail",
    },
  ];

  const socialIcons = [
    {
      icon: Music,
      href: "https://tiktok.com",
      title: "TikTok",
      ariaLabel: "TikTok",
    },
    {
      icon: Youtube,
      href: "https://youtube.com",
      title: "YouTube",
      ariaLabel: "YouTube",
    },
    {
      icon: Facebook,
      href: "https://facebook.com",
      title: "Facebook",
      ariaLabel: "Facebook",
    },
  ];

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Expanded Social Icons */}
      <div className="flex">
        {socialIcons.map((link, index) => {
          const Icon = link.icon;
          const isFirst = index === 0;

          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center bg-white border border-gray-200
                hover:bg-[#D4AF37]/10 hover:scale-110
                transition-all duration-300
                ${isExpanded ? "w-14 h-14 opacity-100" : "w-0 opacity-0 overflow-hidden"}
                ${isFirst ? "rounded-l-2xl border-r-0" : "border-l-0"}   /* ← Only first icon (TikTok) gets left rounded corner */
              `}
              title={link.title}
              aria-label={link.ariaLabel}
              style={{
                transitionDelay: isExpanded ? `${index * 80}ms` : "0ms",
              }}
            >
              <Icon className="w-5 h-5 text-[#D4AF37]" />
            </a>
          );
        })}
      </div>

      {/* Main Icons (Phone, Instagram trigger, Mail) */}
      <div className="bg-white rounded-l-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col">
          {mainIcons.map((link) => {
            const Icon = link.icon;

            if (link.isExpander) {
              return (
                <button
                  key={link.title}
                  onMouseEnter={() => setIsExpanded(true)}
                  className="p-5 hover:bg-[#D4AF37]/10 transition-all duration-300 group border-b border-gray-200"
                  title={link.title}
                  aria-label={link.ariaLabel}
                >
                  <Icon className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </button>
              );
            }

            return (
              <a
                key={link.title}
                href={link.href}
                className="p-5 hover:bg-[#D4AF37]/10 transition-all duration-300 group border-b border-gray-200"
                title={link.title}
                aria-label={link.ariaLabel}
              >
                <Icon className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
