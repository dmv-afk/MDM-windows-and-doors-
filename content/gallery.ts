import type { GalleryImage } from "@/types";

export const GALLERY: GalleryImage[] = [
  {
    src: "/images/projects/crittall-style-new-build.jpg",
    alt: "L-shaped new build with black-framed Idealcombi glazing throughout",
    w: 2000, h: 1500, tag: "New Build",
  },
  {
    src: "/images/projects/corner-glazing-stone-extension.jpg",
    alt: "Structural corner glazing on a stone-clad extension",
    w: 2000, h: 1500, tag: "Extension",
  },
  {
    src: "/images/projects/sliding-doors-garden-room.jpg",
    alt: "Sliding glass doors opening onto a timber deck",
    w: 2000, h: 1500, tag: "Sliding Doors",
  },
  {
    src: "/images/projects/sliding-screen-barn.jpg",
    alt: "Black glazed screen in a white rendered barn-style home",
    w: 2000, h: 1500, tag: "Glazed Screens",
  },
  {
    src: "/images/projects/icf-build-in-progress.jpg",
    alt: "Idealcombi windows installed during an ICF build",
    w: 960, h: 1280, tag: "In Progress",
  },
];

/** Before / during / after pairing for the comparison slider. */
export const BEFORE_AFTER = {
  before: {
    src: "/images/projects/icf-build-in-progress.jpg",
    alt: "Installation in progress on an ICF build",
    label: "During installation",
  },
  after: {
    src: "/images/projects/crittall-style-new-build.jpg",
    alt: "Completed installation with full glazing",
    label: "Completed",
  },
};
