import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "rejected",
]);

export const reviwes = pgTable("review", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  // ⭐ 1–5 rating
  rating: integer("rating").notNull(),

  // Optional image
  reviewImageUrl: varchar("review_image_url", { length: 500 }),

  // name
  name: varchar("name", { length: 255 }).notNull(),

  // Review message
  comment: text("comment"),

  // Helpful counter if you want (optional)
  helpfulCount: integer("helpful_count").default(0),

  // Status for admin moderation
  status: reviewStatusEnum("status").default("pending").notNull(),

  // Auto timestamps
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
