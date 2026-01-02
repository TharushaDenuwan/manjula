import { sql } from "drizzle-orm";
import { date, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const shopClosedDays = pgTable("shop_closed_days", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: varchar("reason", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
