"use client";

import { useSyncExternalStore } from "react";

/**
 * False on the server and during the first client render, then true after the page
 * has hydrated. Use this so the server and first paint match, then turn on client-only UI.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
