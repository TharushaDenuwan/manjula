"use client";
import { useCallback, useEffect, useId } from "react";
import { z } from "zod";

import { ImagePicker } from "@/components/image-picker";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { useAppForm } from "@repo/ui/components/tanstack-form";
import { Textarea } from "@repo/ui/components/textarea";

import { toast } from "sonner";
import {
  updatePost,
  type PostResponse,
  type UpdatePostSchema,
} from "../actions/update-post.action";

const updatePostSchema = z.object({
  postTitle: z.string().min(1, "Post title is required").optional(),
  postImageUrl: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
});

interface UpdatePostFormProps {
  post: PostResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdatePostForm({
  post,
  open,
  onOpenChange,
  onSuccess,
}: UpdatePostFormProps) {
  const toastId = useId();

  const form = useAppForm({
    validators: { onChange: updatePostSchema as any },
    defaultValues: {
      postTitle: post.postTitle,
      postImageUrl: post.postImageUrl,
      description: post.description,
      startDate: post.startDate,
      endDate: post.endDate,
    } as UpdatePostSchema,
    onSubmit: async ({ value }) => {
      try {
        toast.loading("Updating post...", { id: toastId });

        await updatePost(post.id, {
          postTitle: value.postTitle,
          postImageUrl: value.postImageUrl ?? null,
          description: value.description ?? null,
          startDate: value.startDate ?? null,
          endDate: value.endDate ?? null,
        });

        toast.success("Post updated successfully!", { id: toastId });
        onSuccess?.();
        onOpenChange(false);
      } catch (error) {
        const err = error as Error;
        console.error("Failed to update post:", error);
        toast.error(`Failed: ${err.message}`, {
          id: toastId,
        });
      }
    },
  });

  // Reset form when post changes or dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        postTitle: post.postTitle,
        postImageUrl: post.postImageUrl,
        description: post.description,
        startDate: post.startDate,
        endDate: post.endDate,
      } as UpdatePostSchema);
    }
  }, [open, post, form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <form.AppForm>
          <form
            className="flex flex-col h-full max-h-[90vh]"
            onSubmit={handleSubmit}
          >
            <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
              <DialogTitle>Update Post</DialogTitle>
              <DialogDescription>
                Update the post details below.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="grid gap-4">
                <form.AppField
                  name="postTitle"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Post Title</field.FormLabel>
                      <field.FormControl>
                        <Input
                          placeholder="Enter post title"
                          value={(field.state.value as string) || ""}
                          onChange={(e) =>
                            field.handleChange(e.target.value as any)
                          }
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />

                <form.AppField
                  name="postImageUrl"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Post Image (Optional)</field.FormLabel>
                      <field.FormControl>
                        <ImagePicker
                          value={(field.state.value as string | null) ?? null}
                          onChange={(url) => field.handleChange(url as any)}
                          disabled={form.state.isSubmitting}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />

                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Description (Optional)</field.FormLabel>
                      <field.FormControl>
                        <Textarea
                          placeholder="Enter post description"
                          value={(field.state.value as string | null) || ""}
                          onChange={(e) =>
                            field.handleChange((e.target.value || null) as any)
                          }
                          onBlur={field.handleBlur}
                          rows={4}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <form.AppField
                    name="startDate"
                    children={(field) => (
                      <field.FormItem>
                        <field.FormLabel>Start Date (Optional)</field.FormLabel>
                        <field.FormControl>
                          <Input
                            type="date"
                            value={
                              field.state.value
                                ? new Date(field.state.value as string)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.handleChange(
                                (e.target.value ? e.target.value : null) as any
                              )
                            }
                            onBlur={field.handleBlur}
                          />
                        </field.FormControl>
                        <field.FormMessage />
                      </field.FormItem>
                    )}
                  />

                  <form.AppField
                    name="endDate"
                    children={(field) => (
                      <field.FormItem>
                        <field.FormLabel>End Date (Optional)</field.FormLabel>
                        <field.FormControl>
                          <Input
                            type="date"
                            value={
                              field.state.value
                                ? new Date(field.state.value as string)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.handleChange(
                                (e.target.value ? e.target.value : null) as any
                              )
                            }
                            onBlur={field.handleBlur}
                          />
                        </field.FormControl>
                        <field.FormMessage />
                      </field.FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="px-6 pb-6 pt-4 flex-shrink-0 border-t bg-white dark:bg-gray-900">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" loading={form.state.isSubmitting}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  );
}
