"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

type Props = {};

export function Navbar({}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/massage", label: "Massage" },
    { href: "/yoga", label: "Yoga" },
    { href: "/ayurveda", label: "Ayurveda" },
    { href: "/produkts", label: "Produkts" },
    { href: "/gallary", label: "Gallary" },
    { href: "/termin-buchen", label: "Termin buchen" },
  ];

  return (
    <>
      {/* Sticky Navbar - White Background */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm"
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Bloonsoo Logo"
              className="h-15 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Centered Navigation Links - Desktop Only */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium text-sm transition-colors",
                pathname === item.href
                  ? "text-[#E4BF3C] font-semibold"
                  : "text-black dark:text-white hover:text-[#E4BF3C]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle - Desktop Only */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          {/* Admin Login Button - Desktop Only */}
          <Button
            variant="outline"
            className={cn(
              "hidden md:flex text-white bg-[#E4BF3C] hover:bg-yellow-300 hover:text-white cursor-pointer border-none"
            )}
            onClick={() => {
              const activeOrgId = session?.session?.activeOrganizationId;
              if (activeOrgId) {
                router.push("/account");
              } else {
                router.push("/account");
              }
            }}
          >
            Admin Login
          </Button>

          {/* Theme Toggle - Mobile */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src="/assets/logo.png"
              alt="AYURVEDA by Manjula"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg font-medium text-base transition-colors",
                pathname === item.href
                  ? "text-[#E4BF3C] font-semibold bg-[#E4BF3C]/10"
                  : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#E4BF3C]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            className={cn(
              "w-full text-white bg-[#E4BF3C] hover:bg-[#f6d355] hover:text-white cursor-pointer border-none"
            )}
            onClick={() => {
              setIsMobileMenuOpen(false);
              const activeOrgId = session?.session?.activeOrganizationId;
              if (activeOrgId) {
                router.push("/account");
              } else {
                router.push("/account");
              }
            }}
          >
            Admin Login
          </Button>
        </div>
      </div>

      {/* Spacer so content isn't hidden behind navbar */}
      <div className="h-16" />
    </>
  );
}
