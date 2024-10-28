import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bora",
  description: "May your connections be stronger",
  icons:{
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?=4"],
    shortcut: ["/apple-touch-icon.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE] text-black")}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}