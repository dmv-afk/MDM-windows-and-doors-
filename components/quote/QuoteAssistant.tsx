"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

/**
 * Quote Assistant — a structured guided flow (approved strategy: no free-text
 * LLM chat → instant, accurate, zero API cost, higher completion).
 * Collects the brief step-by-step, then submits to the same /api/quote system.
 */
type StepId = "projectType" | "products" | "quantity" | "propertyType" | "location" | "contactPref" | "photos" | "contact" | "summary";

const STEPS: { id: StepId; q: string; options?: string[]; multi?: boolean }[] = [
  { id: "projectType", q: "What kind of project is it?", options: ["New build", "Renovation / extension", "Replacement windows or doors", "Commercial"] },
  { id: "products", q: "What do you need?", options: ["Windows", "Doors", "Sliding doors", "Windows & doors"], multi: false },
  { id: "quantity", q: "Roughly how many units?", options: ["1–3", "4–8", "9–15", "16+", "Not sure yet"] },
  { id: "propertyType", q: "What type of property?", options: ["House", "Apartment", "Extension", "Commercial building"] },
  { id: "location", q: "Where is the project?" },
  { id: "contactPref", q: "How should we contact you?", options: ["Phone call", "WhatsApp", "Email"] },
  { id: "photos", q: "Add photos? (optional)" },
  { id: "contact", q: "Your contact details" },
  { id: "summary", q: "Review your request" },
];

