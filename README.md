# MDM Windows & Doors — Luxury Web Application

Premium, conversion-focused website for **MDM Windows & Doors** (Idealcombi Futura+ installer, Dublin & surrounding areas).

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP ScrollTrigger · Lenis · React Three Fiber**.

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local   # then fill in SMTP values (see §3)
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## 2. Project map

| Area | Where |
|---|---|
| Brand constants (phone, email, Instagram, domain) | `lib/constants.ts` |
| Service copy | `content/services.ts` |
| Gallery images | `content/gallery.ts` + `public/images/projects/` |
| Signature hero (scroll-driven window opening) | `components/home/Hero.tsx` |
| 3D window viewer (desktop, capability-gated) | `components/three/` |
| Window configurator (SVG live preview) | `components/configurator/` |
| Quote form + floating Quote Assistant | `components/quote/` |
| Quote email API (honeypot + rate limit) | `app/api/quote/route.ts` |
| SEO: metadata, OG, JSON-LD, sitemap, robots | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` |

All unverified business content is marked **"Content to be supplied by MDM Windows & Doors."**
Search the codebase for that phrase to find every slot to fill before launch.

## 3. Quote form email delivery (Gmail)

1. Sign in to the Google account for **winfitters@gmail.com**.
2. Enable **2-Step Verification** → create an **App password** (Google Account → Security → App passwords).
3. Put it in `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=winfitters@gmail.com
SMTP_PASS=xxxxxxxxxxxxxxxx
QUOTE_TO_EMAIL=winfitters@gmail.com
```

Submissions (incl. photo attachments, max 4 × 8MB) arrive by email with the customer set as Reply-To.

**Spam protection:** hidden honeypot field + in-memory rate limit (5 req / 10 min / IP).
On serverless hosting the rate limit is per-instance (soft). For a hard limit, swap in
Upstash Redis rate limiting inside `app/api/quote/route.ts` — the function is isolated and commented.

## 4. Deployment (Vercel — recommended)

1. Push the repository to GitHub.
2. Import into [vercel.com](https://vercel.com) → framework auto-detected (Next.js).
3. Add the environment variables from §3 plus:
   `NEXT_PUBLIC_SITE_URL=https://your-final-domain.ie`
4. Deploy. Connect the custom domain in Vercel → update `NEXT_PUBLIC_SITE_URL` → redeploy.

Any Node 18+ host (Netlify, Railway, a VPS with `npm run build && npm start`) also works.

## 5. Performance strategy (Lighthouse 90+ mobile / 95+ desktop)

- Hero "window opening" sequence is pure transform/opacity layers — no WebGL — so the identical
  cinematic scroll plays at 60fps on mobile.
- WebGL (R3F window viewer) loads **only** on pointer-fine, ≥1024px, motion-OK, ≥4-core devices,
  with a crafted static fallback elsewhere.
- `next/image` everywhere (AVIF/WebP, responsive sizes, lazy below the fold; hero image priority).
- Fonts via `next/font` (self-hosted, `display: swap`); zero third-party scripts.
- Instagram is a styled link-out tile, not an embedded feed.
- `prefers-reduced-motion` collapses all animation site-wide.

> Tip: keep new gallery uploads ≤ 2560px on the long edge before adding to `public/images/projects/`.

## 6. Before launch — checklist

- [ ] Replace placeholder domain in `.env` / Vercel env
- [ ] Fill every "Content to be supplied…" slot (About, accreditations, legal pages, footer reg. details)
- [ ] Confirm Privacy Policy & Terms with a legal adviser (GDPR)
- [ ] Add real favicon/logo files if a brand mark is created (`app/icon.png`)
- [ ] Test the quote form end-to-end with real SMTP credentials
- [ ] Add more project photography to `content/gallery.ts`
