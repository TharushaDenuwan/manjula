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
import {
  addProduct,
  type AddProductSchema,
} from "../actions/add-product.action";

const addProductSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productImageUrl: z.string().nullable(),
  description: z.string().nullable(),
  price: z.string().nullable(),
  quantity: z.number().nullable().optional(),
  manufactureDate: z.string().nullable(),
  expirationDate: z.string().nullable(),
});

interface AddNewProductProps {
  onSuccess?: () => void;
}

export function AddNewProduct({ onSuccess }: AddNewProductProps = {}) {
  const [open, setOpen] = useState<boolean>(false);
  const toastId = useId();

  const form = useAppForm({
    validators: { onChange: addProductSchema as any },
    defaultValues: {
      productName: "",
      productImageUrl: null,
      description: null,
      price: null,
      quantity: null,
      manufactureDate: null,
      expirationDate: null,
    } as AddProductSchema,
    onSubmit: async ({ value }) => {
      try {
        toast.loading("Creating new product...", { id: toastId });

        await addProduct({
          productName: value.productName,
          productImageUrl: value.productImageUrl || null,
          description: value.description || null,
          price: value.price || null,
          quantity: value.quantity || null,
          manufactureDate: value.manufactureDate || null,
          expirationDate: value.expirationDate || null,
        });

        toast.success("Product created successfully!", { id: toastId });
        form.reset();
        onSuccess?.();
      } catch (error) {
        const err = error as Error;
        console.error("Failed to add product:", error);
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
        <Button icon={<PlusCircleIcon />}>Add new Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form.AppForm>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create new Product</DialogTitle>
              <DialogDescription>
                Create a new product by filling out the details below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <form.AppField
                name="productName"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Product Name</field.FormLabel>
                    <field.FormControl>
                      <Input
                        placeholder="Enter product name"
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
                name="productImageUrl"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Product Image (Optional)</field.FormLabel>
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
                        placeholder="Enter product description"
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

              <form.AppField
                name="price"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Price (Optional)</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="text"
                        placeholder="Enter price (e.g., 99.99)"
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(e.target.value || null)
                        }
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />

              <form.AppField
                name="quantity"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Quantity (Optional)</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity (e.g., 100)"
                        value={field.state.value?.toString() || ""}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value ? parseInt(e.target.value, 10) : null
                          )
                        }
                        onBlur={field.handleBlur}
                        min="0"
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <form.AppField
                  name="manufactureDate"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>
                        Manufacture Date (Optional)
                      </field.FormLabel>
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
                  name="expirationDate"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>
                        Expiration Date (Optional)
                      </field.FormLabel>
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
