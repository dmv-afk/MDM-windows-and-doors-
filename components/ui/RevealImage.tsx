"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Image that unveils with a clip + scale settle as it scrolls into view. */
export default function RevealImage({
  src, alt, className, sizes = "(max-width: 768px) 100vw, 50vw", priority = false,
}: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
