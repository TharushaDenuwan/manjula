"use server";

import { getClient } from "@/lib/rpc/server";

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

export async function getCalendarById(id: string): Promise<CalendarResponse> {
  const client = await getClient();

  const response = await client.api.calendar[":id"].$get({
    param: { id },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch calendar booking");
  }

  const calendarData = (await response.json()) as CalendarResponse;
  return calendarData;
}
