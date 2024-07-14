"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // ใช้ usePathname แทน useRouter
import { initGA, logPageView } from '../utils/analytics';
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToastProvider from "@/providers/toast-provider";
import { cn } from "@/lib/utils";
import { Urbanist } from "next/font/google";

import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"], variable : "--font-urbanist" });

export default function RootClientLayout({ children, userId }: { children: React.ReactNode, userId: string | null }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, [pathname]); 
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background antialiased", urbanist.variable)}>
          <ToastProvider />
          <Header userId={userId} />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
