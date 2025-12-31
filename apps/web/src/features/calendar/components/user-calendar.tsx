"use client";

import { Calendar } from "@repo/ui/components/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import { format, isSaturday, isSunday, startOfToday } from "date-fns";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarResponse, getAllCalendar } from "../actions/get-all-calendar.action";

const SLOTS = [
  { id: "1", start: "08:00", end: "09:30", label: "08:00 - 09:30" },
  { id: "2", start: "10:00", end: "11:30", label: "10:00 - 11:30" },
  { id: "3", start: "13:00", end: "14:30", label: "13:00 - 14:30" },
  { id: "4", start: "15:00", end: "16:30", label: "15:00 - 16:30" },
  { id: "5", start: "17:00", end: "18:30", label: "17:00 - 18:30" },
];

export function UserCalendar() {
  const [date, setDate] = useState<Date | undefined>(startOfToday());
  const [bookings, setBookings] = useState<CalendarResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await getAllCalendar({ limit: 100, page: 1 });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to load bookings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";
  const dayBookings = bookings.filter(b => b.bookingDate === selectedDateStr);
  const isWeekend = date ? (isSaturday(date) || isSunday(date)) : false;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <motion.div
        className="lg:w-1/3 space-y-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-[#D4AF37]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-gray-800">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Datum wählen</CardTitle>
                <CardDescription>Wählen Sie Ihren Wunschtermin</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => isSaturday(date) || isSunday(date) || date < startOfToday()}
              className="rounded-xl border border-gray-100 dark:border-gray-700 p-3"
              classNames={{
                day_selected: "bg-[#D4AF37] text-white hover:bg-[#C19A2F] focus:bg-[#C19A2F] rounded-lg font-bold shadow-md",
                day_today: "bg-[#D4AF37]/10 text-[#D4AF37] font-bold rounded-lg border border-[#D4AF37]/20",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"),
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="lg:w-2/3"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-lg border-[#D4AF37]/20 dark:border-[#D4AF37]/20 h-full bg-white dark:bg-gray-800">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  {date ? format(date, "EEEE, d. MMMM yyyy") : "Bitte Datum wählen"}
                </CardTitle>
                <CardDescription className="mt-1">
                  Verfügbare Termine für diesen Tag
                </CardDescription>
              </div>
              {date && !isWeekend && (
                 <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-wider border border-green-100 dark:border-green-900/30">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   Geöffnet
                 </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {!date ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center">
                  <CalendarIcon className="w-8 h-8 opacity-40" />
                </div>
                <p className="text-lg font-medium">Bitte wählen Sie ein Datum im Kalender.</p>
              </div>
            ) : isWeekend ? (
              <div className="flex flex-col items-center justify-center py-20 bg-red-50 dark:bg-red-950/10 rounded-2xl border border-dashed border-red-200 dark:border-red-900 space-y-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <XCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
                </div>
                <div className="text-center">
                  <p className="text-red-700 dark:text-red-400 font-bold text-xl mb-1">Geschlossen</p>
                  <p className="text-red-600/70 dark:text-red-400/70">An Samstagen und Sonntagen habe ich geschlossen.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {SLOTS.map((slot, index) => {
                  const isBooked = dayBookings.some(b =>
                    b.startTime === slot.start || b.slotIndex === slot.id
                  );

                  return (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "relative flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                        isBooked
                          ? "bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 opacity-80"
                          : "bg-white dark:bg-gray-800 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/5 hover:-translate-y-1 cursor-default group"
                      )}
                    >
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "p-4 rounded-xl shadow-sm transition-colors duration-300",
                          isBooked
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                            : "bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white"
                        )}>
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <span className={cn(
                            "text-xl font-bold block mb-1 transition-colors",
                            isBooked ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"
                          )}>
                            {slot.label}
                          </span>
                          <div className="flex items-center gap-2">
                            {isBooked ? (
                              <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500/80 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded text-red-600 dark:text-red-400">
                                <XCircle className="w-3.5 h-3.5" /> Belegt
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verfügbar
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={cn(
                        "hidden sm:flex items-center gap-2 font-bold px-4 py-2 rounded-full text-sm",
                        isBooked
                          ? "text-gray-300 dark:text-gray-600 bg-gray-100 dark:bg-gray-800"
                          : "text-white bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
                      )}>
                        {isBooked ? "Reserviert" : "Termin frei"}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
