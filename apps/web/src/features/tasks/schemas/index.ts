import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { tasks } from "@repo/database";
import { z } from "zod";

// Convert createdAt , updatedAt to String from Date
// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const selectTaskSchema = createSelectSchema(tasks).extend({
  createdAt: z.date().transform((date) => date && date.toISOString()),
  updatedAt: z
    .date()
    .transform((date) => date && date.toISOString())
    .nullable()
});

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const addTaskSchema = createInsertSchema(tasks).omit({
  createdAt: true,
  updatedAt: true
});

export const updateTaskSchema = addTaskSchema.partial();

export type Task = z.infer<typeof selectTaskSchema>;

export type AddTaskSchema = z.infer<typeof addTaskSchema>;

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
