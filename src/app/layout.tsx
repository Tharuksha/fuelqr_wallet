import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fuel Pass",
    template: "%s · Fuel Pass",
  },
  description:
    "Digital fuel passes for Apple Wallet—with in-browser QR validation and a live preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#09090b] text-zinc-100">
        <LenisProvider>
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
