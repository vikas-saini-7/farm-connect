import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/common/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/common/AppSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
