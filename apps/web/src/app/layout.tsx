import { Providers } from "@/modules/layouts/providers";
import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { fontHeading, fontSans } from "../lib/fonts";

export const metadata: Metadata = {
  title: "manjula Ayurveda",
  description:
    "Welcome to Manjula.com, your destination for wellness and relaxation.",
  icons: {
    icon: [{ url: "/assets/logo2.png", type: "image/png", sizes: "32x32" }],
    apple: "/assets/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassName = `${fontSans.variable} ${fontHeading.variable} font-sans antialiased`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClassName} suppressHydrationWarning>
        <Providers>
          <Suspense>
            {children}
            <Toaster position="bottom-left" />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
