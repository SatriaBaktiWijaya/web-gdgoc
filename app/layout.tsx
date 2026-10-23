import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import TopProgressBar from "@/components/TopProgressBar";
import HeavyScroll from "@/components/HeavyScroll";

export const metadata: Metadata = {
  title: "GDG On Campus Telkom University Purwokerto",
  description: "Google Developer Groups On Campus - Your Next Chapter in Tech Starts Here",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-surface relative overflow-x-hidden" suppressHydrationWarning>
        <TopProgressBar />
        <Navbar />
        <HeavyScroll>
          {children}
          <FooterSection />
        </HeavyScroll>
      </body>
    </html>
  );
}
