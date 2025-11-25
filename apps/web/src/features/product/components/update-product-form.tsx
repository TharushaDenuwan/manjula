"use client";
import { useCallback, useEffect, useId } from "react";
import { z } from "zod";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { useAppForm } from "@repo/ui/components/tanstack-form";
import { Textarea } from "@repo/ui/components/textarea";

import { toast } from "sonner";
import {
  updateProduct,
  type ProductResponse,
  type UpdateProductSchema
} from "../actions/update-product.action";

const updateProductSchema = z.object({
  productName: z.string().min(1, "Product name is required").optional(),
  productImageUrl: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  manufactureDate: z.string().nullable().optional(),
  expirationDate: z.string().nullable().optional()
});

interface UpdateProductFormProps {
  product: ProductResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateProductForm({
  product,
  open,
  onOpenChange,
  onSuccess
}: UpdateProductFormProps) {
  const toastId = useId();

  const form = useAppForm({
    validators: { onChange: updateProductSchema as any },
    defaultValues: {
      productName: product.productName,
      productImageUrl: product.productImageUrl,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      manufactureDate: product.manufactureDate,
      expirationDate: product.expirationDate
    } as UpdateProductSchema,
    onSubmit: async ({ value }) => {
      try {
        toast.loading("Updating product...", { id: toastId });

        await updateProduct(product.id, {
          productName: value.productName,
          productImageUrl: value.productImageUrl ?? null,
          description: value.description ?? null,
          price: value.price ?? null,
          quantity: value.quantity ?? null,
          manufactureDate: value.manufactureDate ?? null,
          expirationDate: value.expirationDate ?? null
        });

        toast.success("Product updated successfully!", { id: toastId });
        onSuccess?.();
        onOpenChange(false);
      } catch (error) {
        const err = error as Error;
        console.error("Failed to update product:", error);
        toast.error(`Failed: ${err.message}`, {
          id: toastId
        });
      }
    }
  });

  // Reset form when product changes or dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        productName: product.productName || "",
        productImageUrl: product.productImageUrl,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        manufactureDate: product.manufactureDate,
        expirationDate: product.expirationDate
      });
    }
  }, [open, product, form]);

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form.AppForm>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Update Product</DialogTitle>
              <DialogDescription>
                Update the product details below.
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
                        value={(field.state.value as string) || ""}
                        onChange={(e) => field.handleChange(e.target.value as any)}
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
                    <field.FormLabel>Image URL (Optional)</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={(field.state.value as string | null) || ""}
                        onChange={(e) =>
                          field.handleChange((e.target.value || null) as any)
                        }
                        onBlur={field.handleBlur}
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

              <form.AppField
                name="price"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Price (Optional)</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="text"
                        placeholder="Enter price (e.g., 99.99)"
                        value={(field.state.value as string | null) || ""}
                        onChange={(e) =>
                          field.handleChange((e.target.value || null) as any)
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
                        value={(field.state.value as number | null)?.toString() || ""}
                        onChange={(e) =>
                          field.handleChange(
                            (e.target.value ? parseInt(e.target.value, 10) : null) as any
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
                      <field.FormLabel>Manufacture Date (Optional)</field.FormLabel>
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
                  name="expirationDate"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Expiration Date (Optional)</field.FormLabel>
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
            <DialogFooter>
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
