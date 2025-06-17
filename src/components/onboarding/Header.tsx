"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function OnboardingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" }); // redirects to login after logout
    };
  return (
    <header className="bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm border-b border-emerald-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="text-emerald-700 text-3xl font-extrabold tracking-tight">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-4xl">🌱</span>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FarmConnect
                </span>
            </Link>
            </div>
            <div>
            <button
                onClick={handleLogout}
                className="group relative inline-flex items-center justify-center rounded-lg border border-emerald-300 px-6 py-2 font-medium text-emerald-700 transition hover:shadow-lg hover:border-emerald-400 cursor-pointer"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <span className="relative z-10">Logout</span>
            </button>
            </div>
        </div>
        </header>
    );
}
