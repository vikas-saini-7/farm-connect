"use client";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardHeader from "@/components/dashboard/common/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/common/AppSidebar";
import { useProfile } from "@/store/useProfile";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const fetchProfile = useProfile((state) => state.fetchProfile);
  const router = useRouter();

  const profile = useProfile((state) => state.profile);
  const isLoading = useProfile((state) => state.isLoading);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    fetchProfile();
    // console.log("NextAuth Session:", session);
    // console.log("Auth Status:", status);
  }, [fetchProfile, session, status]);

  useEffect(() => {
    if (!isLoading && profile && !profile.isOnboarded) {
      router.push("/onboarding");
    }
  }, [profile, isLoading, router]);

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
