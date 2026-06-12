import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import ServicesPreview from "@/components/home/ServicesPreview";
import CTABand from "@/components/home/CTABand";

export const metadata: Metadata = buildMetadata({
  title: "Services — Window & Door Installation Dublin",
  description:
    "Window installation, door installation, sliding doors, triple glazing and energy-efficient upgrades across Dublin and surrounding areas.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 md:pt-44">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Every installation, treated like our own home."
            intro="Residential and commercial window and door installation across Dublin and surrounding areas, using Idealcombi systems."
          />
        </div>
      </section>
      <ServicesPreview />
      <CTABand />
    </>
  );
}
