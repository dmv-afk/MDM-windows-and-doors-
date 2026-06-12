"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { CONTACT, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature hero — "the window opens".
 *
 * A pinned 300vh scroll sequence. The viewer starts inside a dark room,
 * looking at a closed Idealcombi-style glazed sash. As they scroll:
 *   1. the two sash panels swing open (3D rotateY on layered DOM panes)
 *   2. daylight floods in (light-wash + photo brightens, reflections sweep)
 *   3. the headline is revealed behind the glass, line by line
 *   4. background photo settles from 1.15 → 1.0 scale (parallax)
 *
 * Implemented entirely with transform/opacity layers (no WebGL), so the
 * identical cinematic sequence runs at 60fps on mobile — per the approved
 * performance strategy. Reduced-motion users get the final composed frame.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.6,
          pin: ".hero-stage",
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // Background photo: slow settle + brighten as light enters
      tl.fromTo(".hero-photo", { scale: 1.18, filter: "brightness(0.45) saturate(0.8)" },
        { scale: 1.0, filter: "brightness(1) saturate(1)", duration: 1 }, 0);

      // Sash panels swing open
      tl.to(".sash-left", { rotateY: -78, duration: 0.85 }, 0.05);
      tl.to(".sash-right", { rotateY: 78, duration: 0.85 }, 0.05);

      // Glass reflection sheen travels across each pane as it moves
      tl.fromTo(".sash-sheen", { xPercent: -120 }, { xPercent: 120, duration: 0.8 }, 0.1);

      // Light wash pours through the opening
      tl.fromTo(".light-wash", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.25);
      tl.to(".room-shade", { opacity: 0, duration: 0.7 }, 0.2);

      // Headline lines rise from behind the frame
      tl.fromTo(".hero-line > span", { yPercent: 110 },
        { yPercent: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.45);
      tl.fromTo(".hero-sub", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 }, 0.7);
      tl.fromTo(".hero-ctas", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 }, 0.8);

      // Frame border drifts outward (multi-layer parallax depth)
      tl.to(".window-frame", { scale: 1.06, opacity: 0.0, duration: 0.6 }, 0.55);
      tl.to(".scroll-cue", { opacity: 0, duration: 0.2 }, 0.1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative" aria-label="Introduction">
      <div className="hero-stage relative h-svh overflow-hidden bg-ink">

        {/* ── Layer 1: project photo (the world outside) ─────────── */}
        <div className="hero-photo absolute inset-0 will-change-transform">
          <Image
            src="/images/projects/crittall-style-new-build.jpg"
            alt="New build home fitted with black-framed Idealcombi windows by MDM Windows & Doors"
            fill priority sizes="100vw" className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/40" />
        </div>

        {/* ── Layer 2: dark interior shade, fades as light enters ─── */}
        <div className="room-shade pointer-events-none absolute inset-0 bg-ink/65" />

        {/* ── Layer 3: light wash pouring through the opening ─────── */}
        <div
          className="light-wash pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 30%, rgba(201,174,130,0.22) 0%, rgba(201,174,130,0.06) 45%, transparent 70%)",
          }}
        />

        {/* ── Layer 4: the opening sash (two glazed panels) ────────── */}
        <div className="pointer-events-none absolute inset-0 flex" style={{ perspective: "1400px" }}>
          <div
            className="sash-left relative h-full w-1/2 origin-left will-change-transform border-r border-white/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Pane />
          </div>
          <div
            className="sash-right relative h-full w-1/2 origin-right will-change-transform border-l border-white/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Pane />
          </div>
        </div>

        {/* ── Layer 5: outer window frame ──────────────────────────── */}
        <div className="window-frame pointer-events-none absolute inset-4 md:inset-8 border border-white/20 will-change-transform" />

        {/* ── Layer 6: content ─────────────────────────────────────── */}
        <div className="relative z-10 flex h-full items-end pb-28 md:items-center md:pb-0">
          <div className="mx-auto w-full max-w-wrap px-5 md:px-8">
            <p className="eyebrow mb-5">Idealcombi · Dublin &amp; surrounding areas</p>
            <h1 className="display text-[clamp(2.4rem,7vw,5.5rem)] max-w-4xl">
              <span className="hero-line mask-line"><span>Premium Windows</span></span>
              <span className="hero-line mask-line"><span>&amp; Doors Installed</span></span>
              <span className="hero-line mask-line"><span className="text-bronze-soft">With Precision</span></span>
            </h1>
            <p className="hero-sub mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
              {SITE.description.replace(" Serving Dublin and surrounding areas.", "")}
            </p>
            <div className="hero-ctas mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="/quote" size="lg">Request Free Quote</Button>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex h-14 items-center justify-center border border-line px-9 text-base hover:border-bronze hover:text-bronze transition-colors duration-400 ease-luxe"
              >
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* ── Scroll cue ───────────────────────────────────────────── */}
        <div className="scroll-cue absolute bottom-20 md:bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] uppercase tracking-eyebrow">Scroll to open</span>
          <span className="block h-8 w-px bg-gradient-to-b from-bronze to-transparent" />
        </div>
      </div>
    </section>
  );
}

/** One glazed sash panel: tinted glass, mullions, travelling reflection. */
function Pane() {
  return (
    <div className="absolute inset-0 overflow-hidden backdrop-blur-[2px] bg-white/[0.04]">
      {/* glass tint + edge highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent" />
      {/* mullion grid (echoes the Idealcombi glazing bars in the photo) */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-white/[0.10]" />
        ))}
      </div>
      {/* travelling reflection */}
      <div className="sash-sheen sheen absolute inset-y-0 -left-1/3 w-2/3 will-change-transform" />
      {/* sash frame */}
      <div className="absolute inset-0 border-[6px] border-charcoal/90" />
    </div>
  );
}
