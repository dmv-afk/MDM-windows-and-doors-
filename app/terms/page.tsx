import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for use of the MDM Windows & Doors website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="pt-28 md:pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-4 text-4xl md:text-5xl">Terms &amp; Conditions</h1>

        <div className="mt-12 space-y-10 text-sm md:text-base leading-relaxed text-white/80">
          <div>
            <h2 className="font-display text-xl text-white">Website use</h2>
            <p className="mt-3">
              This website is operated by {SITE.name}. Content is provided for general information about our
              services. While we aim to keep information accurate and current, it does not constitute a
              contractual offer.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Quotations</h2>
            <p className="mt-3">
              Quotation requests submitted through this website are free and without obligation. Any quotation
              we subsequently provide will set out its own scope, pricing and validity.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Intellectual property</h2>
            <p className="mt-3">
              Photography and content on this site belong to {SITE.name} or are used with permission, and may
              not be reproduced without consent. Idealcombi is a brand of its respective owner.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Contact</h2>
            <p className="mt-3">{CONTACT.email} · {CONTACT.phoneDisplay}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
