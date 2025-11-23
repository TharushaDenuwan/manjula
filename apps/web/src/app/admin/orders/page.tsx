"use client";

import { OrderList } from "@/features/order/components/order-list";
import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import { LayoutGrid, Table } from "lucide-react";
import { useState } from "react";

export type ViewMode = "cards" | "table";

export default function OrderManagementPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between gap-4">
          <AppPageShell
            title="Manage All Orders"
            description="View and manage orders from your website"
            actionComponent=""
          />
          <div className="flex-shrink-0">
            <Select value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cards">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    <span>Cards</span>
                  </div>
                </SelectItem>
                <SelectItem value="table">
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4" />
                    <span>Table</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <OrderList viewMode={viewMode} />
      </div>
    </PageContainer>
  );
}
