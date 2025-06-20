"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useProfile } from "@/store/useProfile";

export default function SellerOnlyPage({ children }: { children: ReactNode }) {
  const router = useRouter();
  const profile = useProfile();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && profile.profile) {
      if (profile.profile.role !== "Seller") {
        router.push("/not-authorized");
      }
    }
  }, [router, status]);

  if (status === "loading" || !profile.profile) {
    return (
      <div className="text-center py-10 text-gray-600">Checking access...</div>
    );
  }

  if (profile.profile.role !== "Seller") {
    return null;
  }

  return <>{children}</>;
}
