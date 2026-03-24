"use client";

import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * When true, skip hover and tap motion so server HTML, hydration, and the live site
 * stay in sync. Framer’s reduced-motion hook is unset on the server but real on the
 * client, which would otherwise change focusable attributes between renders.
 */
export function useDisableMotionGestures(): boolean {
  const hydrated = useHydrated();
  const prefersReduced = useReducedMotion() === true;
  return !hydrated || prefersReduced;
}
