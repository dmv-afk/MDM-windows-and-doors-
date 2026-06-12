import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";
import Reviews from "@/components/home/Reviews";
import CTABand from "@/components/home/CTABand";
import { PLACEHOLDER, SITE } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "MDM Windows & Doors specialises in the supply and installation of premium Idealcombi windows and doors for residential and commercial properties across Dublin and surrounding areas.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 md:pt-44 pb-20 md:pb-32">
        <div className="mx-auto grid max-w-wrap items-start gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About"
              title="Precision is the whole point."
              intro="MDM Windows & Doors specialises in the supply and installation of premium windows and doors for residential and commercial properties."
            />
            <Reveal delay={0.1} className="mt-10 space-y-6 text-sm leading-relaxed text-white/65">
              <p>
                We focus on quality workmanship, attention to detail, and professional installation
                standards. We install high-quality Idealcombi products, known for their modern design,
                energy efficiency, durability, and performance.
              </p>
              <p>
                Our goal is to help homeowners and businesses improve comfort, appearance, security,
                and energy efficiency through expertly installed windows and doors.
              </p>
              <p className="border-l-2 border-bronze/40 pl-5 italic text-white/40">
                Company experience — {PLACEHOLDER}
              </p>
              <p className="border-l-2 border-bronze/40 pl-5 italic text-white/40">
                Certifications — {PLACEHOLDER}
              </p>
            </Reveal>
          </div>
          <RevealImage
            src="/images/projects/corner-glazing-stone-extension.jpg"
            alt="Corner glazing installation by MDM Windows & Doors"
            className="aspect-[4/5]"
            priority
          />
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28 bg-charcoal">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading eyebrow="Why Idealcombi" title="A premium European manufacturer." />
          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-white/65">
              Idealcombi is a premium European window and door manufacturer. MDM Windows &amp; Doors
              installs Idealcombi products because of their quality, energy efficiency, durability,
              and contemporary design.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line border border-line sm:grid-cols-3">
            {[
              { k: "Products", v: "Idealcombi Futura+ window & door systems" },
              { k: "Origin", v: "Manufactured in Denmark" },
              { k: "Coverage", v: SITE.area },
            ].map((f) => (
              <div key={f.k} className="bg-charcoal p-8">
                <p className="eyebrow">{f.k}</p>
                <p className="mt-3 text-white/85">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <CTABand />
    </>
  );
}
