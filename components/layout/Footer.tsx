import Link from "next/link";
import { CONTACT, NAV, SITE, PLACEHOLDER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-wrap px-5 md:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">MDM</p>
            <p className="eyebrow mt-1">Windows &amp; Doors</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Premium Idealcombi windows and doors, professionally installed across {SITE.area}.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {[...NAV, { label: "Request Quote", href: "/quote" }, { label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms & Conditions", href: "/terms" }].map((item) => (
              <Link key={item.href} href={item.href} className="text-white/70 hover:text-bronze transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm space-y-3">
            <a href={CONTACT.phoneHref} className="block text-white/80 hover:text-bronze transition-colors">
              {CONTACT.phoneDisplay}
            </a>
            <a href={CONTACT.emailHref} className="block text-white/80 hover:text-bronze transition-colors">
              {CONTACT.email}
            </a>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="block text-white/80 hover:text-bronze transition-colors">
              WhatsApp
            </a>
            {/* Instagram tile — deliberate link-out; no embedded feed (performance) */}
            <a
              href={CONTACT.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 border border-line px-4 py-3 hover:border-bronze hover:text-bronze transition-colors"
            >
              <span className="eyebrow !text-inherit">Instagram</span>
              <span className="text-white/80">{CONTACT.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Registered business details — {PLACEHOLDER}</p>
        </div>
      </div>
    </footer>
  );
}
