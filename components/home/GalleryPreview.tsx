import Link from "next/link";
import { GALLERY } from "@/content/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealImage from "@/components/ui/RevealImage";
import Button from "@/components/ui/Button";

export default function GalleryPreview() {
  const picks = GALLERY.slice(0, 3);
  return (
    <section className="bg-bone py-24 md:py-36 text-ink">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            dark={false}
            eyebrow="Recent work"
            title="The work speaks quietly."
            intro="A selection of recent Idealcombi installations. More project photography to be supplied by MDM Windows & Doors."
          />
          <Button href="/gallery" variant="ghost" className="!border-ink/20 !text-ink hover:!border-bronze hover:!text-bronze-deep w-fit">
            View full gallery
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {picks.map((img, i) => (
            <Link key={img.src} href="/gallery" className={i === 0 ? "md:col-span-2" : ""}>
              <RevealImage
                src={img.src}
                alt={img.alt}
                className={i === 0 ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-auto md:h-full"}
                sizes={i === 0 ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
