"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { BEFORE_AFTER } from "@/content/gallery";

/** Draggable before/after comparison slider (pointer + keyboard accessible). */
export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] md:aspect-[16/9] select-none overflow-hidden hairline touch-none"
      onPointerDown={(e) => { dragging.current = true; update(e.clientX); (e.target as Element).setPointerCapture?.(e.pointerId); }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* After (base) */}
      <Image src={BEFORE_AFTER.after.src} alt={BEFORE_AFTER.after.alt} fill sizes="100vw" className="object-cover" />
      <span className="absolute bottom-4 right-4 z-10 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-eyebrow backdrop-blur">
        {BEFORE_AFTER.after.label}
      </span>

      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={BEFORE_AFTER.before.src} alt={BEFORE_AFTER.before.alt} fill sizes="100vw" className="object-cover" />
        <span className="absolute bottom-4 left-4 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-eyebrow backdrop-blur">
          {BEFORE_AFTER.before.label}
        </span>
      </div>

      {/* Handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-bronze" />
        <button
          aria-label="Drag to compare before and after"
          role="slider"
          aria-valuenow={Math.round(pos)} aria-valuemin={0} aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-bronze text-ink shadow-lg cursor-ew-resize"
        >
          <span className="text-sm tracking-tighter">⟨⟩</span>
        </button>
      </div>
    </div>
  );
}
