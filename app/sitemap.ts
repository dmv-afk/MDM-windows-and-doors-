import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/services", "/products", "/gallery", "/about",
    "/contact", "/quote", "/privacy-policy", "/terms",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/quote" ? 0.9 : 0.7,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
