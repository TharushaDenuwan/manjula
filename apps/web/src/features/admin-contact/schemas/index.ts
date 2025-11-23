import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { contact } from "@repo/database";

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const contacts = createSelectSchema(contact);

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const contactInsertSchema = createInsertSchema(contact).omit({
  id: true,
  updatedAt: true,

  createdAt: true,
});

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const contactUpdateSchema = createInsertSchema(contact)
  .omit({
    id: true,

    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type contactUpdateType = z.infer<typeof contactUpdateSchema>;
export type contact = z.infer<typeof contacts>;
export type contactInsertType = z.infer<typeof contactInsertSchema>;
