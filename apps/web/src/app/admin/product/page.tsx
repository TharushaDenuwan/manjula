"use client";

import { AddNewProduct } from "@/features/product/components/add-new-product";
import { ProductList } from "@/features/product/components/product-list";
import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { Separator } from "@repo/ui/components/separator";
import { useState } from "react";

export default function ProductManagementPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreated = () => {
    // Trigger refresh of the product list
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <AppPageShell
            title="Manage All Products"
            description="Create, edit, and manage your products"
            actionComponent=""
          />
          <div>
            <AddNewProduct onSuccess={handleProductCreated} />
          </div>
        </div>

        <Separator />

        <ProductList key={refreshKey} />
      </div>
    </PageContainer>
  );
}
