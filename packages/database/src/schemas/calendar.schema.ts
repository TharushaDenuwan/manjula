import { sql } from "drizzle-orm";
import { date, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

/**
 * Slots:
 * 1: 08:00 - 09:10
 * 2: 10:00 - 11:30
 * 3: 13:00 - 14:30
 * 4: 15:00 - 16:30
 * 5: 17:00 - 18:30
 *
 * Closed: Saturday, Sunday
 */

export const calendar = pgTable("calendar", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),

  // Customer details (for those not registered, or for admin bookings)
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 255 }),
  paymentSlip: varchar("payment_slip", { length: 255 }).notNull(),

  // Booking details
  bookingDate: date("booking_date").notNull(),
  startTime: varchar("start_time", { length: 5 }).notNull(), // e.g., "08:00"
  endTime: varchar("end_time", { length: 5 }).notNull(),   // e.g., "09:10"

  // Optional: numeric slot identifier (1-5) to simplify queries
  slotIndex: varchar("slot_index", { length: 10 }),

  status: varchar("status", { length: 50 }).default("confirmed").notNull(), // confirmed, cancelled, completed
  notes: text("notes"),

  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
