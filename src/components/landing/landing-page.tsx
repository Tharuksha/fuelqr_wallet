"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { LandingBackground } from "@/components/landing/landing-background";

const features = [
  {
    title: "QR, verified locally",
    body: "We decode every upload in your browser. No QR, no pass—nothing leaves your device.",
  },
  {
    title: "Live preview",
    body: "Title, vehicle, and name update the Wallet-style card instantly as you type.",
  },
  {
    title: "Wallet-ready flow",
    body: "When you connect issuance, the same layout maps cleanly to a signed .pkpass.",
  },
];

export function LandingPage() {
  return (
    <>
      <LandingBackground />
      <div className="premium-grain" aria-hidden />
      <div className="relative z-10 mx-auto min-h-screen max-w-5xl px-5 pb-24 sm:px-8 lg:max-w-6xl lg:px-10">
        <header className="flex items-center justify-between py-8 sm:py-10">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg outline-none ring-offset-2 ring-offset-[#09090b] focus-visible:ring-2 focus-visible:ring-zinc-500"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 ring-1 ring-zinc-700/80"
              aria-hidden
            >
              <span className="font-head text-sm font-bold text-zinc-100">F</span>
            </div>
            <span className="font-head text-sm font-semibold text-zinc-100">
              Fuel Pass
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/how-it-works"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 sm:px-4"
            >
              How it works
            </Link>
            <Link
              href="/compose"
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
            >
              Create pass
            </Link>
          </nav>
        </header>

        <main>
          <motion.section
            className="pt-6 text-center sm:pt-10"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Apple Wallet · Fuel & fleet
            </p>
            <h1 className="font-head mx-auto mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-5xl sm:leading-[1.06] lg:text-6xl">
              Digital fuel passes,{" "}
              <span className="mt-1 block text-zinc-400">
                built in minutes.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-500 sm:text-lg">
              Validate a QR, personalize your pass, and preview exactly how it
              will feel in Wallet—before you wire up issuance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/compose"
                className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-zinc-100 px-8 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white sm:w-auto"
              >
                Start building
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 px-8 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
              >
                How it works
              </Link>
            </div>
          </motion.section>

          <motion.section
            id="how-it-works"
            className="mt-24 scroll-mt-28 sm:mt-32"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="text-center font-head text-xl font-semibold text-zinc-100 sm:text-2xl">
              Why teams use Fuel Pass
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-zinc-500">
              A focused flow from QR to preview—no noise, no server round-trip
              for validation.
            </p>
            <p className="mt-4 text-center">
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-200"
              >
                Full guide — English & සිංහල
              </Link>
            </p>
            <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {features.map((f, i) => (
                <li
                  key={f.title}
                  className="rounded-2xl border border-zinc-800/90 bg-zinc-950/50 p-6 ring-1 ring-white/[0.02] backdrop-blur-sm"
                >
                  <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-head mt-3 text-base font-semibold text-zinc-100">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            className="mt-24 rounded-3xl border border-zinc-800/90 bg-zinc-950/60 px-8 py-12 text-center ring-1 ring-white/[0.03] sm:mt-28 sm:py-14"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="font-head text-xl font-semibold text-zinc-100 sm:text-2xl">
              Ready to compose?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500">
              Open the studio—your QR and fields stay on this device until you
              choose to integrate a backend.
            </p>
            <Link
              href="/compose"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-zinc-100 px-10 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
            >
              Open composer
            </Link>
          </motion.section>
        </main>

        <SiteFooter tagline="Local-first QR preview — your data stays on this device until you connect a backend." />
      </div>
    </>
  );
}
