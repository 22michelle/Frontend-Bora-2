import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bora",
  description: "May your connections be stronger",
  icons: {
    icon: "./Logo2.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <head>
        <link rel="shortcut icon" href="./logo2.png" type="image/x-icon" />
      </head>
      <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE] text-black")}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}