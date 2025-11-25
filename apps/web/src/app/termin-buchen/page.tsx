"use client";

// app/termin-buchen/page.tsx   (Next.js 13+ App Router)

import { motion } from "framer-motion";
import Image from "next/image";

export default function TerminInfoPage() {
  return (
    <div className=" bg-white flex flex-col items-center justify-center px-6 py-16">
      {/* Haupt-Container – alles zentriert */}
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
        {/* Linke Seite: Große schwarze Uhr mit Logo */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
        >
          <div className="relative w-80 h-80 lg:w-100 lg:h-100">
            <Image
              src="/assets/logo.png" // ← deine schwarze Uhr mit "Ayurveda by Manjula" drin
              alt="Uhr – Heimat-Urlaub"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Rechte Seite: Text + Button */}
        <motion.div
          className="text-center lg:text-left space-y-4 max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Logo oben rechts (klein) */}
          <motion.div
            className="flex justify-center lg:justify-start mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/assets/clock.png" // ← dein goldenes Logo oben rechts
              alt="Ayurveda by Manjula"
              width={240}
              height={80}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Haupttext */}
          <motion.div
            className="space-y-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Bitte berücksichtigen Sie bei Ihrer Terminwahl meinen
              <br />
              nächsten <strong className="font-bold">Heimat-Urlaub</strong> von
            </motion.p>

            <motion.p
              className="text-3xl font-bold text-[#D7B51B]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              16.05. – 18.06.2025
            </motion.p>

            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Sie können mir jederzeit ein SMS an meine Nummer
              <br />
              <motion.span
                className="text-2xl font-bold text-[#D7B51B] inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                +43 664 88653430
              </motion.span>{" "}
              senden!
            </motion.p>

            <motion.p
              className="text-2xl  text-[#000000] font-extrabold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Vielen Dank!
            </motion.p>
          </motion.div>

          {/* Goldener Button – exakt wie im Screenshot */}
          <motion.div
            className="pt-6 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="tel:+4388653430"
              className="inline-block bg-[#D7B51B] hover:bg-amber-300 text-white font-bold text-xl px-10 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl text-center"
            >
              Termin vereinbaren
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
