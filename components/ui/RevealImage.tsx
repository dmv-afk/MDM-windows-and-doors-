"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLiteMode } from "@/hooks/useLiteMode";

/**
 * Image reveal — audit-tuned: clip-path animation replaced with a cheap
 * opacity + scale settle (clip-path forces repaints on iOS). Static on
 * lite devices; never hidden before hydration.
 */
export default function RevealImage({
  src, alt, className, sizes = "(max-width: 768px) 100vw, 50vw", priority = false,
}: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const reduced = useReducedMotion();
  const lite = useLiteMode();
  const animate = lite === false && !reduced;

  if (!animate) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
