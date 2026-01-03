import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { reviwes } from "@repo/database";

export const reviwe = createSelectSchema(reviwes);

export const reviweInsertSchema = createInsertSchema(reviwes).omit({
  id: true,
  updatedAt: true,

  createdAt: true,
});

export const reviweUpdateSchema = createInsertSchema(reviwes)
  .omit({
    id: true,

    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type reviweUpdateType = z.infer<typeof reviweUpdateSchema>;
export type reviwe = z.infer<typeof reviwe>;
export type reviweInsertType = z.infer<typeof reviweInsertSchema>;
