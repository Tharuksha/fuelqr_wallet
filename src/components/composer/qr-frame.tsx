"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface QRFrameProps {
  children: ReactNode;
  className?: string;
}

export function QRFrame({ children, className = "" }: QRFrameProps) {
  return (
    <motion.div
      className={`relative mx-auto w-fit ${className}`}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900/90 p-3 ring-1 ring-black/20">
        {children}
      </div>
    </motion.div>
  );
}
