import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { posts } from "@repo/database";

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const post = createSelectSchema(posts);

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const postInsertSchema = createInsertSchema(posts).omit({
  id: true,
  updatedAt: true,
  userId: true,
  createdAt: true,
  organizationId: true,
});

// @ts-expect-error - Type compatibility issue due to drizzle-orm version mismatch
export const postUpdateSchema = createInsertSchema(posts)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type Post = z.infer<typeof post>;
export type AddPostSchema = z.infer<typeof postInsertSchema>;
export type UpdatePostSchema = z.infer<typeof postUpdateSchema>;
