"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface QRFrameProps {
  children: ReactNode;
  className?: string;
}

function CornerAccents() {
  const line =
    "pointer-events-none absolute h-4 w-4 border-[1.5px] border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.35)]";
  return (
    <>
      <span
        className={`${line} left-3 top-3 rounded-tl-md border-l border-t`}
        aria-hidden
      />
      <span
        className={`${line} right-3 top-3 rounded-tr-md border-r border-t`}
        aria-hidden
      />
      <span
        className={`${line} bottom-3 left-3 rounded-bl-md border-b border-l`}
        aria-hidden
      />
      <span
        className={`${line} bottom-3 right-3 rounded-br-md border-b border-r`}
        aria-hidden
      />
    </>
  );
}

export function QRFrame({ children, className = "" }: QRFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative mx-auto w-fit ${className}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-gradient-to-br from-sky-500/25 via-violet-600/20 to-blue-600/15 blur-2xl"
      />
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[1.35rem] opacity-60"
          style={{
            background:
              "linear-gradient(125deg, rgba(56,189,248,0.55), rgba(139,92,246,0.5), rgba(59,130,246,0.45))",
          }}
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="relative rounded-3xl bg-gradient-to-br from-sky-300/80 via-violet-500/85 to-blue-600/80 p-[1.5px] shadow-[0_0_48px_-10px_rgba(99,102,241,0.6),0_0_24px_-12px_rgba(56,189,248,0.35)]">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-zinc-800/98 via-zinc-950 to-black px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-20px_40px_rgba(0,0,0,0.45)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-violet-500/[0.04]"
          />
          <CornerAccents />
          <div className="relative rounded-2xl bg-black/50 p-2.5 ring-1 ring-white/[0.08] backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
