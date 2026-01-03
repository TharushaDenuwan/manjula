"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface AddCalendarSchema {
  userId?: string | null;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  paymentSlip: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  slotIndex?: string | null;
  status?: "confirmed" | "cancelled" | "completed" | "pending";
  notes?: string | null;
}

export interface CalendarResponse {
  id: string;
  userId: string | null;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  paymentSlip: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  slotIndex: string | null;
  status: string;
  notes: string | null;
  updatedAt: string | null;
  createdAt: string | null;
}

export async function addCalendar(
  data: AddCalendarSchema
): Promise<CalendarResponse> {
  const client = await getClient();

  const response = await client.api.calendar.$post({
    json: {
      userId: data.userId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      paymentSlip: data.paymentSlip,
      bookingDate: data.bookingDate,
      startTime: data.startTime,
      endTime: data.endTime,
      slotIndex: data.slotIndex,
      status: data.status || "confirmed",
      notes: data.notes,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to create calendar booking");
  }

  const calendarData = (await response.json()) as CalendarResponse;

  // Send confirmation email if customer email is provided
  if (data.customerEmail) {
    try {
      const { sendBookingConfirmation } = await import(
        "./send-booking-confirmation"
      );
      await sendBookingConfirmation({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        bookingDate: data.bookingDate,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      console.log(
        `Booking confirmation email queued for: ${data.customerEmail}`
      );
    } catch (emailError) {
      console.error("Failed to send booking confirmation email:", emailError);

      // Check if it's a Resend sandbox mode issue
      if (
        emailError &&
        typeof emailError === "object" &&
        "message" in emailError
      ) {
        const errorMessage = String(emailError.message);
        if (
          errorMessage.includes("sandbox") ||
          errorMessage.includes("verified")
        ) {
          console.error(
            "⚠️  RESEND SANDBOX MODE DETECTED: Only verified email addresses can receive emails."
          );
          console.error(
            "To fix: Add your domain in Resend dashboard or verify individual email addresses."
          );
        }
      }

      // We don't throw here to avoid failing the booking if only the email fails
      // But we could add a warning to the response
    }
  }

  // Revalidate the booking page to show updated availability
  revalidatePath("/termin-buchen");

  return calendarData;
}
