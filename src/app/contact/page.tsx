import type { Metadata } from "next";
import { MapPin, MessageCircle, Mail } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project enquiry with MOONBUILDS — tell us about your business and what the website needs to do. WhatsApp and email channels, Nairobi, Kenya.",
  path: "/contact",
});

export default function ContactPage() {
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL
  );

  return (
    <main className="bg-ink">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                06 — Contact
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-6xl">
                Let&apos;s build yours.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80">
                Tell us about your business and what the website needs to do.
                We reply with honest advice, a clear scope and a quote — usually
                within one working day.
              </p>
            </Reveal>

            {!emailConfigured ? (
              <Reveal delay={80}>
                <p className="mt-8 rounded-xl border border-cream/15 bg-charcoal p-4 text-sm leading-relaxed text-cream/70">
                  <strong className="font-semibold text-cream">
                    A note on email:
                  </strong>{" "}
                  email delivery isn&apos;t set up on this deployment yet. The
                  form still works — you&apos;ll be able to send your enquiry
                  straight to us on WhatsApp with everything pre-filled. Nothing
                  is pretended.
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={140}>
              <ul className="mt-10 space-y-4">
                <li>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 rounded-xl border border-cream/10 bg-charcoal p-5 transition-colors hover:border-ember/60"
                  >
                    <MessageCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-ember"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
                        WhatsApp — fastest
                      </span>
                      <span className="mt-1 block text-cream">
                        {SITE.whatsappDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.emailUrl}
                    className="flex items-start gap-4 rounded-xl border border-cream/10 bg-charcoal p-5 transition-colors hover:border-ember/60"
                  >
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-ember"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
                        Email
                      </span>
                      <span className="mt-1 block break-all text-cream">
                        {SITE.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 rounded-xl border border-cream/10 bg-charcoal p-5">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-ember"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
                      Location
                    </span>
                    <span className="mt-1 block text-cream">{SITE.city}</span>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
