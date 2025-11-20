"use client";
import { useEffect, useState } from "react";

import { Button } from "@repo/ui/components/button";
import { Loader2 } from "lucide-react";
import { getAllProducts, type ProductResponse } from "../actions/get-all-product.action";
import { ProductCard } from "./product-card";

export function ProductList() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllProducts({
        sort: "desc"
      });
      setProducts(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to load products");
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refetchKey]);

  const handleRefresh = () => {
    setRefetchKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading products...</p>
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

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-muted-foreground">No products found.</p>
        <Button onClick={handleRefresh} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleRefresh}
            onUpdate={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
}
