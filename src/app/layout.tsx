import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LawLink | AI-first legal talent network",
  description:
    "Discover vetted legal experts and collaborate through the LawLink AI co-counsel marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface text-foreground`}
      >
        <Navbar />
        <main className="min-h-[calc(100vh-320px)] px-4 sm:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
