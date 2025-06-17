"use client";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  // useEffect(() => {
    // console.log(session);
  // });

  return (
    <div className="text-white p-4 max-w-4xl mx-auto">
      <DashboardPage />
    </div>
  );
}