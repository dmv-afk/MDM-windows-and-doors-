"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { CONTACT, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature hero — "the window opens". Audit-tuned v3.
 *
 * Performance rules applied:
 *  · TEXT IS NEVER HIDDEN IN MARKUP. All hide states are applied by GSAP at
 *    init, so slow JS / lite devices / no JS always show readable text.
 *  · No CSS `filter` animation (full-screen brightness() forced repaints —
 *    the main scroll-lag source). Brightness is now a cheap opacity overlay.
 *  · No backdrop-filter anywhere.
 *  · Desktop (fine pointer): pinned scroll-scrub, shortened to 140%.
 *  · Touch: one short autoplay intro (no pin, no scrub, native scroll).
 *  · Low-power touch & reduced-motion: static final frame, zero animation.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    // Helper: put the stage into its "closed window" start state.
    const setStart = () => {
      gsap.set(".room-shade", { opacity: 0.65 });
      gsap.set(".hero-photo", { scale: 1.12 });
      gsap.set(".hero-line > span", { yPercent: 110 });
      gsap.set([".hero-sub", ".hero-ctas"], { opacity: 0, y: 20 });
    };

    // ── Desktop: scroll-driven ──────────────────────────────────────
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      setStart();
      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=140%",
          scrub: true,
          pin: ".hero-stage",
          anticipatePin: 1,
        },
      });
      tl.to(".hero-photo", { scale: 1, duration: 1 }, 0)
        .to(".room-shade", { opacity: 0, duration: 0.7 }, 0.15)
        .to(".sash-left", { rotateY: -78, duration: 0.85 }, 0.05)
        .to(".sash-right", { rotateY: 78, duration: 0.85 }, 0.05)
        .fromTo(".sash-sheen", { xPercent: -120 }, { xPercent: 120, duration: 0.8 }, 0.1)
        .to(".light-wash", { opacity: 1, duration: 0.6 }, 0.25)
        .to(".hero-line > span", { yPercent: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.4)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.4 }, 0.65)
        .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.4 }, 0.75)
        .to(".window-frame", { opacity: 0, duration: 0.5 }, 0.55)
        .to(".scroll-cue", { opacity: 0, duration: 0.2 }, 0.1);
    });

    // ── Touch (capable): short autoplay intro ───────────────────────
    mm.add("(pointer: coarse) and (prefers-reduced-motion: no-preference)", () => {
      const cores = navigator.hardwareConcurrency ?? 4;
      if (cores <= 4) {
        // Low-power: static final frame, fully readable, zero animation.
        gsap.set([".sash-left", ".sash-right"], { rotateY: (i: number) => (i === 0 ? -78 : 78) });
        gsap.set([".room-shade", ".window-frame", ".scroll-cue"], { opacity: 0 });
        gsap.set(".light-wash", { opacity: 1 });
        return;
      }
      setStart();
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", force3D: true }, delay: 0.3 });
      tl.to(".hero-photo", { scale: 1, duration: 2 }, 0)
        .to(".sash-left", { rotateY: -78, duration: 1.5 }, 0.15)
        .to(".sash-right", { rotateY: 78, duration: 1.5 }, 0.15)
        .to(".room-shade", { opacity: 0, duration: 1 }, 0.4)
        .to(".light-wash", { opacity: 1, duration: 0.8 }, 0.5)
        .to(".window-frame", { opacity: 0, duration: 0.6 }, 0.8)
        .to(".hero-line > span", { yPercent: 0, duration: 0.6, stagger: 0.09, ease: "power3.out" }, 0.7)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.5 }, 1.15)
        .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.5 }, 1.3);
    });

    // ── Reduced motion: static final frame ──────────────────────────
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".sash-left", ".sash-right"], { rotateY: (i: number) => (i === 0 ? -78 : 78) });
      gsap.set([".room-shade", ".window-frame", ".scroll-cue"], { opacity: 0 });
      gsap.set(".light-wash", { opacity: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative" aria-label="Introduction">
      <div className="hero-stage relative h-svh overflow-hidden bg-ink">

        {/* Layer 1: photo (no filter animation — audit fix) */}
        <div className="hero-photo absolute inset-0 will-change-transform">
          <Image
            src="/images/projects/crittall-style-new-build.jpg"
            alt="New build home fitted with black-framed Idealcombi windows by MDM Windows & Doors"
            fill priority sizes="100vw" className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/40" />
        </div>

        {/* Layer 2: dimmer overlay (replaces brightness filter) */}
        <div className="room-shade pointer-events-none absolute inset-0 bg-ink opacity-0" />

        {/* Layer 3: light wash */}
        <div
          className="light-wash pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 30%, rgba(201,174,130,0.20) 0%, rgba(201,174,130,0.05) 45%, transparent 70%)",
          }}
        />

        {/* Layer 4: sash panels */}
        <div className="pointer-events-none absolute inset-0 flex" style={{ perspective: "1400px" }}>
          <div className="sash-left relative h-full w-1/2 origin-left will-change-transform border-r border-white/10"
            style={{ transformStyle: "preserve-3d" }}>
            <Pane />
          </div>
          <div className="sash-right relative h-full w-1/2 origin-right will-change-transform border-l border-white/10"
            style={{ transformStyle: "preserve-3d" }}>
            <Pane />
          </div>
        </div>

        {/* Layer 5: outer frame */}
        <div className="window-frame pointer-events-none absolute inset-4 md:inset-8 border border-white/20" />

        {/* Layer 6: content — visible by default, GSAP applies hide states */}
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

        {/* Scroll cue (desktop only) */}
        <div className="scroll-cue absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 md:flex">
          <span className="text-[10px] uppercase tracking-eyebrow">Scroll to open</span>
          <span className="block h-8 w-px bg-gradient-to-b from-bronze to-transparent" />
        </div>
      </div>
    </section>
  );
}

/** Glazed sash panel — no backdrop-filter (audit fix). */
function Pane() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white/[0.05]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-white/[0.10]" />
        ))}
      </div>
      <div className="sash-sheen sheen absolute inset-y-0 -left-1/3 w-2/3 will-change-transform" />
      <div className="absolute inset-0 border-[6px] border-charcoal/90" />
    </div>
  );
}
