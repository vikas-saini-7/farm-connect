import { ReactNode } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/common/Sidebar";
import DashboardHeader from "@/components/dashboard/common/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      {/* Sidebar */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
