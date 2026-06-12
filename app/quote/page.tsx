import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import QuoteForm from "@/components/quote/QuoteForm";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Request a Free Quote",
  description:
    "Request a free, no-obligation quote for Idealcombi window and door installation in Dublin and surrounding areas.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <section className="pt-32 md:pt-44 pb-28 md:pb-40">
      <div className="mx-auto grid max-w-wrap gap-16 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Free quote"
            title="Tell us about your project."
            intro="Send the details below and we'll come back to you with a free, no-obligation quotation. Photos help — attach them if you have any."
          />
          <div className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
            <p className="eyebrow">Prefer to talk?</p>
            <a href={CONTACT.phoneHref} className="block font-display text-2xl hover:text-bronze transition-colors">
              {CONTACT.phoneDisplay}
            </a>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="block text-white/80 hover:text-bronze transition-colors">
              Message us on WhatsApp
            </a>
            <a href={CONTACT.emailHref} className="block text-white/80 hover:text-bronze transition-colors">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="border border-line bg-charcoal/60 p-7 md:p-10">
          <Suspense fallback={<p className="text-sm text-white/50">Loading form…</p>}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