export default function QuoteAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function pick(value: string) {
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  const summary = useMemo(
    () =>
      [
        `Project type: ${answers.projectType ?? "—"}`,
        `Products: ${answers.products ?? "—"}`,
        `Quantity: ${answers.quantity ?? "—"}`,
        `Property: ${answers.propertyType ?? "—"}`,
        `Location: ${answers.location ?? "—"}`,
        `Preferred contact: ${answers.contactPref ?? "—"}`,
      ].join("\n"),
    [answers]
  );

  async function submit() {
    setStatus("sending");
    const fd = new FormData();
    fd.set("name", contact.name);
    fd.set("phone", contact.phone);
    fd.set("email", contact.email);
    fd.set("address", answers.location ?? "");
    fd.set("service", answers.products ?? "Quote assistant enquiry");
    fd.set("details", summary);
    fd.set("consent", consent ? "on" : "");
    fd.set("source", "quote-assistant");
    files.slice(0, 4).forEach((f) => fd.append("photos", f));
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  // Avoid stacking on top of the dedicated quote page (after all hooks — keeps hook order stable)
  if (pathname === "/quote") return null;

  const canSubmit =
    contact.name.length > 1 && contact.phone.length > 6 && /\S+@\S+\.\S+/.test(contact.email) && consent;

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 z-40 lg:bottom-8 lg:left-8 flex items-center gap-3 border border-bronze/60 bg-charcoal/90 px-5 py-3.5 text-sm backdrop-blur-md shadow-xl hover:border-bronze transition-colors"
        aria-haspopup="dialog"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
        </span>
        Quote Assistant
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label="Quote assistant"
              className="w-full max-w-lg border border-line bg-charcoal shadow-2xl"
              initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <p className="eyebrow">Quote Assistant</p>
                <button onClick={() => setOpen(false)} aria-label="Close assistant" className="h-9 w-9 text-xl text-white/60 hover:text-bronze">×</button>
              </div>
              <div className="h-px bg-line">
                <div className="h-px bg-bronze transition-all duration-500 ease-luxe" style={{ width: `${progress}%` }} />
              </div>

              <div className="max-h-[70svh] overflow-y-auto px-6 py-7">
                {status === "sent" ? (
                  <div className="py-8 text-center">
                    <p className="font-display text-2xl">Request sent</p>
                    <p className="mx-auto mt-3 max-w-sm text-sm text-white/65">
                      Thank you — we&apos;ll be in touch. For anything urgent, call{" "}
                      <a href={CONTACT.phoneHref} className="text-bronze">{CONTACT.phoneDisplay}</a>.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-display text-xl md:text-2xl">{current.q}</p>

                      {/* Option steps */}
                      {current.options && (
                        <div className="mt-6 grid gap-2.5">
                          {current.options.map((o) => (
                            <button
                              key={o} onClick={() => pick(o)}
                              className={`border px-4 py-3.5 text-left text-sm transition-colors ${answers[current.id] === o ? "border-bronze text-bronze" : "border-line text-white/80 hover:border-white/40"}`}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Location free text */}
                      {current.id === "location" && (
                        <div className="mt-6">
                          <input
                            autoFocus
                            placeholder="e.g. Clontarf, Dublin 3"
                            className="w-full border border-line bg-transparent px-4 py-3.5 text-sm focus:border-bronze transition-colors"
                            onKeyDown={(e) => {
                              const v = (e.target as HTMLInputElement).value.trim();
                              if (e.key === "Enter" && v) pick(v);
                            }}
                          />
                          <p className="mt-2 text-xs text-white/40">Press Enter to continue</p>
                        </div>
                      )}

                      {/* Photos step */}
                      {current.id === "photos" && (
                        <div className="mt-6 space-y-4">
                          <input
                            type="file" accept="image/*" multiple
                            onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 4))}
                            className="block w-full cursor-pointer border border-dashed border-line px-4 py-5 text-sm text-white/50 file:mr-4 file:border-0 file:bg-bronze file:px-4 file:py-2 file:text-ink"
                          />
                          {files.length > 0 && <p className="text-xs text-white/50">{files.length} photo(s) attached</p>}
                          <button onClick={() => setStep((s) => s + 1)} className="text-sm text-bronze hover:text-bronze-soft">
                            {files.length ? "Continue →" : "Skip this step →"}
                          </button>
                        </div>
                      )}

                      {/* Contact details step */}
                      {current.id === "contact" && (
                        <div className="mt-6 space-y-3">
                          {(["name", "phone", "email"] as const).map((k) => (
                            <input
                              key={k}
                              type={k === "email" ? "email" : k === "phone" ? "tel" : "text"}
                              placeholder={k === "name" ? "Full name" : k === "phone" ? "Phone number" : "Email address"}
                              value={contact[k]}
                              onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
                              className="w-full border border-line bg-transparent px-4 py-3.5 text-sm focus:border-bronze transition-colors"
                            />
                          ))}
                          <button
                            onClick={() => setStep((s) => s + 1)}
                            disabled={!(contact.name && contact.phone && contact.email)}
                            className="mt-2 bg-bronze px-6 py-3 text-sm font-medium text-ink disabled:opacity-40"
                          >
                            Review request →
                          </button>
                        </div>
                      )}

                      {/* Summary step */}
                      {current.id === "summary" && (
                        <div className="mt-6 space-y-5">
                          <pre className="whitespace-pre-wrap border border-line bg-ink/50 p-4 text-xs leading-relaxed text-white/75">
{summary}
{"\n"}Photos: {files.length || "none"}
{"\n"}Name: {contact.name} · {contact.phone} · {contact.email}
                          </pre>
                          <label className="flex items-start gap-3 text-xs text-white/60 cursor-pointer">
                            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#b08d57]" />
                            <span>I consent to MDM Windows &amp; Doors storing these details to respond to my enquiry (see <a href="/privacy-policy" className="text-bronze">Privacy Policy</a>).</span>
                          </label>
                          {status === "error" && (
                            <p className="text-xs text-red-300">Couldn&apos;t send — please try again or call {CONTACT.phoneDisplay}.</p>
                          )}
                          <button
                            onClick={submit}
                            disabled={!canSubmit || status === "sending"}
                            className="w-full bg-bronze py-3.5 text-sm font-semibold text-ink hover:bg-bronze-soft disabled:opacity-40 transition-colors"
                          >
                            {status === "sending" ? "Sending…" : "Send my quote request"}
                          </button>
                        </div>
                      )}

                      {/* Back control */}
                      {step > 0 && status !== "sending" && (
                        <button onClick={() => setStep((s) => s - 1)} className="mt-7 text-xs text-white/40 hover:text-white/70">
                          ← Back
                        </button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
