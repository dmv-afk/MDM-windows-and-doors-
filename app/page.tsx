import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProductTeaser from "@/components/home/ProductTeaser";
import GalleryPreview from "@/components/home/GalleryPreview";
import Process from "@/components/home/Process";
import CTABand from "@/components/home/CTABand";

export const metadata: Metadata = buildMetadata({
  title: "MDM Windows & Doors — Window Installation Dublin | Idealcombi Windows",
  description:
    "Premium Idealcombi windows and doors professionally installed with expert craftsmanship across Dublin and surrounding areas. Request a free quote today.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <ProductTeaser />
      <GalleryPreview />
      <Process />
      <CTABand />
    </>
  );
}
