"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function MyProviders({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}