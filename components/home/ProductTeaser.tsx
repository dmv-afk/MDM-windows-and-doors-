import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function ProductTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div className="mx-auto grid max-w-wrap items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Idealcombi · Futura+"
            title="Danish engineering. Irish homes."
            intro="Idealcombi is a premium European window and door manufacturer. We install Idealcombi products — including the Futura+ range — because of their quality, energy efficiency, durability, and contemporary design."
          />
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><span className="text-bronze">—</span> High-quality Danish-manufactured window systems</li>
            <li className="flex gap-3"><span className="text-bronze">—</span> Slim frames, large glass areas</li>
            <li className="flex gap-3"><span className="text-bronze">—</span> Triple glazing options available</li>
          </ul>
          <div className="mt-10 flex gap-4">
            <Button href="/products">Explore the range</Button>
            <Button href="/products#configurator" variant="ghost">Try the configurator</Button>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/3] overflow-hidden hairline">
            <Image
              src="/images/projects/sliding-screen-barn.jpg"
              alt="Idealcombi glazed screen installed by MDM Windows & Doors"
              fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover"
            />
            <div className="sheen pointer-events-none absolute inset-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
