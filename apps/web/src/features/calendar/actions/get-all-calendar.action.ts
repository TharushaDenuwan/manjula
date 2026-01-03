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

export interface GetCalendarQueryParams {
  page?: string | number;
  limit?: string | number;
  sort?: "desc" | "asc";
  search?: string;
}

export interface GetCalendarMeta {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface GetCalendarResponse {
  data: CalendarResponse[];
  meta: GetCalendarMeta;
}

export async function getAllCalendar(
  queryParams?: GetCalendarQueryParams
): Promise<GetCalendarResponse> {
  const client = await getClient();

  const response = await client.api.calendar.$get({
    query: {
      page: queryParams?.page?.toString() || "",
      limit: queryParams?.limit?.toString() || "",
      sort: queryParams?.sort || "desc",
      search: queryParams?.search || "",
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || "Failed to fetch calendar bookings");
  }

  const calendarData = (await response.json()) as GetCalendarResponse;
  return calendarData;
}
