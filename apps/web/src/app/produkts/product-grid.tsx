"use client";

import { ProductResponse } from "@/features/product/actions/get-all-product.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Mail, Minus, Plus, ShoppingCart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductGridProps {
  products: ProductResponse[];
}

export function ProductGrid({ products }: ProductGridProps) {
  // State to track selected quantity for each product
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  // Helper function to update selected quantity
  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, quantity), // Minimum 1
    }));
  };

  // Helper function to increment quantity
  const incrementQuantity = (productId: string, maxQuantity: number | null) => {
    const current = selectedQuantities[productId] || 1;
    const max = maxQuantity ?? Infinity;
    updateQuantity(productId, Math.min(current + 1, max));
  };

  // Helper function to decrement quantity
  const decrementQuantity = (productId: string) => {
    const current = selectedQuantities[productId] || 1;
    updateQuantity(productId, Math.max(current - 1, 1));
  };

  // Helper function to generate WhatsApp message with product details and selected quantity
  const getWhatsAppUrl = (product: ProductResponse, selectedQty: number) => {
    const phoneNumber = "94725371105"; // +43 664 88 65 34 30 without +

    // Build the message with product details
    let message = `Hallo! Ich interessiere mich für folgendes Produkt:\n\n`;
    message += `📦 *Produktname:* ${product.productName}\n\n`;

    if (product.description) {
      message += `📝 *Beschreibung:* ${product.description}\n\n`;
    }

    if (product.price) {
      message += `💰 *Preis:* ${product.price}\n\n`;
    }

    message += `🔢 *Gewünschte Anzahl:* ${selectedQty}\n\n`;

    message += `Bitte kontaktieren Sie mich bezüglich dieses Produkts. Vielen Dank!`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // Helper function to handle WhatsApp click with quantity validation
  const handleWhatsAppClick = (product: ProductResponse, e: React.MouseEvent<HTMLAnchorElement>) => {
    const selectedQty = selectedQuantities[product.id] || 1;
    const maxQty = product.quantity ?? Infinity;

    // Ensure selected quantity doesn't exceed stock and is at least 1
    const validQty = Math.max(1, Math.min(selectedQty, maxQty));

    // Update the href with the correct quantity
    e.currentTarget.href = getWhatsAppUrl(product, validQty);
  };

  // Get valid quantity for a product (used in href as fallback)
  const getValidQuantity = (product: ProductResponse): number => {
    const selectedQty = selectedQuantities[product.id] || 1;
    const maxQty = product.quantity ?? Infinity;
    return Math.max(1, Math.min(selectedQty, maxQty));
  };

  if (products.length === 0) {
    return (
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-2xl p-12 border border-[#D4AF37]/20">
            <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Keine Produkte verfügbar
            </h2>
            <p className="text-lg text-gray-600">
              Wir arbeiten daran, Ihnen bald neue Produkte anzubieten.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-3">
            Produktauswahl
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hochwertige ayurvedische Produkte für Ihre Gesundheit und Ihr
            Wohlbefinden
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom-4 p-0"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Product Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-2xl">
                {product.productImageUrl ? (
                  <Image
                    src={product.productImageUrl}
                    alt={product.productName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="p-4 pb-3 pt-4">
                <CardTitle className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                  {product.productName}
                </CardTitle>
                {product.description && (
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="px-4 pb-4 space-y-2">
                {/* Price */}
                {product.price && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#D4AF37]">
                      {product.price}
                    </span>
                    {product.price.includes("€") && (
                      <span className="text-xs text-gray-500">EUR</span>
                    )}
                  </div>
                )}

                {/* Quantity Stock Info */}
                {product.quantity !== null && product.quantity !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Verfügbar:</span>
                    <span className="text-sm font-semibold text-[#0F172A]">
                      {product.quantity}
                    </span>
                  </div>
                )}

                {/* Quantity Selector */}
                {product.quantity !== null && product.quantity !== undefined && product.quantity > 0 && (
                  <div className="pt-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Menge auswählen:
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrementQuantity(product.id)}
                        disabled={(selectedQuantities[product.id] || 1) <= 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Menge verringern"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <Input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={selectedQuantities[product.id] || 1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value >= 1 && value <= product.quantity!) {
                            updateQuantity(product.id, value);
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (isNaN(value) || value < 1) {
                            updateQuantity(product.id, 1);
                          } else if (value > product.quantity!) {
                            updateQuantity(product.id, product.quantity!);
                          }
                        }}
                        className="w-20 text-center"
                      />
                      <button
                        type="button"
                        onClick={() => incrementQuantity(product.id, product.quantity)}
                        disabled={(selectedQuantities[product.id] || 1) >= product.quantity!}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Menge erhöhen"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Maximal {product.quantity} verfügbar
                    </p>
                  </div>
                )}

                {/* Product Details */}
                {(product.manufactureDate || product.expirationDate) && (
                  <div className="space-y-1 pt-2 border-t border-gray-100">
                    {product.manufactureDate && (
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Herstellungsdatum:</span>
                        <span className="font-medium">
                          {new Date(product.manufactureDate).toLocaleDateString(
                            "de-DE"
                          )}
                        </span>
                      </div>
                    )}
                    {product.expirationDate && (
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Haltbarkeit bis:</span>
                        <span className="font-medium">
                          {new Date(product.expirationDate).toLocaleDateString(
                            "de-DE"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                {/* <Button className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-semibold transition-all transform hover:scale-105 group/btn text-sm">
                  Zum Warenkorb
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button> */}

                {/* Contact Buttons */}
                <div className="flex gap-2 pt-2">
                  <a
                    href="mailto:relax@manjula.at"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0F172A] hover:bg-[#1e293b] text-white rounded-lg transition-all transform hover:scale-105 group/email"
                    aria-label="E-Mail"
                  >
                    <Mail className="w-4 h-4 transition-transform group-hover/email:scale-110" />
                    <span className="text-sm font-medium">E-Mail</span>
                  </a>
                  <a
                    href={getWhatsAppUrl(product, getValidQuantity(product))}
                    onClick={(e) => handleWhatsAppClick(product, e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-all transform hover:scale-105 group/whatsapp"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="w-4 h-4 transition-transform group-hover/whatsapp:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                </div>
              </CardContent>

              {/* Decorative bottom accent */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
