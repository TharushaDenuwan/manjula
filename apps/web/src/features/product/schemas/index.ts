import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { products } from "@repo/database";

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const product = createSelectSchema(products);

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const productInsertSchema = createInsertSchema(products).omit({
  id: true,
  updatedAt: true,
  userId: true,
  createdAt: true,
  organizationId: true,
});

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
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
