"use client";

import { ProductResponse } from "@/features/product/actions/get-all-product.action";
import { addOrder } from "@/features/order/actions/add-order.action";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { useId, useState } from "react";
import { toast } from "sonner";

interface ProductInquiryFormProps {
  product: ProductResponse;
  quantity: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductInquiryForm({
  product,
  quantity,
  open,
  onOpenChange,
}: ProductInquiryFormProps) {
  const toastId = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.telephone) {
      toast.error("Bitte füllen Sie alle Felder aus", { id: toastId });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Bitte geben Sie eine gültige E-Mail-Adresse ein", {
        id: toastId,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      toast.loading("Anfrage wird gesendet...", { id: toastId });

      const response = await fetch("/api/product-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          telephone: formData.telephone,
          productName: product.productName,
          productDescription: product.description,
          price: product.price,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Senden der Anfrage");
      }

      // Save order to database
      await addOrder({
        productName: product.productName,
        description: product.description || null,
        price: product.price || null,
        quantity: quantity,
        name: formData.name,
        email: formData.email,
        contactNo: formData.telephone,
      });

      toast.success("Anfrage erfolgreich gesendet!", { id: toastId });
      setFormData({ name: "", email: "", telephone: "" });
      onOpenChange(false);
    } catch (error) {
      const err = error as Error;
      console.error("Failed to send product inquiry:", error);
      toast.error(`Fehler: ${err.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Produktanfrage</DialogTitle>
            <DialogDescription>
              Bitte füllen Sie das Formular aus, um eine Anfrage zu senden.
            </DialogDescription>
          </DialogHeader>

          {/* Product Information Display (Static) */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 dark:from-[#D4AF37]/20 to-[#E6C45A]/5 dark:to-[#E6C45A]/10 border border-[#D4AF37]/20 dark:border-[#D4AF37]/30 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-3">
              Produktinformationen
            </h3>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[120px]">
                  Produktname:
                </span>
                <span className="text-sm text-[#0F172A] dark:text-white font-medium">
                  {product.productName}
                </span>
              </div>

              {product.description && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[120px]">
                    Beschreibung:
                  </span>
                  <span className="text-sm text-[#0F172A] dark:text-white flex-1">
                    {product.description}
                  </span>
                </div>
              )}

              {product.price && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[120px]">
                    Preis:
                  </span>
                  <span className="text-sm text-[#D4AF37] font-semibold">
                    {product.price}
                  </span>
                </div>
              )}

              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[120px]">
                  Gewünschte Anzahl:
                </span>
                <span className="text-sm text-[#0F172A] dark:text-white font-semibold">
                  {quantity}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Customer Information Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#0F172A] dark:text-white">
              Ihre Kontaktdaten
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ihr vollständiger Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  required
                  className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  E-Mail-Adresse <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre.email@beispiel.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  required
                  className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Telefon <span className="text-red-500">*</span>
                </label>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="+43 123 456 7890"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange(e, "telephone")}
                  required
                  className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Abbrechen
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
              Anfrage senden
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
