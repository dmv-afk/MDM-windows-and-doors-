"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/content/services";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";
const MAX_FILES = 4;
const MAX_MB = 8;

export default function QuoteForm() {
  const params = useSearchParams();
  const config = params.get("config");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  function onFiles(list: FileList | null) {
    setFileError("");
    if (!list) return;
    const next = Array.from(list).slice(0, MAX_FILES);
    const tooBig = next.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (tooBig) { setFileError(`Each photo must be under ${MAX_MB}MB.`); return; }
    setFiles(next);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    files.forEach((f) => fd.append("photos", f));
    if (config) fd.set("details", `${fd.get("details") ?? ""}\n\nConfigurator selection: ${config}`.trim());

    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? { form: json.message ?? "Something went wrong. Please try again, or call us directly." });
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrors({ form: "Connection problem. Please try again, or call us directly." });
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-bronze/50 bg-charcoal p-10 text-center">
        <p className="font-display text-3xl">Quote request sent</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65">
          Thank you — your request is on its way to MDM Windows &amp; Doors. We&apos;ll be in touch shortly.
          If it&apos;s urgent, call {""}
          <a href={CONTACT.phoneHref} className="text-bronze underline-offset-4 hover:underline">{CONTACT.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {config && (
        <p className="border border-bronze/40 bg-bronze/10 px-4 py-3 text-sm text-bronze-soft">
          Configurator selection attached: <span className="text-white/85">{config}</span>
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required placeholder="Your full name" />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="08X XXX XXXX" />
          <FieldError>{errors.phone}</FieldError>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          <FieldError>{errors.email}</FieldError>
        </div>
        <div>
          <Label htmlFor="address">Project address</Label>
          <Input id="address" name="address" autoComplete="street-address" required placeholder="Address or area, e.g. Rathfarnham, Dublin 14" />
          <FieldError>{errors.address}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="service">Service required</Label>
        <Select id="service" name="service" required defaultValue="">
          <option value="" disabled>Choose a service…</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Other / not sure">Other / not sure</option>
        </Select>
        <FieldError>{errors.service}</FieldError>
      </div>

      <div>
        <Label htmlFor="details">Project details</Label>
        <Textarea
          id="details" name="details"
          placeholder="Tell us about your project — number of windows or doors, property type, timeframe, anything useful."
        />
      </div>

      <div>
        <Label htmlFor="photos">Photos (optional, up to {MAX_FILES})</Label>
        <input
          id="photos" type="file" accept="image/*" multiple
          onChange={(e) => onFiles(e.target.files)}
          className="block w-full cursor-pointer border border-dashed border-line px-4 py-6 text-sm text-white/50 file:mr-4 file:border-0 file:bg-bronze file:px-4 file:py-2 file:text-ink file:text-sm hover:border-bronze/60 transition-colors"
        />
        {files.length > 0 && (
          <p className="mt-2 text-xs text-white/50">{files.map((f) => f.name).join(" · ")}</p>
        )}
        <FieldError>{fileError}</FieldError>
      </div>

      {/* Honeypot — invisible to humans, irresistible to bots */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* GDPR consent (required for Irish/EU forms) */}
      <label className="flex items-start gap-3 text-sm text-white/65 cursor-pointer">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#b08d57]" />
        <span>
          I consent to MDM Windows &amp; Doors storing the details in this form to respond to my enquiry,
          as described in the <a href="/privacy-policy" className="text-bronze underline-offset-4 hover:underline">Privacy Policy</a>.
        </span>
      </label>
      <FieldError>{errors.consent}</FieldError>

      {errors.form && <p className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errors.form}</p>}

      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Get My Free Quote"}
      </Button>
    </form>
  );
}
