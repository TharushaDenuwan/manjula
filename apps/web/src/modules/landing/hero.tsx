// "use client";
// import { addContact } from "@/features/admin-contact/actions/add-acontact.action";
// import { Button } from "@repo/ui/components/button";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { DiscountPosts } from "./discount-posts";

// // Section Wrapper Component for Scroll Animations
// function SectionWrapper({ children }: { children: React.ReactNode }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0 },
//         visible: { opacity: 1 },
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export function Hero() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Send email (existing functionality)
//       const emailResponse = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           to: "tharushadenuwan35@gmail.com",
//         }),
//       });

//       if (!emailResponse.ok) {
//         throw new Error("Failed to send email");
//       }

//       // Save contact to database
//       await addContact({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         message: formData.message,
//       });

//       setFormData({ name: "", email: "", phone: "", message: "" });
//       alert("Nachricht gesendet! Vielen Dank 🙏");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(
//         "Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full bg-white text-[#0F172A] overflow-hidden">
//       {/* HERO WITH VIDEO BACKGROUND */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* <video
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           autoPlay
//           loop
//           muted
//           playsInline
//         >
//           <source src="/assets/back4.mp4" type="video/mp4" />
//         </video> */}

//         <motion.div
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           style={{
//             backgroundImage: "url('/assets/backland.JPG')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundAttachment: "fixed",
//           }}
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />

//         {/* Dark overlay + golden accent */}
//         <div className="absolute inset-0 bg-black/70"></div>
//         <motion.div
//           className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         />

//         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
//           <motion.h1
//             className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             Ayubowan{" "}
//             <motion.span
//               className="block text-4xl md:text-6xl text-[#D4AF37] mt-4"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             >
//               ~ ich wünsche Dir ein gesundes, langes Leben ~
//             </motion.span>
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-95"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
//           >
//             Mein Name ist <strong>Hakkini Manjula De Silva</strong> – Freunde
//             nennen mich "Manju". Ich komme aus Balapitiya, Sri Lanka und bringe
//             über <strong className="text-[#D4AF37]">27 Jahre Erfahrung</strong>{" "}
//             in traditioneller Ayurveda-Massage mit.
//           </motion.p>
//           <motion.div
//             className="mt-10"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
//           >
//             <motion.p
//               className="text-2xl italic"
//               animate={{
//                 y: [0, -10, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               Ayubowan
//             </motion.p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ABOUT SECTION – ELEGANT & GOLD ACCENTS */}
//       <SectionWrapper>
//         <section className="py-24 px-6 bg-white">
//           <div className="max-w-5xl mx-auto text-center">
//             <motion.h2
//               className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-4"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               Willkommen bei Manjula
//             </motion.h2>
//             <motion.p
//               className="text-[#D4AF37] text-xl mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Ayurveda Wohlfühlpraktik aus Sri Lanka
//             </motion.p>

//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <motion.div
//                 className="space-y-8 text-left text-lg leading-relaxed"
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//               >
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.4 }}
//                 >
//                   Ich bin ausgebildeter Masseur mit dem Ausbildungsprofil für
//                   das ganzheitlich in sich geschlossene System{" "}
//                   <strong className="text-[#D4AF37]">
//                     Ayurveda Wohlfühlpraktik
//                   </strong>
//                   und bringe über
//                   <strong className="text-[#D4AF37]">
//                     27 Jahre Berufserfahrung
//                   </strong>
//                   mit. In den letzten zehn Jahren habe ich einen Ayurveda-Spa in
//                   einem Salzburger Wellnesshotel geleitet.
//                 </motion.p>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.5 }}
//                 >
//                   Seit 2021 bin ich mit meiner Ayurveda-Massage-Praxis{" "}
//                   <strong>"Manjula"</strong>. in der Steiermark selbständig. Ich
//                   freue mich sehr, wenn ich Ihnen helfen kann!{" "}
//                 </motion.p>
//                 <motion.p
//                   className="text-xl font-semibold text-[#0F172A]"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.6 }}
//                 >
//                   Ich freue mich sehr, wenn ich{" "}
//                   <span className="text-[#D4AF37]">Ihnen</span> helfen darf.
//                 </motion.p>
//               </motion.div>
//               <motion.div
//                 className="flex justify-center"
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//               >
//                 <motion.div
//                   className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-10 rounded-full"
//                   whileHover={{ scale: 1.05, rotate: 2 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <motion.div
//                     className="relative w-80 h-80 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl"
//                     style={{
//                       backgroundImage: "url('/assets/6.JPG')",
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                     }}
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       </SectionWrapper>

