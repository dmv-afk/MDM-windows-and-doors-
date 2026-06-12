"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Visual window configurator with a live SVG preview (approved strategy:
 * instant feedback at near-zero performance cost on every device).
 * Selections carry into the quote form via query params.
 */
const STYLES = [
  { id: "fixed", label: "Fixed pane" },
  { id: "casement", label: "Casement" },
  { id: "crittall", label: "Glazing-bar grid" },
  { id: "sliding", label: "Sliding door" },
] as const;

const COLOURS = [
  { id: "charcoal", label: "Charcoal", hex: "#1f1f1f" },
  { id: "anthracite", label: "Anthracite", hex: "#3c4145" },
  { id: "white", label: "White", hex: "#e9e7e1" },
  { id: "bronze", label: "Bronze", hex: "#6e5635" },
] as const;

const GLAZING = [
  { id: "double", label: "Double glazed" },
  { id: "triple", label: "Triple glazed" },
] as const;

const OPENING = [
  { id: "none", label: "Fixed" },
  { id: "side", label: "Side hung" },
  { id: "tilt", label: "Tilt & turn" },
] as const;

export default function WindowConfigurator() {
  const [style, setStyle] = useState<(typeof STYLES)[number]["id"]>("crittall");
  const [colour, setColour] = useState<(typeof COLOURS)[number]>(COLOURS[0]);
  const [glazing, setGlazing] = useState<(typeof GLAZING)[number]["id"]>("triple");
  const [opening, setOpening] = useState<(typeof OPENING)[number]["id"]>("side");

  const summary = useMemo(
    () =>
      `${STYLES.find((s) => s.id === style)!.label} · ${colour.label} · ${GLAZING.find((g) => g.id === glazing)!.label} · ${OPENING.find((o) => o.id === opening)!.label}`,
    [style, colour, glazing, opening]
  );

  const quoteHref = `/quote?config=${encodeURIComponent(summary)}`;

  return (
    <div id="configurator" className="grid gap-10 lg:grid-cols-2 lg:items-start">
      {/* ── Live preview ─────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden hairline bg-gradient-to-b from-smoke to-charcoal p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${style}-${colour.id}-${glazing}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Preview style={style} frame={colour.hex} glazing={glazing} />
            </motion.div>
          </AnimatePresence>
          <p className="mt-6 text-center text-xs text-white/50">{summary}</p>
        </div>
      </div>

      {/* ── Options ──────────────────────────────────────────────── */}
      <div className="space-y-9">
        <OptionGroup label="Window style">
          {STYLES.map((s) => (
            <Chip key={s.id} active={style === s.id} onClick={() => setStyle(s.id)}>{s.label}</Chip>
          ))}
        </OptionGroup>

        <OptionGroup label="Frame colour">
          {COLOURS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColour(c)}
              aria-label={`Frame colour: ${c.label}`}
              className={`flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors ${colour.id === c.id ? "border-bronze text-bronze" : "border-line text-white/70 hover:border-white/40"}`}
            >
              <span className="h-4 w-4 rounded-full border border-white/20" style={{ background: c.hex }} />
              {c.label}
            </button>
          ))}
        </OptionGroup>

        <OptionGroup label="Glazing">
          {GLAZING.map((g) => (
            <Chip key={g.id} active={glazing === g.id} onClick={() => setGlazing(g.id)}>{g.label}</Chip>
          ))}
        </OptionGroup>

        <OptionGroup label="Opening type">
          {OPENING.map((o) => (
            <Chip key={o.id} active={opening === o.id} onClick={() => setOpening(o.id)}>{o.label}</Chip>
          ))}
        </OptionGroup>

        <div className="border-t border-line pt-8">
          <p className="text-sm text-white/60">
            Like this combination? Send it with your quote request — we&apos;ll confirm availability and options with you.
          </p>
          <Link
            href={quoteHref}
            className="mt-5 inline-flex h-12 items-center bg-bronze px-7 text-sm font-medium text-ink hover:bg-bronze-soft transition-colors"
          >
            Request a quote for this window
          </Link>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4">{label}</legend>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`border px-4 py-2.5 text-sm transition-colors duration-300 ${active ? "border-bronze text-bronze" : "border-line text-white/70 hover:border-white/40"}`}
    >
      {children}
    </button>
  );
}

/** SVG preview — frame colour, glazing depth and style rendered live. */
function Preview({ style, frame, glazing }: { style: string; frame: string; glazing: string }) {
  const isSliding = style === "sliding";
  const W = isSliding ? 320 : 220;
  const H = 260;
  const x = (400 - W) / 2;
  const y = 20;
  const t = 10;
  const panes = glazing === "triple" ? 3 : 2;

  return (
    <svg viewBox="0 0 400 320" className="mx-auto w-full max-w-md" role="img" aria-label="Window preview">
      {/* wall + sill */}
      <rect x="0" y="0" width="400" height="300" fill="#2a2a28" />
      <rect x={x - 14} y={y - 14} width={W + 28} height={H + 28} fill="#242422" />
      <rect x={x - 18} y={y + H + 10} width={W + 36} height="10" fill="#3a3a36" />

      {/* outer frame */}
      <rect x={x} y={y} width={W} height={H} fill={frame} />
      {/* glass */}
      <rect x={x + t} y={y + t} width={W - 2 * t} height={H - 2 * t} fill="url(#sky)" />

      {/* glazing depth lines (double vs triple) */}
      {Array.from({ length: panes - 1 }).map((_, i) => (
        <rect key={i} x={x + t + 3 + i * 3} y={y + t + 3} width="1.5" height={H - 2 * t - 6} fill="rgba(255,255,255,0.35)" />
      ))}

      {/* style details */}
      {style === "crittall" && (
        <g fill={frame}>
          {[1, 2].map((i) => (
            <rect key={`v${i}`} x={x + (W / 3) * i - 2} y={y + t} width="4" height={H - 2 * t} />
          ))}
          {[1, 2, 3].map((i) => (
            <rect key={`h${i}`} x={x + t} y={y + (H / 4) * i - 2} width={W - 2 * t} height="4" />
          ))}
        </g>
      )}
      {style === "casement" && (
        <g fill={frame}>
          <rect x={x + W / 2 - 3} y={y + t} width="6" height={H - 2 * t} />
          <circle cx={x + W / 2 + 14} cy={y + H / 2} r="3.5" fill="#b08d57" />
        </g>
      )}
      {isSliding && (
        <g>
          <rect x={x + W / 2 - 4} y={y + t} width="8" height={H - 2 * t} fill={frame} />
          <rect x={x + W / 2 + 12} y={y + H / 2 - 16} width="4" height="32" rx="2" fill="#b08d57" />
          <path d={`M ${x + 30} ${y + H + 4} l 26 0 m -8 -5 l 8 5 l -8 5`} stroke="#b08d57" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {/* reflection */}
      <polygon
        points={`${x + t},${y + t} ${x + W * 0.42},${y + t} ${x + t},${y + H * 0.62}`}
        fill="rgba(255,255,255,0.10)"
      />

      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9db4bd" />
          <stop offset="60%" stopColor="#6f8893" />
          <stop offset="100%" stopColor="#4c5a57" />
        </linearGradient>
      </defs>
    </svg>
  );
}
