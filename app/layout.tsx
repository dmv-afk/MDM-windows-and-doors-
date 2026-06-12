import type { Metadata, Viewport } from "next";
import { Marcellus, Figtree } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { localBusinessJsonLd } from "@/lib/seo";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyActions from "@/components/layout/StickyActions";
import QuoteAssistant from "@/components/quote/QuoteAssistant";

const display = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Window Installation Dublin | Idealcombi Windows`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Window Installation Dublin",
    "Window Fitters Dublin",
    "Door Installation Ireland",
    "Idealcombi Windows",
    "Triple Glazed Windows",
    "Energy Efficient Windows",
  ],
  openGraph: {
    siteName: SITE.name,
    locale: "en_IE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyActions />
          <QuoteAssistant />
        </SmoothScroll>
      </body>
    </html>
  );
}
