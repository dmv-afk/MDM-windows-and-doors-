import type { Metadata } from "next";
import { SITE, CONTACT } from "./constants";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_IE",
      images: [{ url: `${SITE.url}/images/projects/crittall-style-new-build.jpg`, width: 1200, height: 900 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** LocalBusiness structured data. Street address to be supplied by MDM Windows & Doors. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: "+353877936055",
    email: CONTACT.email,
    areaServed: "Dublin, Ireland",
    sameAs: [CONTACT.instagramHref],
    description: SITE.description,
    makesOffer: [
      "Window Installation",
      "Door Installation",
      "Sliding Doors",
      "Triple Glazing",
      "Energy Efficient Upgrades",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
}
