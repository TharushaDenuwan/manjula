"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  format,
  isSaturday,
  isSunday,
  isWithinInterval,
  parseISO,
  startOfToday,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  Loader2,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteCalendar } from "../actions/delete-calendar.action";
import {
  CalendarResponse,
  getAllCalendar,
} from "../actions/get-all-calendar.action";
import {
  getShopClosedDays,
  ShopClosedDay,
} from "../actions/shop-availability.action";
import { BookSlotDialog } from "./book-slot-dialog";
import { ClosedDaysManager } from "./closed-days-manager";

const SLOTS = [
  { id: "1", start: "08:00", end: "09:30", label: "08:00 - 09:30" },
  { id: "2", start: "10:00", end: "11:30", label: "10:00 - 11:30" },
  { id: "3", start: "13:00", end: "14:30", label: "13:00 - 14:30" },
  { id: "4", start: "15:00", end: "16:30", label: "15:00 - 16:30" },
  { id: "5", start: "17:00", end: "18:30", label: "17:00 - 18:30" },
];

export function AdminCalendar() {
  // Initialize with today's date to ensure consistency between server and client
  const [date, setDate] = useState<Date | undefined>(startOfToday());
  const [bookings, setBookings] = useState<CalendarResponse[]>([]);
  const [closedDays, setClosedDays] = useState<ShopClosedDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const [bookingsResponse, closedDaysResponse] = await Promise.all([
        getAllCalendar({ limit: 100, page: 1 }),
        getShopClosedDays(),
      ]);
      setBookings(bookingsResponse.data);
      setClosedDays(closedDaysResponse);
    } catch (error) {
      toast.error("Failed to load calendar data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCalendar(id);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  // Filter bookings for selected date
  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";
  const dayBookings = bookings.filter((b) => b.bookingDate === selectedDateStr);

  const isShopClosed = (checkDate: Date) => {
    if (isSaturday(checkDate) || isSunday(checkDate)) return true;

    return closedDays.some((range) => {
      const start = parseISO(range.startDate);
      const end = parseISO(range.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return isWithinInterval(checkDate, { start, end });
    });
  };

  const isWeekend = date ? isShopClosed(date) : false;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:w-[350px] flex-shrink-0 space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm p-4 w-full flex justify-center"
                classNames={{
                  day_selected:
                    "bg-[#D4AF37] text-white hover:bg-[#C19A2F] focus:bg-[#C19A2F]",
                  day_today: "bg-[#D4AF37]/10 text-[#D4AF37] font-bold",
                }}
              />
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-sm sm:text-base">
                <Clock className="w-4 h-4 text-amber-600" />
                Legend
              </h4>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span>Closed/Past</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Slots Area */}
        <div className="flex-1">
          <Card className="border-border h-fit">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl break-words">
                  {date ? format(date, "EEEE, MMMM do, yyyy") : "Select a date"}
                </CardTitle>
                <CardDescription className="text-sm">
                  Manage appointments for this day
                </CardDescription>
              </div>
              {isLoading && (
                <Loader2 className="animate-spin text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              {!date ? (
                <div className="text-center py-12 sm:py-20 px-4 text-muted-foreground text-sm sm:text-base">
                  Please select a date to view slots.
                </div>
              ) : isWeekend ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 bg-red-50 dark:bg-red-950/10 rounded-xl border border-dashed border-red-200">
                  <span className="text-red-500 font-bold text-base sm:text-lg mb-2">
                    We are Closed
                  </span>
                  <p className="text-muted-foreground text-sm sm:text-base text-center">
                    The center is closed on Saturdays and Sundays.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {SLOTS.map((slot) => {
                    const booking = dayBookings.find(
                      (b) =>
                        b.startTime === slot.start || b.slotIndex === slot.id
                    );
                    const isBooked = !!booking;

                    return (
                      <div
                        key={slot.id}
                        className={`
                          flex flex-col p-3 sm:p-4 rounded-xl border transition-all
                          ${
                            isBooked
                              ? "bg-red-50 dark:bg-red-950/10 border-red-100 dark:border-red-900"
                              : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-[#D4AF37]/50"
                          }
                        `}
                      >
                        {/* Mobile and Desktop Layout */}
                        <div className="flex flex-col gap-3">
                          {/* Time Slot - Always on top */}
                          <div className="flex items-center justify-between gap-3">
                            <div
                              className={`
                              px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm text-center flex-shrink-0
                              ${isBooked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                            `}
                            >
                              {slot.label}
                            </div>
                            
                            {/* Actions - Next to time slot on all screens when not booked */}
                            {!isBooked && (
                              <div className="flex items-center gap-2">
                                <BookSlotDialog
                                  date={format(date, "yyyy-MM-dd")}
                                  slot={slot}
                                  onSuccess={fetchBookings}
                                />
                              </div>
                            )}
                          </div>

                          {/* Customer Info - Below time slot when booked */}
                          {isBooked && (
                            <>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex flex-col flex-1 min-w-0">
                                  <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {booking.customerName}
                                    </span>
                                  </span>
                                  <span className="text-xs sm:text-sm text-gray-500 break-words ml-6">
                                    {booking.customerPhone || "No phone"} •{" "}
                                    {booking.customerEmail || "No email"}
                                  </span>
                                  {booking.notes && (
                                    <span className="text-xs text-amber-600 mt-1 italic line-clamp-2 ml-6">
                                      Note: {booking.notes}
                                    </span>
                                  )}
                                </div>

                                {/* Actions for booked slots */}
                                <div className="flex items-center gap-2 ml-6 sm:ml-0">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[#D4AF37] hover:text-[#C19A2F] hover:bg-amber-50 h-9 w-9 sm:h-10 sm:w-10"
                                    asChild
                                  >
                                    <a
                                      href={booking.paymentSlip}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 sm:h-10 sm:w-10"
                                      >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="max-w-[90vw] sm:max-w-[425px]">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-base sm:text-lg">
                                          Cancel Appointment?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm">
                                          This will permanently remove the booking
                                          for{" "}
                                          <strong>{booking.customerName}</strong>.
                                          This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDelete(booking.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Confirm Cancel
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Closed Days Management - Now prominent and under everything */}
      <div className="w-full border-t pt-6 sm:pt-8">
        <ClosedDaysManager />
      </div>
    </div>
  );
}
