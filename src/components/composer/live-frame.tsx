"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LiveFrameProps {
  readonly children: ReactNode;
}

export function LiveFrame({ children }: LiveFrameProps) {
  return (
    <motion.div
      className="relative w-full"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/80 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] ring-1 ring-black/40 backdrop-blur-sm">
        <div className="border-b border-zinc-800/80 px-4 py-3 sm:px-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Preview
          </p>
        </div>
        <div className="px-4 py-6 sm:px-5 sm:py-8">{children}</div>
      </div>
    </motion.div>
  );
}
