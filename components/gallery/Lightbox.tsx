"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/types";

export default function Lightbox({
  images, index, onClose, onNavigate,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const img = index !== null ? images[index] : null;

  const prev = useCallback(() => index !== null && onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate]);
  const next = useCallback(() => index !== null && onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, prev, next]);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4 md:p-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label={img.alt}
        >
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/60">{img.alt}</p>
          </motion.div>

          <button onClick={onClose} aria-label="Close viewer" className="absolute right-5 top-5 h-11 w-11 text-2xl text-white/80 hover:text-bronze">×</button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image" className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-12 w-12 text-2xl text-white/70 hover:text-bronze">‹</button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image" className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-12 w-12 text-2xl text-white/70 hover:text-bronze">›</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
