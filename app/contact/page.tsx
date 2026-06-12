import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { CONTACT, PLACEHOLDER } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact MDM Windows & Doors — phone, WhatsApp, email or Instagram. Serving Dublin and surrounding areas.",
  path: "/contact",
});

const CHANNELS = [
  { k: "Phone", v: CONTACT.phoneDisplay, href: CONTACT.phoneHref, note: "The fastest way to reach us." },
  { k: "WhatsApp", v: CONTACT.phoneDisplay, href: CONTACT.whatsappHref, note: "Send photos of your project directly.", external: true },
  { k: "Email", v: CONTACT.email, href: CONTACT.emailHref, note: "Plans and documents welcome." },
  { k: "Instagram", v: CONTACT.instagramHandle, href: CONTACT.instagramHref, note: "Recent installations and works in progress.", external: true },
];

export default function ContactPage() {
  return (
    <section className="pt-32 md:pt-44 pb-28 md:pb-40">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to us about your project."
          intro="Phone, WhatsApp, email or Instagram — whichever suits. We serve Dublin and surrounding areas."
        />

        <div className="mt-14 grid gap-px bg-line border border-line sm:grid-cols-2">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.07} className="bg-ink">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group block h-full p-8 md:p-10 hover:bg-charcoal transition-colors"
              >
                <p className="eyebrow">{c.k}</p>
                <p className="mt-3 font-display text-xl md:text-2xl group-hover:text-bronze transition-colors break-all">{c.v}</p>
                <p className="mt-3 text-sm text-white/55">{c.note}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex flex-col items-start gap-6 border border-line p-8 md:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl">Ready for a quotation?</p>
            <p className="mt-2 text-sm text-white/60">Free and without obligation.</p>
          </div>
          <Button href="/quote" size="lg">Request Free Quote</Button>
        </Reveal>

        <p className="mt-10 text-xs italic text-white/35">
          Business address and opening hours — {PLACEHOLDER}
        </p>
      </div>
    </section>
  );
}
