import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import RootClientLayout from "./RootClientLayout";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "CodeWeb",
  description: "รับทำเว็บไซต์ - Website Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <RootClientLayout userId={userId}>
      {children}
    </RootClientLayout>
  );
}
