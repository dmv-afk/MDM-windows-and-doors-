"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { useLiteMode } from "@/hooks/useLiteMode";

/** Conversion band — parallax on capable desktops only (audit fix). */
export default function CTABand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const lite = useLiteMode();
  const parallax = lite === false && !reduced;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-10%", "10%"] : ["0%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-44">
      <motion.div style={{ y }} className={parallax ? "absolute inset-[-12%] will-change-transform" : "absolute inset-0"}>
        <Image
          src="/images/projects/corner-glazing-stone-extension.jpg"
          alt="" aria-hidden fill sizes="100vw" className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/82" />
      <div className="relative mx-auto max-w-wrap px-5 md:px-8 text-center">
        <p className="eyebrow">Free, no-obligation</p>
        <h2 className="display mx-auto mt-4 max-w-3xl text-3xl md:text-6xl">
          Ready to see what your home could feel like?
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/quote" size="lg">Request Free Quote</Button>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex h-14 items-center border border-line px-9 text-base hover:border-bronze hover:text-bronze transition-colors"
          >
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
