import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import Window3DLoader from "@/components/three/Window3DLoader";
import WindowConfigurator from "@/components/configurator/WindowConfigurator";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/home/CTABand";

export const metadata: Metadata = buildMetadata({
  title: "Idealcombi Products — Futura+ Windows & Doors",
  description:
    "Explore the Idealcombi Futura+ range installed by MDM Windows & Doors — Danish-manufactured windows and doors with triple glazing options.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading
            eyebrow="Idealcombi"
            title="The Futura+ range, installed properly."
            intro="We install Idealcombi window and door systems, manufactured in Denmark. Explore the window in 3D, then build your preferred combination below."
          />
        </div>
      </section>

      {/* ── 3D showcase ── */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid max-w-wrap items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal><Window3DLoader /></Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow">Interactive showcase</p>
            <h2 className="display mt-4 text-3xl md:text-4xl">Turn it. Open it. Look closer.</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              Drag to rotate the window, switch frame colours, and open the sash to see how it moves.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><span className="text-bronze">—</span> Slim frame, maximised glass area</li>
              <li className="flex gap-3"><span className="text-bronze">—</span> Opening sash demonstration</li>
              <li className="flex gap-3"><span className="text-bronze">—</span> Frame colour options</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Configurator ── */}
      <section className="border-t border-line py-20 md:py-32">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading
            eyebrow="Configurator"
            title="Build your window."
            intro="Choose a style, frame colour, glazing and opening type — then send the combination straight into your quote request."
          />
          <div className="mt-14">
            <WindowConfigurator />
          </div>
        </div>
      </section>

      {/* ── Installed examples ── */}
      <section className="border-t border-line py-20 md:py-32">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading eyebrow="In place" title="Idealcombi, installed by MDM." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <RevealImage src="/images/projects/crittall-style-new-build.jpg" alt="Idealcombi glazing on a new build" className="aspect-[16/10]" />
            <RevealImage src="/images/projects/sliding-doors-garden-room.jpg" alt="Idealcombi sliding doors onto decking" className="aspect-[16/10]" />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
