"use client";
import { formatDistanceToNow } from "date-fns";
import { Clock, Mail, MessageSquare, Phone, TrashIcon, User } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@repo/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";

import { toast } from "sonner";
import { deleteContact } from "../actions/delete-acontact.action";
import { type ContactResponse } from "../actions/get-all-acontact.action";

type Props = {
  contact: ContactResponse;
  onDelete?: () => void;
};

export function AContactCard({ contact, onDelete }: Props) {
  const toastId = useId();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const MESSAGE_TRUNCATE_LENGTH = 100;
  const isMessageLong = contact.message && contact.message.length > MESSAGE_TRUNCATE_LENGTH;
  const truncatedMessage = isMessageLong
    ? contact.message.substring(0, MESSAGE_TRUNCATE_LENGTH) + "..."
    : contact.message;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      setIsDeleting(true);
      toast.loading("Deleting contact...", { id: toastId });

      await deleteContact(contact.id);

      toast.success("Contact deleted successfully!", { id: toastId });
      onDelete?.();
    } catch (err) {
      const error = err as Error;
      console.error("Failed to delete contact:", error);
      toast.error(`Failed: ${error.message}`, {
        id: toastId
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      key={contact.id}
      className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#D4AF37]/20 dark:border-[#D4AF37]/30 flex flex-col p-0 max-w-md w-full"
    >
      {/* Header Section */}
      <CardHeader className="px-4 pt-4 pb-2 bg-gradient-to-br from-[#D4AF37]/5 dark:from-[#D4AF37]/10 to-transparent">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold mb-2 group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <User className="w-5 h-5 text-[#D4AF37]" />
              {contact.name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="px-4 pb-3 space-y-3">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <a
              href={`mailto:${contact.email}`}
              className="text-foreground hover:text-[#D4AF37] transition-colors truncate"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <a
              href={`tel:${contact.phone}`}
              className="text-foreground hover:text-[#D4AF37] transition-colors"
            >
              {contact.phone}
            </a>
          </div>
        </div>

        {/* Message */}
        {contact.message && (
          <div className="pt-2 border-t border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <CardDescription className="leading-relaxed text-sm">
                  {truncatedMessage}
                </CardDescription>
                {isMessageLong && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setIsMessageDialogOpen(true)}
                    className="h-auto p-0 mt-1 text-[#D4AF37] hover:text-[#C19A2F] dark:hover:text-[#E6C45A] text-xs font-medium"
                  >
                    View More
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Date Information */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
          <Clock className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">
            {contact.createdAt
              ? `Created ${formatDistanceToNow(new Date(contact.createdAt))} ago`
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

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
              Message from {contact.name}
            </DialogTitle>
            <DialogDescription>
              Full message content
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
