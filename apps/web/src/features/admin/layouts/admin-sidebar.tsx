"use client";

import { IconBuildings } from "@tabler/icons-react";
import Image from "next/image";
import * as React from "react";

import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import Link from "next/link";
import { getUserDetails } from "./get-user-details";

import { AdminSidebarNav } from "./sidebar-nav";

const data = {
  main: [
    {
      name: "Dashboard",
      url: "/admin",
      icon: IconBuildings,
    },
    {
      name: "Posts",
      url: "/admin/post",
      icon: IconBuildings,
    },
    {
      name: "Products",
      url: "/admin/product",
      icon: IconBuildings,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = getUserDetails();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3"
            >
              <Link href="/" className="flex items-center justify-center w-full">
                <Image
                  src="/assets/logo.png"
                  alt="AYURVEDA by Manjula"
                  width={120}
                  height={40}
                  className="h-auto w-full max-w-[120px] object-contain"
                  priority
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarNav items={data.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
