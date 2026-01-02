"use client";

import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { format, isAfter, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CalendarOff, Loader2, Plane, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addShopClosedDays, deleteShopClosedDays, getShopClosedDays, ShopClosedDay } from "../actions/shop-availability.action";

export function ClosedDaysManager() {
  const [closedDays, setClosedDays] = useState<ShopClosedDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getShopClosedDays();
      setClosedDays(data);
    } catch (error) {
      toast.error("Failed to load closed days");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    if (isAfter(parseISO(startDate), parseISO(endDate))) {
      toast.error("Start date must be before end date");
      return;
    }

    setIsSubmitting(true);
    try {
      await addShopClosedDays({ startDate, endDate, reason });
      toast.success("Days blocked successfully");
      setStartDate("");
      setEndDate("");
      setReason("");
      fetchData();
    } catch (error) {
      toast.error("Failed to block days");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteShopClosedDays(id);
      toast.success("Blocked range removed");
      fetchData();
    } catch (error) {
      toast.error("Failed to remove range");
    }
  };

  return (
    <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl">
            <Plane className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black">Vacation Mode & Closing Times</CardTitle>
            <CardDescription className="font-medium">
              Block entire date ranges. No bookings can be made during these periods.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-10">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-amber-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-end bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Start</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 focus:ring-[#D4AF37]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">End</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 focus:ring-[#D4AF37]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Reason (Optional)</Label>
              <Input
                id="reason"
                placeholder="e.g. Vacation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="rounded-xl border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 focus:ring-[#D4AF37]"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CalendarOff className="w-5 h-5 mr-2" /> Block Range</>}
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
               <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-800" />
               Active Blocks
            </h4>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[#D4AF37] w-8 h-8" />
            </div>
          ) : closedDays.length === 0 ? (
            <div className="text-center py-16 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/10">
              <CalendarOff className="w-12 h-12 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
              <p className="text-lg font-bold text-muted-foreground">No active closing times configured.</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid gap-4">
                {closedDays.map((range) => (
                  <motion.div
                    key={range.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-red-200 dark:hover:border-red-900/50 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-2xl group-hover:rotate-6 transition-transform">
                        <CalendarOff className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-black text-xl text-gray-900 dark:text-white">
                          {format(parseISO(range.startDate), "MMM d")} — {format(parseISO(range.endDate), "MMM d, yyyy")}
                        </p>
                        {range.reason && (
                          <p className="text-sm text-red-600/70 dark:text-red-400/80 font-bold uppercase tracking-wider mt-1">{range.reason}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(range.id)}
                      className="w-12 h-12 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        <div className="p-6 bg-amber-50/50 dark:bg-amber-950/10 rounded-[2rem] border border-amber-100 dark:border-amber-900/30 flex gap-4">
          <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm h-fit">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm text-amber-900 dark:text-amber-400 leading-relaxed font-medium">
            <strong className="block mb-1 text-base">Important Note:</strong>
            These settings override all other availabilities. Customers will see these days as "Closed" and will not be able to select any appointments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
