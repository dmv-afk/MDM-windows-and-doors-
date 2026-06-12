"use client";

import { useEffect, useState } from "react";

/**
 * Lite mode = lower-powered / touch devices where animation work should be
 * minimal. Detected once on mount; defaults to lite until known (so weak
 * devices never pay the cost of a heavy first paint).
 */
export function useLiteMode(): boolean | null {
  const [lite, setLite] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    // deviceMemory is Chrome-only; treat absence as "unknown", not "low".
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    setLite(reduced || (coarse && (cores <= 4 || (mem !== undefined && mem <= 4))));
  }, []);

  return lite;
}
