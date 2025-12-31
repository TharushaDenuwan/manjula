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

  // Revalidate the booking page to show updated availability
  revalidatePath("/termin-buchen");

  return calendarData;
}
