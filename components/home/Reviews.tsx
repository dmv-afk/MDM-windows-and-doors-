import SectionHeading from "@/components/ui/SectionHeading";
import { PLACEHOLDER } from "@/lib/constants";

/**
 * Reviews section — structurally ready, intentionally empty.
 * Real customer reviews go into the REVIEWS array below; nothing is
 * fabricated. Each entry needs: quote, name, location (optional).
 */
type Review = { quote: string; name: string; location?: string };

const REVIEWS: Review[] = [
  // Example shape (do not publish until real):
  // { quote: "…", name: "…", location: "Dublin" },
];

export default function Reviews() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="What our customers say."
        />

        {REVIEWS.length === 0 ? (
          <div className="mt-12 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex min-h-48 items-center justify-center bg-ink p-8 text-center">
                <p className="max-w-xs text-xs italic leading-relaxed text-white/35">
                  Customer review — {PLACEHOLDER}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="bg-ink p-8 md:p-10">
                <blockquote className="text-sm leading-relaxed text-white/75">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-6">
                  <p className="font-display">{r.name}</p>
                  {r.location && <p className="mt-1 text-xs text-white/45">{r.location}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
