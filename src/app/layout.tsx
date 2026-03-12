import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google"; // Fallbacks for Monument Extended & HK Grotesk
import "./globals.css";
import { Nav } from "@/components/nav/Nav";
import { LivingBackground } from "@/components/ui/LivingBackground";

const heroFont = Syne({ 
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-hero",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Cosine Autonomous",
  description: "Governed. Autonomous. Alive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heroFont.variable} ${bodyFont.variable} text-white antialiased bg-transparent`}>
        <LivingBackground />
        <Nav />
        {children}
      </body>
    </html>
  );
}
