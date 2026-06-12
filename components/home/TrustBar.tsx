/** Quiet credibility strip — verified facts only. */
export default function TrustBar() {
  const items = [
    { label: "Window systems", value: "Idealcombi Futura+" },
    { label: "Manufactured in", value: "Denmark" },
    { label: "Service area", value: "Dublin & surrounding areas" },
  ];
  return (
    <section className="border-y border-line bg-charcoal">
      <div className="mx-auto grid max-w-wrap grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line border-x border-line">
        {items.map((it) => (
          <div key={it.label} className="px-5 py-7 md:px-8">
            <p className="eyebrow">{it.label}</p>
            <p className="mt-2 text-sm md:text-base text-white/90">{it.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
