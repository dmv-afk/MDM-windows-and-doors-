import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";
import Reviews from "@/components/home/Reviews";
import CTABand from "@/components/home/CTABand";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "MDM Windows & Doors specialises in the supply and installation of premium Idealcombi windows and doors for residential and commercial properties across Dublin and surrounding areas.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 md:pt-40 pb-20 md:pb-32">
        <div className="mx-auto grid max-w-wrap items-start gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About"
              title="Precision is the whole point."
              intro="MDM Windows & Doors specialises in the supply and installation of premium windows and doors for residential and commercial properties."
            />
            <Reveal delay={0.1} className="mt-10 space-y-6 text-sm md:text-base leading-relaxed text-white/80">
              <p>
                We focus on quality workmanship, attention to detail, and professional installation
                standards. We install high-quality Idealcombi products, known for their modern design,
                energy efficiency, durability, and performance.
              </p>
              <p>
                Our goal is to help homeowners and businesses improve comfort, appearance, security,
                and energy efficiency through expertly installed windows and doors.
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
          <SectionHeading eyebrow="Our approach" title="Quality installation matters." />
          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-white/80">
              At MDM Windows &amp; Doors, we believe quality installation is just as important as the
              products themselves. Every project is approached with attention to detail, careful
              workmanship, and a commitment to delivering a high-quality finish. We work with premium
              Idealcombi products to provide homeowners and businesses with windows and doors designed
              for performance, durability, and modern aesthetics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading eyebrow="Why Idealcombi" title="A premium European manufacturer." />
          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-white/80">
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
              <div key={f.k} className="bg-ink p-8">
                <p className="eyebrow">{f.k}</p>
                <p className="mt-3 text-white/90">{f.v}</p>
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
