import { AdminCalendar } from "@/features/calendar/components/admin-calendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar Management | Admin Dashboard",
  description: "Manage appointments and schedule.",
};

export default function AdminCalendarPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Calendar & Appointments</h1>
        <p className="text-muted-foreground">
          View and manage weekly appointments and blocking.
        </p>
      </div>

      <div className="mt-4">
        <AdminCalendar />
      </div>
    </div>
  );
}
