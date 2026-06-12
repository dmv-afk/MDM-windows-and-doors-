export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  tag: string;
};
