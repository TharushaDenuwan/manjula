"use client";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Clock, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

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
        id: toastId,
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
      <Card
        key={product.id}
        className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#D4AF37]/20 dark:border-[#D4AF37]/30 flex flex-col p-0 max-w-xs w-full"
      >
        {/* Image Section - At the Top, No Padding */}
        {product.productImageUrl ? (
          <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 dark:from-[#D4AF37]/20 to-transparent">
            <Image
              src={product.productImageUrl}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-[#D4AF37]/20 dark:from-[#D4AF37]/30 to-[#E6C45A]/10 dark:to-[#E6C45A]/20 flex items-center justify-center">
            <div className="text-4xl opacity-30">📦</div>
          </div>
        )}

        {/* Content Section - Below Image */}
        <CardHeader className="px-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-bold mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                {product.productName}
              </CardTitle>
              {product.description && (
                <CardDescription className="leading-snug line-clamp-2 mt-1 text-sm">
                  {product.description}
                </CardDescription>
              )}
              {product.price && (
                <CardDescription className="text-[#D4AF37] font-semibold mt-1 text-sm">
                  Price: {product.price}
                </CardDescription>
              )}
              {product.quantity !== null && product.quantity !== undefined && (
                <CardDescription className="font-medium mt-1 text-sm">
                  Quantity: {product.quantity}
                </CardDescription>
              )}
            </div>
          </div>

          {/* Date Information */}
          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
              <span className="truncate">
                Created {formatDistanceToNow(new Date(product.createdAt))} ago
              </span>
            </div>
            {(product.manufactureDate || product.expirationDate) && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">
                  {product.manufactureDate &&
                    formatDate(product.manufactureDate)}
                  {product.manufactureDate && product.expirationDate && " → "}
                  {product.expirationDate && formatDate(product.expirationDate)}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Action Buttons - Beautified */}
        <CardContent className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              icon={<PencilIcon className="w-3.5 h-3.5" />}
              onClick={() => setIsEditOpen(true)}
              className="flex-1 h-8 bg-[#D4AF37] hover:bg-yellow-300 dark:hover:bg-[#E6C45A] text-white font-semibold text-xs transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Edit
            </Button>
            <Button
              size="sm"
              icon={<TrashIcon className="w-3.5 h-3.5" />}
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-400 dark:hover:border-red-700 hover:text-red-700 dark:hover:text-red-300 transition-all transform hover:scale-105 font-semibold text-xs"
            >
              Delete
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
