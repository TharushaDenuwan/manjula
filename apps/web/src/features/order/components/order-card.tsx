"use client";
import { formatDistanceToNow } from "date-fns";
import {
  Clock,
  DollarSign,
  FileText,
  Hash,
  Mail,
  Package,
  Phone,
  TrashIcon,
  User,
} from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";

import { toast } from "sonner";
import { deleteOrder } from "../actions/delete-order.action";
import { type OrderResponse } from "../actions/get-all-order.action";

type Props = {
  order: OrderResponse;
  onDelete?: () => void;
};

export function OrderCard({ order, onDelete }: Props) {
  const toastId = useId();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = useState(false);

  const DESCRIPTION_TRUNCATE_LENGTH = 100;
  const isDescriptionLong =
    order.description && order.description.length > DESCRIPTION_TRUNCATE_LENGTH;
  const truncatedDescription = isDescriptionLong
    ? order.description.substring(0, DESCRIPTION_TRUNCATE_LENGTH) + "..."
    : order.description;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      setIsDeleting(true);
      toast.loading("Deleting order...", { id: toastId });

      await deleteOrder(order.id);

      toast.success("Order deleted successfully!", { id: toastId });
      onDelete?.();
    } catch (err) {
      const error = err as Error;
      console.error("Failed to delete order:", error);
      toast.error(`Failed: ${error.message}`, {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      key={order.id}
      className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#D4AF37]/20 dark:border-[#D4AF37]/30 flex flex-col p-0 max-w-md w-full"
    >
      {/* Header Section */}
      <CardHeader className="px-4 pt-4 pb-2 bg-gradient-to-br from-[#D4AF37]/5 dark:from-[#D4AF37]/10 to-transparent">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold mb-2 group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Package className="w-5 h-5 text-[#D4AF37]" />
              {order.productName}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="px-4 pb-3 space-y-3">
        {/* Product Information */}
        <div className="space-y-2">
          {order.price && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span className="font-semibold">{order.price}</span>
            </div>
          )}
          {order.quantity !== null && (
            <div className="flex items-center gap-2 text-sm">
              <Hash className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Quantity: {order.quantity}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {order.description && (
          <div className="pt-2 border-t border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <CardDescription className="leading-relaxed text-sm">
                  {truncatedDescription}
                </CardDescription>
                {isDescriptionLong && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setIsDescriptionDialogOpen(true)}
                    className="h-auto p-0 mt-1 text-[#D4AF37] hover:text-[#C19A2F] dark:hover:text-[#E6C45A] text-xs font-medium"
                  >
                    View More
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Customer Information */}
        <div className="pt-2 border-t border-[#D4AF37]/20 dark:border-[#D4AF37]/30 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span className="font-medium">{order.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <a
              href={`mailto:${order.email}`}
              className="text-foreground hover:text-[#D4AF37] transition-colors truncate"
            >
              {order.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <a
              href={`tel:${order.contactNo}`}
              className="text-foreground hover:text-[#D4AF37] transition-colors"
            >
              {order.contactNo}
            </a>
          </div>
          {order.address && (
            <div className="flex items-start gap-2 text-sm">
              <svg
                className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-foreground break-words">
                {order.address}
              </span>
            </div>
          )}
        </div>

        {/* Date Information */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
          <Clock className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">
            {order.createdAt
              ? `Created ${formatDistanceToNow(new Date(order.createdAt))} ago`
              : "No date available"}
          </span>
        </div>

        {/* Delete Button */}
        <div className="pt-2">
          <Button
            size="sm"
            icon={<TrashIcon className="w-3.5 h-3.5" />}
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full h-8 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-400 dark:hover:border-red-700 hover:text-red-700 dark:hover:text-red-300 transition-all transform hover:scale-105 font-semibold text-xs"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>

      {/* Description Dialog */}
      <Dialog
        open={isDescriptionDialogOpen}
        onOpenChange={setIsDescriptionDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              Description for {order.productName}
            </DialogTitle>
            <DialogDescription>Full product description</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {order.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
