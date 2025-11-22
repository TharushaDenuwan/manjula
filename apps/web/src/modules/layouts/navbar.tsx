"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export function Navbar({}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/massage", label: "Massage" },

    { href: "/ayurveda", label: "Ayurveda" },
    { href: "/termin-buchen", label: "Termin buchen" },
    { href: "/produkts", label: "Produkts" },
  ];

  return (
    <>
      {/* Sticky Navbar - White Background */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-4 lg:px-8 bg-white  border-gray-200 shadow-sm"
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Bloonsoo Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <nav className="flex-1 flex justify-center items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium text-sm transition-colors",
                pathname === item.href
                  ? "text-[#E4BF3C] font-semibold"
                  : "text-black hover:text-[#E4BF3C]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={cn(
              "text-white  bg-[#E4BF3C] hover:bg-[#f6d355] hover:text-white cursor-pointer border-none"
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
        </div>
      </div>

      {/* Spacer so content isn't hidden behind navbar */}
      <div className="h-16" />
    </>
  );
}
