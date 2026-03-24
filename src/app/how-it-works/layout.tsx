import type { ReactNode } from "react";
import { Noto_Sans_Sinhala } from "next/font/google";

const notoSansSinhala = Noto_Sans_Sinhala({
  weight: ["400", "500", "600", "700"],
  subsets: ["sinhala"],
  variable: "--font-noto-sinhala",
  display: "swap",
});

export default function HowItWorksLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      className={`${notoSansSinhala.variable} min-h-full font-how-bilingual`}
    >
      {children}
    </div>
  );
}
