"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LandingBackground } from "@/components/landing/landing-background";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  getHowItWorksCopy,
  type HowItWorksLocale,
} from "../_lib/how-it-works-content";

const LOCALE_STORAGE_KEY = "fuel-pass-how-locale";

function readStoredLocale(): HowItWorksLocale | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
  return raw === "si" || raw === "en" ? raw : null;
}

export function HowItWorksView() {
  const [locale, setLocale] = useState<HowItWorksLocale>("en");

  useEffect(() => {
    const stored = readStoredLocale();
    if (!stored) return;
    queueMicrotask(() => {
      setLocale(stored);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const copy = getHowItWorksCopy(locale);

  useEffect(() => {
    document.title = `${copy.pageTitle} · Fuel Pass`;
  }, [copy.pageTitle]);

  return (
    <>
      <LandingBackground />
      <div className="premium-grain" aria-hidden />
      <div className="relative z-10 mx-auto min-h-screen max-w-3xl px-5 pb-24 sm:px-8 lg:max-w-3xl lg:px-10">
        <header className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <Link
            href="/"
            className="flex w-fit items-center gap-3 rounded-lg outline-none ring-offset-2 ring-offset-[#09090b] focus-visible:ring-2 focus-visible:ring-zinc-500"
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
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div
              className="flex rounded-full border border-zinc-800 bg-zinc-950/80 p-1 ring-1 ring-white/[0.03]"
              role="group"
              aria-label={copy.languageSwitchLabel}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  locale === "en"
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {copy.langEn}
              </button>
              <button
                type="button"
                onClick={() => setLocale("si")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  locale === "si"
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {copy.langSi}
              </button>
            </div>
            <Link
              href="/compose"
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
            >
              {copy.ctaCompose}
            </Link>
          </div>
        </header>

        <main lang={locale === "si" ? "si" : "en"}>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Fuel Pass
            </p>
            <h1 className="font-head mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl">
              {copy.pageTitle}
            </h1>
            <p
              className={`mt-4 text-base leading-relaxed text-zinc-500 sm:text-lg ${locale === "si" ? "leading-[1.75]" : ""}`}
            >
              {copy.pageSubtitle}
            </p>
            <p
              className={`mt-3 text-sm text-zinc-600 ${locale === "si" ? "leading-[1.7]" : ""}`}
            >
              {copy.lastUpdated}
            </p>
          </motion.div>

          <div className="mt-14 space-y-14">
            {copy.sections.map((section, index) => (
              <motion.article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-zinc-800/80 pt-12 first:border-t-0 first:pt-0"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.04 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h2 className="font-head text-xl font-semibold text-zinc-100 sm:text-2xl">
                  {section.heading}
                </h2>
                <div
                  className={`mt-4 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-[15px] ${locale === "si" ? "leading-[1.8]" : ""}`}
                >
                  {section.paragraphs.map((p, i) => (
                    <p key={`${section.id}-p-${i}`}>{p}</p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul
                    className={`mt-5 list-disc space-y-2 pl-5 text-sm text-zinc-500 sm:text-[15px] ${locale === "si" ? "leading-[1.75]" : ""}`}
                  >
                    {section.bullets.map((b, i) => (
                      <li key={`${section.id}-b-${i}`}>{b}</li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>

          <motion.section
            className="mt-16 rounded-2xl border border-zinc-800/90 bg-zinc-950/50 p-6 ring-1 ring-white/[0.02] sm:p-8"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-head text-lg font-semibold text-zinc-100">
              {copy.summaryTitle}
            </h2>
            <ul
              className={`mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-500 ${locale === "si" ? "leading-[1.75]" : ""}`}
            >
              {copy.summaryItems.map((item, i) => (
                <li key={`summary-${i}`}>{item}</li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            className="mt-12 text-center"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-head text-xl font-semibold text-zinc-100">
              {copy.ctaTitle}
            </h2>
            <p
              className={`mx-auto mt-3 max-w-md text-sm text-zinc-500 ${locale === "si" ? "leading-[1.75]" : ""}`}
            >
              {copy.ctaBody}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/compose"
                className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-zinc-100 px-8 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white sm:w-auto"
              >
                {copy.ctaCompose}
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 px-8 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
              >
                {copy.ctaHome}
              </Link>
            </div>
          </motion.section>
        </main>

        <SiteFooter tagline={copy.footerTagline} />
      </div>
    </>
  );
}
