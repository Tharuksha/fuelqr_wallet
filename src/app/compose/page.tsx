import type { Metadata } from "next";
import { FuelPassGenerator } from "@/components/composer/fuel-pass-generator";

export const metadata: Metadata = {
  title: "Compose",
  description:
    "Upload a QR, edit pass details, and preview your fuel pass before adding to Apple Wallet.",
};

export default function ComposePage() {
  return <FuelPassGenerator />;
}
