"use client";
import { formatDistanceToNow } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

import { toast } from "sonner";
import { deleteProduct } from "../actions/delete-product.action";
import { type ProductResponse } from "../actions/get-all-product.action";
import { UpdateProductForm } from "./update-product-form";

type Props = {
  product: ProductResponse;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export function ProductCard({ product, onDelete, onUpdate }: Props) {
  const toastId = useId();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setIsDeleting(true);
      toast.loading("Deleting product...", { id: toastId });

      await deleteProduct(product.id);

      toast.success("Product deleted successfully!", { id: toastId });
      onDelete?.();
    } catch (err) {
      const error = err as Error;
      console.error("Failed to delete product:", error);
      toast.error(`Failed: ${error.message}`, {
        id: toastId
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return null;
    }
  };

  return (
    <>
      <Card key={product.id} className={"p-0 flex flex-col gap-y-3"}>
        <CardHeader className="pt-4 pb-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle>{product.productName}</CardTitle>
              {product.description && (
                <CardDescription className="mt-2 line-clamp-2">
                  {product.description}
                </CardDescription>
              )}
              {product.price && (
                <CardDescription className="mt-1 font-semibold text-primary">
                  Price: {product.price}
                </CardDescription>
              )}
            </div>
          </div>
          <CardDescription className="p-0 mt-2">
            Created {formatDistanceToNow(new Date(product.createdAt))} ago
          </CardDescription>
          {(product.manufactureDate || product.expirationDate) && (
            <CardDescription className="p-0 mt-1">
              {product.manufactureDate &&
                `Manufactured: ${formatDate(product.manufactureDate)}`}
              {product.manufactureDate && product.expirationDate && " • "}
              {product.expirationDate &&
                `Expires: ${formatDate(product.expirationDate)}`}
            </CardDescription>
          )}
        </CardHeader>

        {product.productImageUrl && (
          <div className="px-4">
            <img
              src={product.productImageUrl}
              alt={product.productName}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        <Separator />

        <CardContent className="px-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 h-6">
            <Button
              size="sm"
              icon={<TrashIcon />}
              variant={"ghost"}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </Button>

            <Separator orientation="vertical" />

            <Button
              size="sm"
              icon={<PencilIcon />}
              variant={"ghost"}
              onClick={() => setIsEditOpen(true)}
            >
              Edit Product
            </Button>
          </div>
        </CardContent>
      </Card>

      <UpdateProductForm
        product={product}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={onUpdate}
      />
    </>
  );
}
