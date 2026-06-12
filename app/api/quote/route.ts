import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { quoteSchema } from "@/lib/validation";
import { CONTACT } from "@/lib/constants";

export const runtime = "nodejs";

/* ── Rate limiting ────────────────────────────────────────────────
   In-memory sliding window: 5 requests / 10 min per IP.
   Note: on serverless platforms (Vercel) memory is per-instance, so this
   is a soft limit — combined with the honeypot it stops casual abuse.
   For hard guarantees swap in Upstash Redis (see README).               */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQ = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // memory guard
  return arr.length > MAX_REQ;
}

const MAX_FILES = 4;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please wait a few minutes and try again, or call us directly." },
      { status: 429 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  // ── Honeypot: silently accept and discard bot submissions ──
  if ((form.get("company") as string | null)?.length) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse({
    name: form.get("name"),
    phone: form.get("phone"),
    email: form.get("email"),
    address: form.get("address"),
    service: form.get("service"),
    details: form.get("details") ?? "",
    consent: form.get("consent"),
    company: form.get("company") ?? "",
    source: form.get("source") ?? "quote-form",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0] ?? "form")] = issue.message;
    }
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ── Photo attachments ──
  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (photos.length > MAX_FILES) {
    return NextResponse.json({ errors: { form: `Maximum ${MAX_FILES} photos.` } }, { status: 422 });
  }
  for (const p of photos) {
    if (p.size > MAX_FILE_BYTES) {
      return NextResponse.json({ errors: { form: "Each photo must be under 8MB." } }, { status: 422 });
    }
    if (!p.type.startsWith("image/")) {
      return NextResponse.json({ errors: { form: "Only image files can be attached." } }, { status: 422 });
    }
  }

  const attachments = await Promise.all(
    photos.map(async (p) => ({
      filename: p.name || "photo.jpg",
      content: Buffer.from(await p.arrayBuffer()),
      contentType: p.type,
    }))
  );

  const d = parsed.data;
  const subject = `New quote request — ${d.service} — ${d.name}`;
  const text = [
    `New quote request via ${d.source === "quote-assistant" ? "Quote Assistant" : "website quote form"}`,
    ``,
    `Name:    ${d.name}`,
    `Phone:   ${d.phone}`,
    `Email:   ${d.email}`,
    `Address: ${d.address}`,
    `Service: ${d.service}`,
    ``,
    `Details:`,
    d.details || "(none provided)",
    ``,
    `Photos attached: ${attachments.length}`,
    `Consent given: yes`,
  ].join("\n");

  // ── Send via SMTP (Gmail app password — see .env.example) ──
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Email not configured yet — fail loudly in dev so it can't be missed.
    console.error("[quote] SMTP env vars missing — submission NOT emailed:\n" + text);
    return NextResponse.json(
      { message: "Quote system is not configured yet. Please call or email us directly." },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: Number(SMTP_PORT ?? 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"MDM Website" <${SMTP_USER}>`,
      to: QUOTE_TO_EMAIL ?? CONTACT.email,
      replyTo: d.email,
      subject,
      text,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] send failed", err);
    return NextResponse.json(
      { message: "We couldn't send your request just now. Please try again, or call us directly." },
      { status: 502 }
    );
  }
}
