import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { calendar } from "@repo/database";

export const calendars = createSelectSchema(calendar);

export const calendarInsertSchema = createInsertSchema(calendar).omit({
  id: true,
  updatedAt: true,

  createdAt: true,
});

export const calendarUpdateSchema = createInsertSchema(calendar)
  .omit({
    id: true,

    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type calendarUpdateType = z.infer<typeof calendarUpdateSchema>;
export type calendar = z.infer<typeof calendars>;
export type calendarInsertType = z.infer<typeof calendarInsertSchema>;
