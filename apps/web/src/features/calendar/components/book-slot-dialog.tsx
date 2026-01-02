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
import { AlertCircle, Loader2, Plus } from "lucide-react";
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

export function BookSlotDialog({
  date,
  slot,
  onSuccess,
  children,
}: BookSlotDialogProps) {
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
        userId: null, // Admin creating for a guest usually, or we could add user selection later
      });

      toast.success("Booking created successfully");
      setOpen(false);
      resetForm();
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to book slot"
      );
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
          <Button
            size="sm"
            className="w-full bg-[#D4AF37] hover:bg-[#C19A2F] text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> Book Slot
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Termin buchen</DialogTitle>
          <div className="text-sm text-muted-foreground">
            {date} • {slot.start} - {slot.end}
          </div>
        </DialogHeader>

        {/* Payment Information Section */}
        <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Anzahlung erforderlich
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Um Ihren Termin zu bestätigen, ist eine Anzahlung von{" "}
                <span className="font-bold text-[#D4AF37]">€53,00</span>{" "}
                erforderlich (35% von €150,00).
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-md p-3 space-y-2 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
              Bankverbindung:
            </h4>
            <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Bank:</span>
                <span className="font-medium">Sparkasse</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Kontoinhaber:
                </span>
                <span className="font-medium">Hakkini Manjula De Silva</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">IBAN:</span>
                <span className="font-mono font-medium">
                  AT38 2081 5000 4364 6348
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">BIC:</span>
                <span className="font-mono font-medium">STSPAT2GXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Betrag:
                </span>
                <span className="font-bold text-[#D4AF37]">€53,00</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            Bitte laden Sie nach der Zahlung Ihren Zahlungsbeleg hoch.
          </p>
        </div>

        <form onSubmit={handleBook} className="grid gap-4">
          {/* Payment Slip Upload - Moved up for emphasis */}
          <div className="grid gap-2">
            <Label htmlFor="payment_slip" className="flex items-center gap-1">
              Zahlungsbeleg URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="payment_slip"
              value={paymentSlip}
              onChange={(e) => setPaymentSlip(e.target.value)}
              required
              placeholder="https://example.com/slip.jpg"
              className="border-[#D4AF37]/30 focus:border-[#D4AF37]"
            />
            <p className="text-xs text-muted-foreground">
              Laden Sie Ihren Zahlungsbeleg hoch (z.B. auf Google Drive,
              Dropbox) und fügen Sie den Link hier ein.
            </p>
          </div>

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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="john@example.com"
            />
            <p className="text-xs text-muted-foreground">
              Für Buchungsbestätigung per E-Mail
            </p>
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
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#D4AF37] hover:bg-[#C19A2F] text-white w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Termin buchen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
