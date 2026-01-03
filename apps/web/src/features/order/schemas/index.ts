import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { orders } from "@repo/database";

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const ordersSchema = createSelectSchema(orders);

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const orderInsertSchema = createInsertSchema(orders).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const orderUpdateSchema = createInsertSchema(orders)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type orderUpdateType = z.infer<typeof orderUpdateSchema>;
export type order = z.infer<typeof ordersSchema>;
export type orderInsertType = z.infer<typeof orderInsertSchema>;
