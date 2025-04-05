"use client";
import {
  BarChart2,
  Home,
  Leaf,
  Package,
  Settings,
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

const farmerNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Find Buyer",
    url: "/dashboard/find-buyer",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Home,
  },
  {
    title: "Weather",
    url: "/dashboard/crops",
    icon: Leaf,
  },
  {
    title: "Wallet",
    url: "/dashboard/crops",
    icon: Leaf,
  },


  {
    title: "Get Contacts (adviser/pets-dr)",
    url: "/dashboard/crops",
    icon: Leaf,
  },


  // {
  //   title: "Marketplace",
  //   url: "dashboard/marketplace",
  //   icon: Store,
  // },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Community",
    url: "/dashboard/community",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-white/10 backdrop-blur-md border-r border-gray-100 dark:border-gray-800 w-64">
      <SidebarContent>
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            FarmerApp
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
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
