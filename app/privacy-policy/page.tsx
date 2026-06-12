import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How MDM Windows & Doors handles personal information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <section className="pt-28 md:pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-4 text-4xl md:text-5xl">Privacy Policy</h1>

        <div className="mt-12 space-y-10 text-sm md:text-base leading-relaxed text-white/80">
          <div>
            <h2 className="font-display text-xl text-white">Who we are</h2>
            <p className="mt-3">
              {SITE.name}, serving {SITE.area}. Contact: {CONTACT.email} / {CONTACT.phoneDisplay}.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">What we collect and why</h2>
            <p className="mt-3">
              When you submit the quote form or quote assistant, we collect your name, phone number, email
              address, project address, project details and any photos you attach. We use this information
              solely to respond to your enquiry and prepare your quotation. The legal basis is your consent,
              given via the checkbox on the form, and our legitimate interest in responding to enquiries.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Where it goes</h2>
            <p className="mt-3">
              Submissions are delivered by email to {CONTACT.email}. We do not sell your information or share
              it with third parties for marketing.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Retention</h2>
            <p className="mt-3">
              We keep enquiry details only for as long as needed to handle your enquiry and any work that
              follows from it. You can ask us to delete your details at any time.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Your rights</h2>
            <p className="mt-3">
              Under the GDPR you may request access to, correction of, or deletion of your personal data at
              any time by contacting {CONTACT.email}. You may also lodge a complaint with the Data Protection
              Commission (dataprotection.ie).
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Cookies</h2>
            <p className="mt-3">This website does not set marketing or analytics cookies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
