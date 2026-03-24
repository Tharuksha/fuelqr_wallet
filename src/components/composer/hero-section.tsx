"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="pb-14 pt-4 text-center sm:pb-16 sm:pt-2">
      <motion.h1
        className="font-head mx-auto max-w-xl text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl sm:leading-tight"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        Create your digital fuel pass
      </motion.h1>
      <motion.p
        className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        Upload a QR, add your details, and preview a polished Wallet-style pass
        before you ship it.
      </motion.p>
    </section>
  );
}
