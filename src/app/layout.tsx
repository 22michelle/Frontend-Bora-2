import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import logo from "@/app/public/assets/Logo2.png"

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bora",
  description: "May your connections be stronger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <link rel="icon" href="/src\app\public\assets\Logo2.png" type="image/png" sizes="32x32" />
      <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE] text-black")}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}