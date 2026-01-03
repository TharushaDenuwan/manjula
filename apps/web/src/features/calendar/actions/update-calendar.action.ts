"use server";

import { getClient } from "@/lib/rpc/server";
import { revalidatePath } from "next/cache";

export interface UpdateCalendarSchema {
  userId?: string | null;
  customerName?: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  paymentSlip?: string;
  bookingDate?: string;
  startTime?: string;
  endTime?: string;
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

export async function updateCalendar(
  id: string,
  data: UpdateCalendarSchema
): Promise<CalendarResponse> {
  const client = await getClient();

  const response = await client.api.calendar[":id"].$patch({
    param: { id },
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
      status: data.status,
      notes: data.notes,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to update calendar booking");
  }

  const calendarData = (await response.json()) as CalendarResponse;

  // Revalidate the page to show the updated booking
  revalidatePath("/termin-buchen");
  revalidatePath("/");
  return calendarData;
}
