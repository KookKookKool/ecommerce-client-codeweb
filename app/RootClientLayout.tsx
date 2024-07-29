"use client";

import { usePathname } from 'next/navigation';
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToastProvider from "@/providers/toast-provider";
import { cn } from "@/lib/utils";
import { Urbanist } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export default function RootClientLayout({ children, userId }: { children: React.ReactNode; userId: string | null }) {
  const pathname = usePathname();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background antialiased", urbanist.variable)}>
          <ToastProvider />
          <Header userId={userId} />
          {children}
          <Footer />
        </body>
        <GoogleAnalytics gaId="G-QMZTK1BKPE"/>
      </html>
    </ClerkProvider>
  );
}
