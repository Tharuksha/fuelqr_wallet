"use client";

import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";

export function useDisableMotionGestures(): boolean {
  const hydrated = useHydrated();
  const prefersReduced = useReducedMotion() === true;
  return !hydrated || prefersReduced;
}
