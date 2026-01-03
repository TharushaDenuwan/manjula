import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { orders } from "@repo/database";

export const ordersSchema = createSelectSchema(orders);

export const orderInsertSchema = createInsertSchema(orders).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

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
