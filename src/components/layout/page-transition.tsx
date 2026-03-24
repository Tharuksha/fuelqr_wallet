"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useHydrated } from "@/hooks/use-hydrated";

interface PageTransitionProps {
  readonly children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion() === true;
  // No enter animation until we’re hydrated or if the user asked for less motion (matches server output).
  const instantRouteMotion = !hydrated || prefersReducedMotion;
  const lenis = useLenis();
  const skipScrollResetRef = useRef(true);

  const duration = instantRouteMotion ? 0 : 0.26;
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    if (skipScrollResetRef.current) {
      skipScrollResetRef.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: prefersReducedMotion });
  }, [pathname, lenis, prefersReducedMotion]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex min-h-full flex-1 flex-col"
        initial={instantRouteMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={instantRouteMotion ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
