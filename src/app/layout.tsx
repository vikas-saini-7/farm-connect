// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Footer from "@/components/landing/Footer";
// import MyProviders from "./providers";
// import 'leaflet/dist/leaflet.css';
// import PageLoader from '../components/ui/page_loader';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Farm Connect",
//   description: "Revolutionizing...",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
//       >
//         <MyProviders>
//         {/* Removed SessionProvider from here */}
//         <main className="flex-grow">
//           {children}
//         </main>
//         {/* <Footer /> */}
//         </MyProviders>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MyProviders from "./providers";
import LayoutWrapper from "../components/layout-wrapper";

import "leaflet/dist/leaflet.css";
import "./globals.css";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata export (only allowed in server components)
export const metadata: Metadata = {
  title: "Farm Connect",
  description: "Revolutionizing...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <MyProviders>
          <LayoutWrapper>{children}</LayoutWrapper>
        </MyProviders>
      </body>
    </html>
  );
}
