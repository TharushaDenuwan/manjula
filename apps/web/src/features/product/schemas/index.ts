import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { products } from "@repo/database";

export const product = createSelectSchema(products);

export const productInsertSchema = createInsertSchema(products).omit({
  id: true,
  updatedAt: true,
  userId: true,
  createdAt: true,
  organizationId: true,
});

export const productUpdateSchema = createInsertSchema(products)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type productUpdateType = z.infer<typeof productUpdateSchema>;
export type product = z.infer<typeof product>;
export type productInsertType = z.infer<typeof productInsertSchema>;
