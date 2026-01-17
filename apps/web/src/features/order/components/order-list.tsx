"use client";
import { useEffect, useId, useState } from "react";

import type { ViewMode } from "@/app/admin/orders/page";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { formatDistanceToNow } from "date-fns";
import { FileText, Loader2, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { deleteOrder } from "../actions/delete-order.action";
import {
  getAllOrders,
  type OrderResponse,
} from "../actions/get-all-order.action";
import { OrderCard } from "./order-card";

type Props = {
  viewMode: ViewMode;
};

export function OrderList({ viewMode }: Props) {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllOrders({
        sort: "desc",
      });
      setOrders(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to load orders");
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refetchKey]);

  const handleRefresh = () => {
    setRefetchKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-destructive">{error}</p>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-muted-foreground">No orders found.</p>
        <Button onClick={handleRefresh} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }

  if (viewMode === "table") {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact No</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  onDelete={handleRefresh}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onDelete={handleRefresh} />
        ))}
      </div>
    </div>
  );
}

function OrderTableRow({
  order,
  onDelete,
}: {
  order: OrderResponse;
  onDelete?: () => void;
}) {
  const toastId = useId();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = useState(false);

  const DESCRIPTION_TRUNCATE_LENGTH = 50;
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
    <TableRow>
      <TableCell className="font-medium">{order.productName}</TableCell>
      <TableCell>{order.price || "N/A"}</TableCell>
      <TableCell>{order.quantity !== null ? order.quantity : "N/A"}</TableCell>
      <TableCell className="max-w-md">
        <div className="flex items-center gap-2">
          <p className="truncate">{truncatedDescription || "N/A"}</p>
          {isDescriptionLong && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsDescriptionDialogOpen(true)}
              className="h-auto p-0 text-[#D4AF37] hover:text-[#C19A2F] text-xs font-medium flex-shrink-0"
            >
              View More
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium">{order.name}</TableCell>
      <TableCell>
        <a
          href={`mailto:${order.email}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {order.email}
        </a>
      </TableCell>
      <TableCell>
        <a
          href={`tel:${order.contactNo}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {order.contactNo}
        </a>
      </TableCell>
      <TableCell className="max-w-xs">
        <p className="truncate text-sm">{order.address || "N/A"}</p>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {order.createdAt
          ? formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })
          : "N/A"}
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="sm"
          variant="outline"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-8 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
        >
          <TrashIcon className="w-3.5 h-3.5 mr-1" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </TableCell>

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
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {order.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
