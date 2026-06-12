import type { Service } from "@/types";

/**
 * Service copy is intentionally factual and claim-free.
 * Anything project-specific is flagged for MDM to supply.
 */
export const SERVICES: Service[] = [
  {
    slug: "window-installation",
    title: "Window Installation",
    short: "Idealcombi windows fitted with measured, careful workmanship.",
    intro:
      "Supply and installation of premium Idealcombi windows, fitted with precision and finished cleanly inside and out.",
    bullets: [
      "Idealcombi Futura+ window systems",
      "Accurate surveying and measurement",
      "Clean removal of existing windows where required",
      "Careful sealing and finishing around every frame",
    ],
    image: "/images/projects/crittall-style-new-build.jpg",
    imageAlt: "New build home in Ireland fitted with black-framed Idealcombi windows",
  },
  {
    slug: "door-installation",
    title: "Door Installation",
    short: "Entrance and internal-to-garden doors, hung and aligned precisely.",
    intro:
      "Professional installation of Idealcombi door systems — fitted square, sealed properly and finished to a high standard.",
    bullets: [
      "Entrance and terrace door systems",
      "Precise alignment for smooth, lasting operation",
      "Weather sealing appropriate to the Irish climate",
    ],
    image: "/images/projects/sliding-screen-barn.jpg",
    imageAlt: "Black-framed glazed screen and door installed in a white rendered home",
  },
  {
    slug: "sliding-doors",
    title: "Sliding Doors",
    short: "Large-format sliding doors that open living spaces to the garden.",
    intro:
      "Installation of large sliding door systems, bringing light into living spaces and connecting them with the outdoors.",
    bullets: [
      "Large-format glazed sliding panels",
      "Smooth-running track installation",
      "Level threshold detailing where the design allows",
      "Careful glass handling on site",
    ],
    image: "/images/projects/sliding-doors-garden-room.jpg",
    imageAlt: "Sliding glass doors opening onto timber decking",
  },
  {
    slug: "triple-glazing",
    title: "Triple Glazing",
    short: "High-performance triple glazed units for comfort and quiet.",
    intro:
      "Triple glazed Idealcombi units installed for improved thermal comfort and noise reduction.",
    bullets: [
      "Triple glazed Idealcombi units",
      "Suited to new builds and upgrades",
      "Helps reduce heat loss through glazing",
    ],
    image: "/images/projects/corner-glazing-stone-extension.jpg",
    imageAlt: "Corner glazing on a stone-clad extension",
  },
  {
    slug: "energy-efficient-upgrades",
    title: "Energy Efficient Upgrades",
    short: "Replace older windows and doors with high-performance units.",
    intro:
      "Replacement of older windows and doors with modern, energy-efficient Idealcombi systems, fitted with minimal disruption.",
    bullets: [
      "Removal and disposal of existing units",
      "Modern insulated frames and glazing",
      "Draught-proof sealing and finishing",
      "Tidy, respectful working in occupied homes",
    ],
    image: "/images/projects/window-replacement-renovation.jpg",
    imageAlt: "Home renovation with new anthracite Idealcombi windows replacing older units",
  },
  {
    slug: "residential",
    title: "Residential Projects",
    short: "New builds, renovations and extensions across Dublin.",
    intro:
      "Window and door installation for homes — new builds, renovations and extensions — across Dublin and surrounding areas.",
    bullets: [
      "New build glazing packages",
      "Renovations and extensions",
      "Coordination with builders and architects",
      "Clean, finished handover",
    ],
    image: "/images/projects/crittall-style-new-build.jpg",
    imageAlt: "Residential new build with full-height glazing",
  },
  {
    slug: "commercial",
    title: "Commercial Projects",
    short: "Glazing installation for commercial buildings.",
    intro:
      "Window and door installation for commercial projects, delivered with the same precision as our residential work.",
    bullets: [
      "Commercial window and door packages",
      "Programme-aware site working",
    ],
    image: "/images/projects/sliding-screen-barn.jpg",
    imageAlt: "Large glazed screen installation",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
