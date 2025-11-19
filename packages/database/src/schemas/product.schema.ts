import { sql } from "drizzle-orm";
import { date, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { organization, user } from "./auth.schema";

export const products = pgTable("product", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: text("organization_id").references(() => organization.id),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  productImageUrl: varchar("product_image_url", { length: 500 }),
  productName: varchar("product_name", { length: 255 }).notNull(),
  description: text("description"),
  price: varchar("price", { length: 100 }),
  manufactureDate: date("manufacture_date"),
  expirationDate: date("expiration_date"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
