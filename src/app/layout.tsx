import type { Metadata } from "next";
import { Manrope, Lato, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Medical AI — Educational Hub",
  description: "Onafhankelijk kennisplatform voor verantwoorde AI in de zorg.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6655451473844019" crossOrigin="anonymous"></script>
      </head>
      <body className={`${manrope.variable} ${lato.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col stage-bg pt-16`} suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 md:px-8 pb-20 mt-10">
            {children}
          </main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
