"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLiteMode } from "@/hooks/useLiteMode";

/**
 * Scroll-into-view reveal — audit-tuned:
 *  · Content is NEVER hidden by default (no flicker / no invisible text if
 *    JS is slow): animation only opts-in once the device is known capable.
 *  · Lite devices render statically.
 *  · Movement reduced; opacity+transform only.
 */
export default function Reveal({
  children, delay = 0, className, y = 18,
}: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduced = useReducedMotion();
  const lite = useLiteMode();
  const animate = lite === false && !reduced;

  if (!animate) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
