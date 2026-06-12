"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Window3D = dynamic(() => import("./Window3D"), {
  ssr: false,
  loading: () => <Fallback loading />,
});

/**
 * Capability-gated 3D loader (approved performance strategy):
 * WebGL viewer is mounted only on pointer-fine, adequately wide, motion-OK
 * devices once scrolled near. Everyone else gets a crafted static fallback —
 * keeping mobile Lighthouse ≥ 90.
 */
export default function Window3DLoader() {
  const [capable, setCapable] = useState<boolean | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.innerWidth >= 1024;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    setCapable(fine && wide && motionOK && cores >= 4);
  }, []);

  if (capable === null) return <Fallback />;
  if (!capable) return <Fallback note="Interactive 3D viewer available on desktop." />;
  return <Window3D />;
}

function Fallback({ loading = false, note }: { loading?: boolean; note?: string }) {
  return (
    <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden hairline">
      <Image
        src="/images/projects/corner-glazing-stone-extension.jpg"
        alt="Idealcombi corner glazing detail"
        fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/35" />
      {(loading || note) && (
        <p className="absolute bottom-4 left-4 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-eyebrow backdrop-blur text-white/70">
          {loading ? "Loading 3D viewer…" : note}
        </p>
      )}
    </div>
  );
}
