import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Fuel Pass — Digital passes for Apple Wallet",
  description:
    "Build fuel passes with in-browser QR validation and a live Apple Wallet–style preview. Private by default.",
};

export default function Home() {
  return <LandingPage />;
}
