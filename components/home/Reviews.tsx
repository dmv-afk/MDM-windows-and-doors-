import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * Reviews — real customer reviews only.
 * Image reviews are screenshots of genuine reviews supplied by MDM.
 */
const IMAGE_REVIEWS = [
  {
    src: "/images/reviews/review-cezary-morawski.jpg",
    alt:
      "Five-star Google review from Cezary Morawski: ordered Idealcombi doors with Assa Abloy locking system from MDM; the whole process of ordering and installation was quick and efficient, done with a professional approach and attention to every detail. Highly recommended for every doors or windows need.",
    w: 1170,
    h: 933,
  },
];

export default function Reviews() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <SectionHeading eyebrow="Reviews" title="What our customers say." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {IMAGE_REVIEWS.map((r) => (
            <Reveal key={r.src}>
              <figure className="overflow-hidden rounded-sm border border-line bg-white p-3 md:p-4">
                <Image
                  src={r.src}
                  alt={r.alt}
                  width={r.w}
                  height={r.h}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full rounded-sm"
                />
                <figcaption className="sr-only">{r.alt}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
