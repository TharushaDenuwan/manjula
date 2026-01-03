"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Loader2, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteReview } from "../actions/delete-review.action";
import {
  getAllReviews,
  type ReviewResponse,
} from "../actions/get-all-review.action";
import { updateReview } from "../actions/update-review.action";

export function ReviewList() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getAllReviews({ limit: 100, sort: "desc" });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: "pending" | "approved" | "rejected"
  ) => {
    try {
      setUpdatingId(id);
      await updateReview(id, { status: newStatus });
      // Update local state
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, status: newStatus } : review
        )
      );
    } catch (error) {
      console.error("Error updating review status:", error);
      alert("Failed to update review status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteReview(id);
      // Remove from local state
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const truncateText = (text: string | null, maxLength: number = 100) => {
    if (!text) return null;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const openDialog = (review: ReviewResponse) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No reviews found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => {
              const isLongComment =
                review.comment && review.comment.length > 100;

              return (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.name}</TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="max-w-xs">
                    {review.comment ? (
                      <div className="space-y-1">
                        <p className="text-sm break-words overflow-hidden">
                          {truncateText(review.comment)}
                        </p>
                        {isLongComment && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => openDialog(review)}
                            className="h-auto p-0 text-blue-600 hover:text-blue-800"
                          >
                            Read more
                          </Button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">No comment</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(review.status)}
                      <Select
                        value={review.status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            review.id,
                            value as "pending" | "approved" | "rejected"
                          )
                        }
                        disabled={updatingId === review.id}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString("de-DE")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === review.id}
                        >
                          {deletingId === review.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Review</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this review from{" "}
                            <strong>{review.name}</strong>? This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(review.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Dialog for full comment */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedReview?.name}&apos;s Review</DialogTitle>
            <DialogDescription>
              <div className="flex gap-1 mt-2">
                {selectedReview && renderStars(selectedReview.rating)}
              </div>
              {selectedReview?.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(selectedReview.createdAt).toLocaleDateString(
                    "de-DE",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {selectedReview?.comment}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
