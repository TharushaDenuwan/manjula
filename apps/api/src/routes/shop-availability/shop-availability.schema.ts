import { shopClosedDays } from "@repo/database";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const shopClosedDaysSchema = createSelectSchema(shopClosedDays);

export const shopClosedDaysInsertSchema = createSelectSchema(shopClosedDays, {
  startDate: z.string().min(1),
  endDate: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const shopClosedDaysUpdateSchema = shopClosedDaysInsertSchema.partial();
