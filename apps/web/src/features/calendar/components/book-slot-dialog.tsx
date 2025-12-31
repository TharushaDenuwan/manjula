"use client";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addCalendar } from "../actions/add-calendar.action";

interface BookSlotDialogProps {
  date: string; // YYYY-MM-DD
  slot: {
    start: string;
    end: string;
    id: string;
  };
  onSuccess: () => void;
  children?: React.ReactNode;
}

export function BookSlotDialog({ date, slot, onSuccess, children }: BookSlotDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentSlip, setPaymentSlip] = useState("");
  const [notes, setNotes] = useState("");

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addCalendar({
        bookingDate: date,
        startTime: slot.start,
        endTime: slot.end,
        slotIndex: slot.id,
        customerName,
        customerEmail: customerEmail || null,
        customerPhone: customerPhone || null,
        paymentSlip: paymentSlip,
        notes: notes || null,
        status: "confirmed",
        userId: null // Admin creating for a guest usually, or we could add user selection later
      });

      toast.success("Booking created successfully");
      setOpen(false);
      resetForm();
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to book slot");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setPaymentSlip("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="sm" className="w-full bg-[#D4AF37] hover:bg-[#C19A2F] text-white">
            <Plus className="w-4 h-4 mr-1" /> Book Slot
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Termin buchen</DialogTitle>
          <div className="text-sm text-muted-foreground">
            {date} • {slot.start} - {slot.end}
          </div>
        </DialogHeader>
        <form onSubmit={handleBook} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Ex: John Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+43..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="payment_slip">Zahlungsbeleg URL *</Label>
            <Input
              id="payment_slip"
              value={paymentSlip}
              onChange={(e) => setPaymentSlip(e.target.value)}
              required
              placeholder="https://example.com/slip.jpg"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="bg-[#D4AF37] hover:bg-[#C19A2F] text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Termin buchen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
