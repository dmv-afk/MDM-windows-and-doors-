import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import Button from "@/components/ui/Button";
import CTABand from "@/components/home/CTABand";
import { CONTACT } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return buildMetadata({
    title: `${s.title} — Dublin & Surrounding Areas`,
    description: s.intro,
    path: `/services/${s.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-wrap items-start gap-14 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Service</p>
            <h1 className="display mt-4 text-4xl md:text-6xl">{s.title}</h1>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/80">{s.intro}</p>
            <ul className="mt-9 space-y-3.5 text-sm text-white/70">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-px text-bronze">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/quote" size="lg">Request Free Quote</Button>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex h-14 items-center justify-center border border-line px-9 hover:border-bronze hover:text-bronze transition-colors"
              >
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <RevealImage src={s.image} alt={s.imageAlt} className="aspect-[4/3] lg:sticky lg:top-28" priority />
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="mx-auto max-w-wrap px-5 md:px-8">
          <p className="eyebrow">More services</p>
          <div className="mt-8 grid gap-px bg-line border border-line md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group relative overflow-hidden bg-ink p-8 hover:bg-charcoal transition-colors">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.14] transition-opacity duration-700">
                  <Image src={o.image} alt="" fill sizes="33vw" className="object-cover" />
                </div>
                <h3 className="relative font-display text-xl">{o.title}</h3>
                <p className="relative mt-2 text-sm text-white/75">{o.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
