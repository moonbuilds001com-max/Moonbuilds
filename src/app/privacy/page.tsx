import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "How MOONBUILDS handles the information you share through this website: enquiry details, analytics consent, cookies and your choices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="bg-ink">
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
            Privacy
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-cream md:text-5xl">
            How we handle your information
          </h1>
          <p className="mt-4 text-stone">
            Plain language, because privacy policies should be readable. Last
            updated: November 2026.
          </p>
        </Reveal>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-cream/80">
          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-cream">
                What we collect
              </h2>
              <p className="mt-3">
                When you submit the project enquiry form, we receive the details
                you provide: your name, email address, phone number, business
                name, the service you need and your project description. We use
                this only to reply to your enquiry and to prepare a proposal.
              </p>
              <p className="mt-3">
                If you contact us on WhatsApp, that conversation is governed by
                WhatsApp&apos;s own terms in addition to this policy.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-cream">
                What we don&apos;t do
              </h2>
              <p className="mt-3">
                We don&apos;t sell your information. We don&apos;t share it with
                third parties for marketing. We don&apos;t add you to a mailing
                list unless you ask us to.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-cream">
                Analytics and consent
              </h2>
              <p className="mt-3">
                If analytics is enabled on this site, nothing is measured until
                you press &ldquo;Allow&rdquo; in the consent banner. You can
                change your mind by clearing this site&apos;s storage in your
                browser. If analytics is not enabled, nothing is measured at
                all.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-cream">
                Cookies
              </h2>
              <p className="mt-3">
                This website stores only one item in your browser&apos;s local
                storage: your analytics consent choice. No advertising or
                tracking cookies are set.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-cream">
                Your data, your call
              </h2>
              <p className="mt-3">
                You can ask us at any time to confirm what we hold about you,
                correct it, or delete it. Write to{" "}
                <a
                  href="mailto:Moonbuilds001.com@gmail.com"
                  className="text-cream underline underline-offset-4 hover:text-ember"
                >
                  Moonbuilds001.com@gmail.com
                </a>{" "}
                or message{" "}
                <a
                  href="https://wa.me/254103732569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream underline underline-offset-4 hover:text-ember"
                >
                  +254 103 732 569 on WhatsApp
                </a>
                .
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-cream">
                Server logs and hosting
              </h2>
              <p className="mt-3">
                Like almost every website, our hosting provider keeps standard
                technical logs (such as IP address and request time) for
                security and abuse prevention. Enquiry submissions are
                rate-limited per IP address to stop spam.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-full bg-ember px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
            >
              Questions? Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
