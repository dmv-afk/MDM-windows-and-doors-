import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/** A real sequence — numbering here encodes genuine order. */
const STEPS = [
  { n: "01", title: "Enquiry", body: "Tell us about your project by phone, WhatsApp, email or the quote form. Photos and plans are welcome." },
  { n: "02", title: "Survey & quotation", body: "We review your requirements, survey where needed, and prepare a free, no-obligation quotation." },
  { n: "03", title: "Installation", body: "Your Idealcombi windows and doors are installed with precision and finished cleanly, inside and out." },
];

export default function Process() {
  return (
    <section className="py-24 md:py-36 border-t border-line">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <SectionHeading eyebrow="How it works" title="Three steps from enquiry to installed." />
        <ol className="mt-14 grid gap-px bg-line border border-line md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="bg-ink">
              <li className="h-full p-8 md:p-10">
                <span className="font-display text-4xl text-bronze/70">{s.n}</span>
                <h3 className="mt-5 font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
