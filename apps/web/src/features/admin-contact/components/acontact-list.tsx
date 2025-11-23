"use client";
import { useEffect, useId, useState } from "react";

import type { ViewMode } from "@/app/admin/contact/page";
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
import { Loader2, MessageSquare, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { deleteContact } from "../actions/delete-acontact.action";
import { getAllContacts, type ContactResponse } from "../actions/get-all-acontact.action";
import { AContactCard } from "./acontact-card";

type Props = {
  viewMode: ViewMode;
};

export function AContactList({ viewMode }: Props) {
  const [contacts, setContacts] = useState<ContactResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllContacts({
        sort: "desc"
      });
      setContacts(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to load contacts");
      console.error("Failed to fetch contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [refetchKey]);

  const handleRefresh = () => {
    setRefetchKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading contacts...</p>
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

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-muted-foreground">No contacts found.</p>
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <ContactTableRow
                  key={contact.id}
                  contact={contact}
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
        {contacts.map((contact) => (
          <AContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
}

function ContactTableRow({
  contact,
  onDelete,
}: {
  contact: ContactResponse;
  onDelete?: () => void;
}) {
  const toastId = useId();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const MESSAGE_TRUNCATE_LENGTH = 50;
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
    <TableRow>
      <TableCell className="font-medium">{contact.name}</TableCell>
      <TableCell>
        <a
          href={`mailto:${contact.email}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {contact.email}
        </a>
      </TableCell>
      <TableCell>
        <a
          href={`tel:${contact.phone}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {contact.phone}
        </a>
      </TableCell>
      <TableCell className="max-w-md">
        <div className="flex items-center gap-2">
          <p className="truncate">
            {truncatedMessage}
          </p>
          {isMessageLong && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsMessageDialogOpen(true)}
              className="h-auto p-0 text-[#D4AF37] hover:text-[#C19A2F] text-xs font-medium flex-shrink-0"
            >
              View More
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {contact.createdAt
          ? formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })
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
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
