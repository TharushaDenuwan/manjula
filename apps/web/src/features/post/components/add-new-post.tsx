"use client";
import { PlusCircleIcon } from "lucide-react";
import { useCallback, useId, useState } from "react";
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
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { useAppForm } from "@repo/ui/components/tanstack-form";
import { Textarea } from "@repo/ui/components/textarea";

import { toast } from "sonner";
import { addPost, type AddPostSchema } from "../actions/add-post.action";

const addPostSchema = z.object({
  postTitle: z.string().min(1, "Post title is required"),
  postImageUrl: z.string().nullable(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

interface AddNewPostProps {
  onSuccess?: () => void;
}

export function AddNewPost({ onSuccess }: AddNewPostProps = {}) {
  const [open, setOpen] = useState<boolean>(false);
  const toastId = useId();

  const form = useAppForm({
    validators: { onChange: addPostSchema as any },
    defaultValues: {
      postTitle: "",
      postImageUrl: null,
      description: null,
      startDate: null,
      endDate: null,
    } as AddPostSchema,
    onSubmit: async ({ value }) => {
      try {
        toast.loading("Creating new post...", { id: toastId });

        await addPost({
          postTitle: value.postTitle,
          postImageUrl: value.postImageUrl || null,
          description: value.description || null,
          startDate: value.startDate || null,
          endDate: value.endDate || null,
        });

        toast.success("Post created successfully!", { id: toastId });
        form.reset();
        onSuccess?.();
      } catch (error) {
        const err = error as Error;
        console.error("Failed to add post:", error);
        toast.error(`Failed: ${err.message}`, {
          id: toastId,
        });
      } finally {
        setOpen(false);
      }
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<PlusCircleIcon />}>Add new Post</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <form.AppForm>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create new Post</DialogTitle>
              <DialogDescription>
                Create a new post by filling out the details below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <form.AppField
                name="postTitle"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Post Title</field.FormLabel>
                    <field.FormControl>
                      <Input
                        placeholder="Enter post title"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
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
                        value={field.state.value}
                        onChange={(url) => field.handleChange(url)}
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
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(e.target.value || null)
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
                              ? new Date(field.state.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value ? e.target.value : null
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
                              ? new Date(field.state.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value ? e.target.value : null
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" loading={form.state.isSubmitting}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  );
}
