"use client";

import { ProductResponse } from "@/features/product/actions/get-all-product.action";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ArrowRight, ShoppingCart, Sparkles } from "lucide-react";
import Image from "next/image";

interface ProductGridProps {
  products: ProductResponse[];
}

export function ProductGrid({ products }: ProductGridProps) {
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-3">
            Produktauswahl
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hochwertige ayurvedische Produkte für Ihre Gesundheit und Ihr Wohlbefinden
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

                {/* Product Details */}
                {(product.manufactureDate || product.expirationDate) && (
                  <div className="space-y-1 pt-2 border-t border-gray-100">
                    {product.manufactureDate && (
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Herstellungsdatum:</span>
                        <span className="font-medium">
                          {new Date(product.manufactureDate).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                    )}
                    {product.expirationDate && (
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Haltbarkeit bis:</span>
                        <span className="font-medium">
                          {new Date(product.expirationDate).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#E6C45A] hover:from-[#C19A2F] hover:to-[#D4AF37] text-[#0F172A] font-semibold transition-all transform hover:scale-105 group/btn text-sm"
                >
                  Zum Warenkorb
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>

              {/* Decorative bottom accent */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
