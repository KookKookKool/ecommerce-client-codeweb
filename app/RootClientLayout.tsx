"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToastProvider from "@/providers/toast-provider";
import { cn } from "@/lib/utils";
import { Urbanist } from "next/font/google";

import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export default function RootClientLayout({ children, userId }: { children: React.ReactNode; userId: string | null }) {
  const pathname = usePathname();

  useEffect(() => {
    // Add gtag.js script to the document head if not already added
    if (!window.gtagScriptAdded) {
      const script = document.createElement('script');
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-QMZTK1BKPE";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) { window.dataLayer?.push(args); }
        window.gtag = gtag;
        window.gtag('js', new Date());
        window.gtag('config', 'G-QMZTK1BKPE');
      };

      window.gtagScriptAdded = true;
    }

    // Track page view with gtag
    if (window.gtag) {
      window.gtag('config', 'G-QMZTK1BKPE', {
        page_path: pathname,
      });
    }
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