//       {/* SERVICES – GOLDEN CARDS */}
//       <SectionWrapper>
//         <section className="py-4 px-6 bg-white">
//           <div className="max-w-7xl mx-auto">
//             <motion.h2
//               className="text-5xl font-bold text-center text-[#0F172A] mb-4"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               Meine Leistungen
//             </motion.h2>
//             <motion.p
//               className="text-[#D4AF37] text-center text-xl mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Tradition trifft Wohlbefinden
//             </motion.p>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               {[
//                 {
//                   title: "Massagen",
//                   icon: "꩜",
//                   desc: "Abhyanga, Shirodhara, Pinda Sveda & mehr",
//                   path: "/massage",
//                 },
//                 // {
//                 //   title: "Yoga & Meditation",
//                 //   icon: "🕉",
//                 //   desc: "Privatstunden & Gruppenkurse",
//                 // },
//                 {
//                   title: "Ayurveda",
//                   icon: "☾𖤓",
//                   desc: "Individuelle Öle & Packungen",
//                 },
//                 {
//                   title: "Termin buchen",
//                   icon: "⏲",
//                   desc: "Persönliche Lebensberatung",
//                 },
//               ].map((service, index) => (
//                 <motion.div
//                   key={service.title}
//                   className="group bg-white rounded-2xl p-8 text-center border border-[#D4AF37]/20"
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   whileHover={{
//                     y: -12,
//                     scale: 1.02,
//                     boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)",
//                   }}
//                 >
//                   <motion.div
//                     className="text-6xl mb-6"
//                     whileHover={{
//                       scale: 1.2,
//                       rotate: [0, -10, 10, -10, 0],
//                     }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {service.icon}
//                   </motion.div>
//                   <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#D4AF37] transition-colors">
//                     {service.title}
//                   </h3>
//                   <p className="text-gray-600">{service.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </SectionWrapper>

//       {/* DISCOUNT POSTS */}
//       <DiscountPosts />

//       {/* CONTACT & MAP – LUXURIOUS GOLD/WHITE */}
//       <SectionWrapper>
//         <section id="contact" className="py-24 px-6 bg-white">
//           <div className="max-w-7xl mx-auto">
//             <motion.h2
//               className="text-5xl font-bold text-center text-[#0F172A] mb-4"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               Kontaktieren Sie mich
//             </motion.h2>
//             <motion.p
//               className="text-[#D4AF37] text-center text-xl mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Ich freue mich auf Ihre Nachricht
//             </motion.p>

//             <div className="grid lg:grid-cols-2 gap-12">
//               {/* Form */}
//               <motion.div
//                 className="bg-gradient-to-br from-[#FAF9F6] to-white p-10 rounded-3xl shadow-xl border border-[#D4AF37]/30"
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.h3
//                   className="text-3xl font-bold text-[#0F172A] mb-8"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.2 }}
//                 >
//                   Nachricht senden
//                 </motion.h3>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {[
//                     { type: "text", placeholder: "Name *", field: "name" },
//                     {
//                       type: "email",
//                       placeholder: "E-Mail-Adresse *",
//                       field: "email",
//                     },
//                     { type: "tel", placeholder: "Telefon *", field: "phone" },
//                   ].map((input, index) => (
//                     <motion.input
//                       key={input.field}
//                       type={input.type}
//                       required
//                       placeholder={input.placeholder}
//                       value={formData[input.field as keyof typeof formData]}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           [input.field]: e.target.value,
//                         })
//                       }
//                       className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none transition"
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//                       whileFocus={{ scale: 1.02 }}
//                     />
//                   ))}
//                   <motion.textarea
//                     required
//                     rows={6}
//                     placeholder="Nachricht *"
//                     value={formData.message}
//                     onChange={(e) =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                     className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none resize-none transition"
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.6 }}
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.7 }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full bg-[#D4AF37] hover:bg-[#C19A2F] text-[#0F172A] font-bold text-lg py-6 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? "Wird gesendet..." : "Nachricht senden 🙏"}
//                     </Button>
//                   </motion.div>
//                 </form>
//               </motion.div>

//               {/* Map & Info */}
//               <motion.div
//                 className="space-y-8"
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.div
//                   className="bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <iframe
//                     title="Praxis Manjula Standort - Großpesendorf 41, 8211 Ilztal, Österreich"
//                     src={`https://www.google.com/maps?q=${encodeURIComponent("Großpesendorf 41, 8211 Ilztal, Austria")}&output=embed`}
//                     width="100%"
//                     height="400"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   />
//                 </motion.div>

//                 <motion.div
//                   className="bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] p-8 rounded-2xl text-[#0F172A]"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   whileHover={{ scale: 1.02, rotate: 0.5 }}
//                   transition={{ duration: 0.6, delay: 0.3 }}
//                 >
//                   <h3 className="text-2xl font-bold mb-4">
//                     Ayurveda-Massage-Praxis „Manjula"
//                   </h3>
//                   <p className="text-lg font-medium">Steiermark, Österreich</p>
//                   <div className="mt-6 space-y-2">
//                     <p>☎ Telefon: +43 (0) 660 ...</p>
//                     <p>✉ E-Mail: info@manjula.at</p>
//                     <p>🕉️ Termin nach Vereinbarung</p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       </SectionWrapper>
//     </div>
//   );
// }

"use client";
import { addContact } from "@/features/admin-contact/actions/add-acontact.action";
import { Button } from "@repo/ui/components/button";
import { motion, useAnimation, useInView } from "framer-motion";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DiscountPosts } from "./discount-posts";
import { ReviewSection } from "./review";

