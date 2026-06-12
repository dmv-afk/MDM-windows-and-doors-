"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe",
          scrolled ? "bg-ink/95 border-b border-line shadow-lg shadow-ink/40" : "bg-ink/90 border-b border-line"
        )}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-wrap items-center justify-between px-5 md:px-8">
          {/* Wordmark */}
          <Link href="/" className="group flex items-baseline gap-2" aria-label="MDM Windows & Doors — home">
            <span className="font-display text-lg sm:text-xl md:text-2xl tracking-wide">MDM</span>
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-eyebrow text-white/85 group-hover:text-bronze transition-colors">
              Windows &amp; Doors
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm text-white/80 hover:text-white transition-colors",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-bronze after:transition-all after:duration-300 after:ease-luxe",
                  pathname.startsWith(item.href) ? "text-white after:w-full" : "after:w-0 hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={CONTACT.phoneHref} className="text-sm text-white/80 hover:text-bronze transition-colors">
              {CONTACT.phoneDisplay}
            </a>
            <Button href="/quote" size="sm">Request Free Quote</Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={cn("h-px w-6 bg-white transition-transform duration-300", open && "translate-y-[6px] rotate-45")} />
            <span className={cn("h-px w-6 bg-white transition-opacity duration-300", open && "opacity-0")} />
            <span className={cn("h-px w-6 bg-white transition-transform duration-300", open && "-translate-y-[6px] -rotate-45")} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex h-full flex-col justify-center gap-2 px-8 pt-16" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} className="font-display text-4xl py-3 block hover:text-bronze transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8 flex flex-col gap-4"
              >
                <Button href="/quote">Request Free Quote</Button>
                <a href={CONTACT.phoneHref} className="text-center text-white/70">
                  Call {CONTACT.phoneDisplay}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
