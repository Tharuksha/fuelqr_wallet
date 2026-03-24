"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function SiteHeader() {
  return (
    <motion.header
      className="relative z-10 flex items-center justify-between py-8 sm:py-10"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg outline-none ring-offset-2 ring-offset-[#09090b] transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-zinc-500"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 ring-1 ring-zinc-700/80"
          aria-hidden
        >
          <span className="font-head text-sm font-bold text-zinc-100">F</span>
        </div>
        <div>
          <p className="font-head text-sm font-semibold tracking-tight text-zinc-100">
            Fuel Pass
          </p>
          <p className="text-[11px] text-zinc-500">Wallet preview</p>
        </div>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href="/how-it-works"
          className="rounded-full border border-zinc-800 px-3 py-1 text-[11px] font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
        >
          How it works
        </Link>
        <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-400">
          Private · local only
        </span>
      </div>
    </motion.header>
  );
}
