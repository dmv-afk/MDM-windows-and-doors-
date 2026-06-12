import { PLACEHOLDER } from "@/lib/constants";

/**
 * Quiet credibility strip. Only verified facts appear as statements;
 * everything else is an explicitly labelled placeholder slot.
 */
export default function TrustBar() {
  const items = [
    { label: "Window systems", value: "Idealcombi Futura+" },
    { label: "Manufactured in", value: "Denmark" },
    { label: "Service area", value: "Dublin & surrounding areas" },
    { label: "Accreditations", value: PLACEHOLDER, placeholder: true },
  ];
  return (
    <section className="border-y border-line bg-charcoal">
      <div className="mx-auto grid max-w-wrap grid-cols-2 lg:grid-cols-4 divide-x divide-line border-x border-line">
        {items.map((it) => (
          <div key={it.label} className="px-5 py-7 md:px-8">
            <p className="eyebrow">{it.label}</p>
            <p className={`mt-2 text-sm md:text-base ${it.placeholder ? "italic text-white/35" : "text-white/85"}`}>
              {it.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
