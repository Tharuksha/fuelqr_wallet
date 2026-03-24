"use client";

import { GeneratorCard } from "@/components/composer/generator-card";
import { HeroSection } from "@/components/composer/hero-section";
import { ParticleBackground } from "@/components/composer/particle-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function FuelPassGenerator() {
  return (
    <>
      <ParticleBackground />
      <div className="premium-grain" aria-hidden />
      <div className="relative z-10 mx-auto min-h-screen max-w-5xl px-5 pb-20 sm:px-8 lg:max-w-6xl lg:px-10">
        <SiteHeader />
        <main>
          <HeroSection />
          <GeneratorCard />
        </main>
        <SiteFooter
          marginTopClass="mt-24"
          tagline="QR validated in your browser. Nothing is uploaded."
        />
      </div>
    </>
  );
}
