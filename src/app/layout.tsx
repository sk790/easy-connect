import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "easy-connect",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <NextTopLoader />
          <div className="px-4 w-full bg-white md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className="px-4 bg-slate-100 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            {children}
          </div>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
