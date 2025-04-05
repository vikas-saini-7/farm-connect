"use client"
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardHeader from "@/components/dashboard/common/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/common/AppSidebar";
import { useProfile } from "@/store/useProfile";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const fetchProfile = useProfile((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile();
    console.log("NextAuth Session:", session);
    console.log("Auth Status:", status);
  }, [fetchProfile, session, status]);

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