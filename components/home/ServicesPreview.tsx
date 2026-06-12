import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/content/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function ServicesPreview() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Installed once. Installed properly."
          intro="From single window replacements to full new-build glazing packages — every project is fitted with the same care."
        />

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 border border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 0.05, 0.3)} className="bg-ink">
              <Link
                href={`/services/${s.slug}`}
                className="group relative block h-full overflow-hidden p-7 md:p-9 transition-colors duration-500 hover:bg-charcoal"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-[0.16]">
                  <Image src={s.image} alt="" fill sizes="33vw" className="object-cover" />
                </div>
                <div className="relative">
                  <h3 className="font-display text-xl md:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{s.short}</p>
                  <span className="mt-6 inline-block text-xs uppercase tracking-eyebrow text-bronze opacity-0 -translate-x-2 transition-all duration-400 ease-luxe group-hover:opacity-100 group-hover:translate-x-0">
                    View service →
                  </span>
                </div>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-bronze transition-all duration-500 ease-luxe group-hover:w-full" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