// Section Wrapper Component for Scroll Animations
function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  // Services with navigation paths
  const services = [
    {
      title: "Massagen",
      icon: "꩜",
      desc: "Abhyanga, Shirodhara, Pinda Sveda & mehr",
      path: "/massage",
    },
    {
      title: "Ayurveda",
      icon: "☾𖤓",
      desc: "Individuelle Öle & Packungen",
      path: "/ayurveda",
    },
    {
      title: "Termin buchen",
      icon: "⏲",
      desc: "Persönliche Lebensberatung",
      path: "/termin-buchen",
    },
  ];

  // Handle scroll to contact section when hash is present
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#contact" && contactRef.current) {
        // Wait for page to fully load and animations to start
        const scrollToContact = () => {
          if (contactRef.current) {
            contactRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        };

        // Use multiple strategies to ensure scroll happens after page load
        // Strategy 1: Wait for next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Strategy 2: Additional delay for animations
            setTimeout(scrollToContact, 600);
          });
        });
      }
    };

    // Check on mount (with delay for page load)
    const timer = setTimeout(handleHashScroll, 100);

    // Also listen for hash changes
    window.addEventListener("hashchange", handleHashScroll);

    // Listen for when page becomes visible (handles navigation from other pages)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleHashScroll();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send email (existing functionality)
      const emailResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "tharushadenuwan35@gmail.com",
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      // Save contact to database
      await addContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      alert("Nachricht gesendet! Vielen Dank 🙏");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 text-[#0F172A] dark:text-white overflow-hidden">
      {/* HERO WITH VIDEO BACKGROUND */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/back4.mp4" type="video/mp4" />
        </video> */}

        <motion.div
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            backgroundImage: "url('/assets/backland.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Dark overlay + golden accent */}
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ayubowan{" "}
            <motion.span
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#D4AF37] mt-2 sm:mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              ~ ich wünsche Dir ein gesundes, langes Leben ~
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed opacity-95 px-2 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Mein Name ist <strong>Hakkini Manjula De Silva</strong> – Freunde
            nennen mich "Manju". Ich komme aus Balapitiya, Sri Lanka und bringe
            über <strong className="text-[#D4AF37]">27 Jahre Erfahrung</strong>{" "}
            in traditioneller Ayurveda-Massage mit.
          </motion.p>
          <motion.div
            className="mt-6 sm:mt-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl italic"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Ayubowan
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION – ELEGANT & GOLD ACCENTS */}
      <SectionWrapper>
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-white mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              Willkommen bei Manjula
            </motion.h2>
            <motion.p
              className="text-[#D4AF37] text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ayurveda Wohlfühlpraktik aus Sri Lanka
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <motion.div
                className="space-y-4 sm:space-y-6 md:space-y-8 text-left text-sm sm:text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Ich bin ausgebildeter Masseur mit dem Ausbildungsprofil für
                  das ganzheitlich in sich geschlossene System{" "}
                  <strong className="text-[#D4AF37]">
                    Ayurveda Wohlfühlpraktik
                  </strong>
                  und bringe über
                  <strong className="text-[#D4AF37]">
                    27 Jahre Berufserfahrung
                  </strong>
                  mit. In den letzten zehn Jahren habe ich einen Ayurveda-Spa in
                  einem Salzburger Wellnesshotel geleitet.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Seit 2021 bin ich mit meiner Ayurveda-Massage-Praxis{" "}
                  <strong>"Manjula"</strong>. in der Steiermark selbständig. Ich
                  freue mich sehr, wenn ich Ihnen helfen kann!{" "}
                </motion.p>
                <motion.p
                  className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A] dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Ich freue mich sehr, wenn ich{" "}
                  <span className="text-[#D4AF37]">Ihnen</span> helfen darf.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex justify-center mt-6 md:mt-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-4 sm:p-6 md:p-10 rounded-full"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl"
                    style={{
                      backgroundImage: "url('/assets/6.JPG')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* SERVICES – GOLDEN CARDS WITH NAVIGATION */}
      <SectionWrapper>
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0F172A] dark:text-white mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              Meine Leistungen
            </motion.h2>
            <motion.p
              className="text-[#D4AF37] text-center text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tradition trifft Wohlbefinden
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {services.map((service, index) => (
                <Link href={service.path} key={service.title}>
                  <motion.div
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-7 md:p-8 text-center border border-[#D4AF37]/20 dark:border-[#D4AF37]/30 cursor-pointer h-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)",
                    }}
                  >
                    <motion.div
                      className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6"
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {service.desc}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* DISCOUNT POSTS */}
      <DiscountPosts />

      {/* REVIEWS SECTION */}
      <ReviewSection />

      {/* CONTACT & MAP – LUXURIOUS GOLD/WHITE */}
      <SectionWrapper>
        <section
          id="contact"
          ref={contactRef}
          className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0F172A] dark:text-white mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              Kontaktieren Sie mich
            </motion.h2>
            <motion.p
              className="text-[#D4AF37] text-center text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ich freue mich auf Ihre Nachricht
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Form */}
              <motion.div
                className="bg-gradient-to-br from-[#FAF9F6] dark:from-gray-800 to-white dark:to-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl border border-[#D4AF37]/30 dark:border-[#D4AF37]/20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Nachricht senden
                </motion.h3>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  {[
                    { type: "text", placeholder: "Name *", field: "name" },
                    {
                      type: "email",
                      placeholder: "E-Mail-Adresse *",
                      field: "email",
                    },
                    { type: "tel", placeholder: "Telefon *", field: "phone" },
                  ].map((input, index) => (
                    <motion.input
                      key={input.field}
                      type={input.type}
                      required
                      placeholder={input.placeholder}
                      value={formData[input.field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [input.field]: e.target.value,
                        })
                      }
                      className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#D4AF37] focus:ring-2 sm:focus:ring-4 focus:ring-[#D4AF37]/20 outline-none transition"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                  ))}
                  <motion.textarea
                    required
                    rows={5}
                    placeholder="Nachricht *"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#D4AF37] focus:ring-2 sm:focus:ring-4 focus:ring-[#D4AF37]/20 outline-none resize-none transition"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#D4AF37] hover:bg-[#f2cd54] hover:text-white border-2 border-[#eeeeee] text-[#ffffff] font-bold text-base sm:text-lg py-4 sm:py-5 md:py-6 rounded-lg sm:rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Wird gesendet..." : "Nachricht senden"}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Map & Info */}
              <motion.div
                className="space-y-6 sm:space-y-7 md:space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="bg-[#0F172A] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    title="Praxis Manjula Standort - Großpesendorf 41, 8211 Ilztal, Österreich"
                    src={`https://www.google.com/maps?q=${encodeURIComponent("Großpesendorf 41, 8211 Ilztal, Austria")}&output=embed`}
                    width="100%"
                    height="300"
                    className="sm:h-[350px] md:h-[400px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>

                <motion.div
                  className="bg-transparent p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl text-[#5f6164] border-2 border-[#eeeeee]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, rotate: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black dark:text-white">
                    Ayurveda-Massage-Praxis "Manjula"
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-black dark:text-white">
                    Steiermark, Österreich
                  </p>
                  <div className="mt-4 sm:mt-5 md:mt-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-[#5f6164] dark:text-gray-300">
                    <p>☎ Telefon: +43 664 88653430</p>
                    <p>✉ E-Mail: relax@manjula.at</p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Termin nach Vereinbarung
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>
    </div>
  );
}
