import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/home/CTABand";
import { PLACEHOLDER, SITE } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "MDM Windows & Doors installs premium Idealcombi windows and doors across Dublin and surrounding areas.",
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
              intro={`MDM Windows & Doors installs premium Idealcombi windows and doors across ${SITE.area}.`}
            />
            <Reveal delay={0.1} className="mt-10 space-y-6 text-sm leading-relaxed text-white/60">
              <p className="border-l-2 border-bronze/40 pl-5 italic text-white/40">
                Company story, team and background — {PLACEHOLDER}
              </p>
              <p className="border-l-2 border-bronze/40 pl-5 italic text-white/40">
                Experience, qualifications and accreditations — {PLACEHOLDER}
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
          <SectionHeading eyebrow="What we stand on" title="The facts." />
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

      <CTABand />
    </>
  );
}
