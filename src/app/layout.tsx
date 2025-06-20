import type { Metadata } from "next";
import { Poppins, Alkatra } from "next/font/google";
import MyProviders from "./providers";
import LayoutWrapper from "../components/layout-wrapper";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const alkatra = Alkatra({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-alkatra",
});

export const metadata: Metadata = {
  title: "Farm Connect",
  description: "Revolutionizing...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${alkatra.variable} antialiased min-h-screen flex flex-col`}
      >
        <MyProviders>
          <LayoutWrapper>{children}</LayoutWrapper>
        </MyProviders>
      </body>
    </html>
  );
}