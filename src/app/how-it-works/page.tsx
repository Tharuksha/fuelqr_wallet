import type { Metadata } from "next";
import { HowItWorksView } from "./_components/how-it-works-view";
import { HOW_IT_WORKS_COPY } from "./_lib/how-it-works-content";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Bilingual guide (English & සිංහල): in-browser QR checks, live Wallet-style preview, privacy, and what a real .pkpass needs.",
  openGraph: {
    title: "How Fuel Pass works · Fuel Pass",
    description: HOW_IT_WORKS_COPY.en.metaDescription,
  },
};

export default function HowItWorksPage() {
  return <HowItWorksView />;
}
