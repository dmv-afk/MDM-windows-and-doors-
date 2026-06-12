import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import BeforeAfter from "@/components/gallery/BeforeAfter";
import CTABand from "@/components/home/CTABand";

export const metadata: Metadata = buildMetadata({
  title: "Project Gallery — Idealcombi Installations",
  description:
    "Recent Idealcombi window and door installations by MDM Windows & Doors across Dublin and surrounding areas.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Recent installations."
            intro="A selection of Idealcombi window and door installations. Tap any image to view full screen."
          />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <MasonryGrid />
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <SectionHeading
            eyebrow="Before & after"
            title="From build stage to finished."
            intro="Drag the handle to compare an installation in progress with the completed result."
          />
          <div className="mt-12">
            <BeforeAfter />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
