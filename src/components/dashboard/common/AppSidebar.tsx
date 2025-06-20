"use client";
import {
  BarChart2,
  Home,
  Leaf,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfile } from "@/store/useProfile";

const farmerNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Manage Products",
    url: "/dashboard/products",
    icon: ShoppingBag,
  },
  {
    title: "Find Buyer",
    url: "/dashboard/find-buyer",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "/dashboard/calender",
    icon: Home,
  },
  {
    title: "Weather",
    url: "/dashboard/weather",
    icon: Leaf,
  },
  // {
  //   title: "Wallet",
  //   url: "/dashboard/wallet",
  //   icon: Leaf,
  // },
  {
    title: "Get Contacts",
    url: "/dashboard/contact",
    icon: Leaf,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Community",
    url: "/dashboard/community",
    icon: Users,
  },
];

const buyerNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  // {
  //   title: "Manage Products",
  //   url: "/dashboard/products",
  //   icon: Home,
  // },
  {
    title: "Manage Requests",
    url: "/dashboard/manage-requests",
    icon: Home,
  },
  {
    title: "Find Farmer",
    url: "/dashboard/find-farmer",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "/dashboard/buyer-calender",
    icon: Home,
  },
  // {
  //   title: "Weather",
  //   url: "/dashboard/weather",
  //   icon: Leaf,
  // },
  // {
  //   title: "Wallet",
  //   url: "/dashboard/wallet",
  //   icon: Leaf,
  // },
  {
    title: "Get Contacts",
    url: "/dashboard/contact-buyer",
    icon: Leaf,
  },
  {
    title: "Analytics",
    url: "/dashboard/buyer-analytics",
    icon: BarChart2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const profile = useProfile((state) => state.profile);

  return (
    <Sidebar className="bg-white/10 backdrop-blur-md border-r border-gray-100 dark:border-gray-800 w-64">
      <SidebarContent>
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-alkatra">
            FarmConnect
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {profile?.role === "Seller" ? (
                <>
                  {farmerNav.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`
                        px-6 py-3 flex items-center gap-3 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 font-semibold"
                            : "text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900/20"
                        }
                      `}
                        >
                          <Link href={item.url}>
                            <item.icon
                              className={`w-5 h-5 ${
                                isActive ? "stroke-[2.5px]" : ""
                              }`}
                            />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </>
              ) : (
                <>
                  {buyerNav.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`
                        px-6 py-3 flex items-center gap-3 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 font-semibold"
                            : "text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900/20"
                        }
                      `}
                        >
                          <Link href={item.url}>
                            <item.icon
                              className={`w-5 h-5 ${
                                isActive ? "stroke-[2.5px]" : ""
                              }`}
                            />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800">
          <SidebarMenuButton
            asChild
            className={`
              w-full px-6 py-3 flex items-center gap-3 rounded-lg transition-all duration-200
              ${
                pathname === "/settings"
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 font-semibold"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900/20"
              }
            `}
          >
            <Link href="/dashboard/settings">
              <Settings
                className={`w-5 h-5 ${
                  pathname === "dashboard/settings" ? "stroke-[2.5px]" : ""
                }`}
              />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
