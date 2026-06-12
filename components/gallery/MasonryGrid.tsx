"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY } from "@/content/gallery";
import Lightbox from "./Lightbox";
import { PLACEHOLDER } from "@/lib/constants";

/** Masonry gallery (CSS columns) with lazy loading and full-screen lightbox. */
export default function MasonryGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {GALLERY.map((img, i) => (
          <motion.button
            key={img.src}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mb-5 block w-full overflow-hidden hairline text-left"
            aria-label={`Open image: ${img.alt}`}
          >
            <Image
              src={img.src} alt={img.alt}
              width={img.w} height={img.h}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
            />
            <span className="absolute left-4 top-4 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-eyebrow backdrop-blur opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              {img.tag}
            </span>
            <span className="sheen pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-luxe group-hover:translate-x-full" />
          </motion.button>
        ))}

        {/* Placeholder slots for additional photography */}
        {[1, 2].map((n) => (
          <div key={n} className="mb-5 flex aspect-[4/3] items-center justify-center border border-dashed border-line p-8 text-center">
            <p className="text-xs italic text-white/35">Additional project photo — {PLACEHOLDER}</p>
          </div>
        ))}
      </div>

      <Lightbox images={GALLERY} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </>
  );
}
