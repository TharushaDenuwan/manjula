import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const orders = pgTable("order", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  productName: varchar("product_name", { length: 255 }).notNull(),
  description: text("description"),
  price: varchar("price", { length: 100 }),
  quantity: integer("quantity"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  address: text("address").notNull(),
  contactNo: varchar("contact_no", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
