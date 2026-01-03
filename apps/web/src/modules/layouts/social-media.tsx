"use client";

import {
  Facebook,
  Instagram,
  Mail,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import { useState } from "react";

export function ContactSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    {
      icon: Phone,
      href: "tel:+43660",
      title: "Anrufen",
      ariaLabel: "Telefon",
      color: "hover:bg-green-500",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      title: "Instagram",
      ariaLabel: "Instagram",
      color:
        "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500",
    },
    {
      icon: Mail,
      href: "mailto:info@manjula.at",
      title: "E-Mail ",
      ariaLabel: "E-Mail",
      color: "hover:bg-blue-500",
    },
    {
      icon: Music2,
      href: "https://tiktok.com",
      title: "TikTok",
      ariaLabel: "TikTok",
      color: "hover:bg-black",
    },
    {
      icon: Youtube,
      href: "https://youtube.com",
      title: "YouTube",
      ariaLabel: "YouTube",
      color: "hover:bg-red-600",
    },
    {
      icon: Facebook,
      href: "https://facebook.com",
      title: "Facebook",
      ariaLabel: "Facebook",
      color: "hover:bg-blue-600",
    },
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50 hidden md:block">
      <div className="relative">
        {/* Expanded Social Icons */}
        <div className="absolute bottom-0 right-0 flex flex-col gap-2 mb-20">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <a
                key={link.title}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`
                  group flex items-center justify-center gap-3
                  w-auto min-w-[140px] h-12 px-4 rounded-lg
                  bg-white shadow-lg
                  ${link.color}
                  hover:shadow-xl
                  transition-all duration-300 ease-out
                  ${isExpanded ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-4 scale-95 pointer-events-none"}
                `}
                title={link.title}
                aria-label={link.ariaLabel}
                style={{
                  transitionDelay: isExpanded
                    ? `${index * 50}ms`
                    : `${(socialLinks.length - index - 1) * 30}ms`,
                }}
              >
                <Icon className="w-5 h-5 text-[#D4AF37] group-hover:text-white transition-colors duration-300 flex-shrink-0" />
                <span className="text-sm font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {link.title}
                </span>
              </a>
            );
          })}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            flex items-center justify-center gap-2
            w-auto min-w-[140px] h-12 px-4 rounded-lg
            bg-[#D4AF37] hover:bg-yellow-300
            shadow-2xl border-2 border-white
            hover:from-[#C19A2F] hover:to-[#D4AF37]
            hover:scale-105 hover:shadow-3xl
            transition-all duration-300
            relative z-10
          `}
          aria-label="Toggle social media"
          title="Contact & Social Media"
          aria-expanded={isExpanded}
        >
          <div className="flex flex-col gap-1 items-center justify-center">
            <div
              className={`w-4 h-0.5 bg-white transition-all duration-300 ${isExpanded ? "rotate-45 translate-y-1" : ""}`}
            />
            <div
              className={`w-4 h-0.5 bg-white transition-all duration-300 ${isExpanded ? "opacity-0" : ""}`}
            />
            <div
              className={`w-4 h-0.5 bg-white transition-all duration-300 ${isExpanded ? "-rotate-45 -translate-y-1" : ""}`}
            />
          </div>
          <span className="text-sm font-semibold text-white whitespace-nowrap">
            {isExpanded ? "Close" : "Contact"}
          </span>
        </button>
      </div>
    </div>
  );
}
