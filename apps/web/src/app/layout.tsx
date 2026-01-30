import { Providers } from "@/modules/layouts/providers";
import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { fontHeading, fontSans } from "../lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://manjula.cloud"),
  title: {
    default: "Ayurveda by Manjula",
    template: "%s | Ayurveda by Manjula",
  },
  description:
    "Erleben Sie authentische Ayurveda-Heilung und ganzheitliches Wohlbefinden bei Ayurveda by Manjula. Traditionelle Massagen und Behandlungen von Hakkini Manjula De Silva mit über 27 Jahren Erfahrung.",
  applicationName: "Ayurveda by Manjula",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ayurveda by Manjula",
    description:
      "Erleben Sie authentische Ayurveda-Heilung und ganzheitliches Wohlbefinden bei Ayurveda by Manjula. Traditionelle Massagen und Behandlungen von Hakkini Manjula De Silva mit über 27 Jahren Erfahrung.",
    siteName: "Ayurveda by Manjula",
    url: "https://manjula.cloud",
    type: "website",
    locale: "de_AT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurveda by Manjula",
    description:
      "Erleben Sie authentische Ayurveda-Heilung und ganzheitliches Wohlbefinden bei Ayurveda by Manjula.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* JSON-LD for Google Site Name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ayurveda by Manjula",
              alternateName: "Manjula Ayurveda",
              url: "https://manjula.cloud",
            }),
          }}
        />
      </head>

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
