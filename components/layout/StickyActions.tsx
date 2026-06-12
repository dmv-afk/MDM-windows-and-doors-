"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

/**
 * Global conversion layer:
 *  - Sticky Call + Quote bar (mobile)
 *  - Floating expandable contact widget (desktop & mobile)
 */
export default function StickyActions() {
  const [open, setOpen] = useState(false);

  const channels = [
    { label: `Call ${CONTACT.phoneDisplay}`, href: CONTACT.phoneHref, external: false },
    { label: "WhatsApp", href: CONTACT.whatsappHref, external: true },
    { label: "Email", href: CONTACT.emailHref, external: false },
    { label: "Instagram", href: CONTACT.instagramHref, external: true },
  ];

  return (
    <>
      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 lg:hidden">
        <a
          href={CONTACT.phoneHref}
          className="flex h-14 items-center justify-center bg-charcoal text-sm font-medium border-t border-line active:bg-smoke"
        >
          Call {CONTACT.phoneDisplay}
        </a>
        <Link
          href="/quote"
          className="flex h-14 items-center justify-center bg-bronze text-ink text-sm font-semibold active:bg-bronze-deep"
        >
          Request Free Quote
        </Link>
      </div>

      {/* Floating contact widget */}
      <div className="fixed bottom-20 right-4 z-40 lg:bottom-8 lg:right-8 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-56 overflow-hidden rounded-sm border border-line bg-charcoal/95 backdrop-blur-md shadow-2xl"
            >
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block px-5 py-3.5 text-sm text-white/85 hover:bg-smoke hover:text-bronze transition-colors border-b border-line last:border-0"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close contact options" : "Open contact options"}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-bronze text-ink shadow-xl transition-transform duration-300 ease-luxe hover:scale-105"
        >
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-2xl leading-none">
            {open ? "+" : "✆"}
          </motion.span>
        </button>
      </div>

      {/* Desktop sticky quote button (right edge) */}
      <Link
        href="/quote"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block bg-bronze text-ink px-3 py-6 text-xs font-semibold tracking-eyebrow uppercase [writing-mode:vertical-rl] hover:bg-bronze-soft transition-colors"
      >
        Free Quote
      </Link>
    </>
  );
}
