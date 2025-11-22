// app/termin-buchen/page.tsx   (Next.js 13+ App Router)

import Image from "next/image";

export default function TerminInfoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      {/* Haupt-Container – alles zentriert */}
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Linke Seite: Große schwarze Uhr mit Logo */}
        <div className="flex-shrink-0">
          <div className="relative w-80 h-80 lg:w-120 lg:h-120">
            <Image
              src="/assets/logo.png" // ← deine schwarze Uhr mit "Ayurveda by Manjula" drin
              alt="Uhr – Heimat-Urlaub"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Rechte Seite: Text + Button */}
        <div className="text-center lg:text-left space-y-8 max-w-lg">
          {/* Logo oben rechts (klein) */}
          <div className="flex justify-center lg:justify-start mb-6">
            <Image
              src="/assets/clock.png" // ← dein goldenes Logo oben rechts
              alt="Ayurveda by Manjula"
              width={240}
              height={80}
              className="object-contain"
              priority
            />
          </div>

          {/* Haupttext */}
          <div className="space-y-4 text-gray-800">
            <p className="text-lg leading-relaxed">
              Bitte berücksichtigen Sie bei Ihrer Terminwahl meinen
              <br />
              nächsten <strong className="font-bold">Heimat-Urlaub</strong> vom
            </p>

            <p className="text-3xl font-bold text-amber-600">
              16.05. – 18.06.2025
            </p>

            <p className="text-lg leading-relaxed">
              Sie können mir jederzeit ein SMS an meine Nummer
              <br />
              <span className="text-2xl font-bold text-amber-600">
                +43 88 65 34 30
              </span>{" "}
              senden!
            </p>

            <p className="text-2xl font-medium text-gray-900">Vielen Dank!</p>
          </div>

          {/* Goldener Button – exakt wie im Screenshot */}
          <div className="pt-6 flex justify-center lg:justify-start">
            <a
              href="tel:+4388653430"
              className="inline-block bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xl px-10 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center"
            >
              Termin vereinbaren
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
