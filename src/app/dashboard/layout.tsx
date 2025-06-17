"use client";
import { ReactNode, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/common/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/common/AppSidebar";
import { useProfile } from "@/store/useProfile";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const fetchProfile = useProfile((state) => state.fetchProfile);
  const profile = useProfile((state) => state.profile);
  const isLoading = useProfile((state) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && profile && !profile.isOnboarded) {
      if (!pathname.startsWith("/onboarding")) {
        router.push("/onboarding");
      }
    }
  }, [profile, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
