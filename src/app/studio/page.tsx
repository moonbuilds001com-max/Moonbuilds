import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { PROCESS_STEPS } from "@/lib/process";
import { SITE } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Studio",
  description:
    "About MOONBUILDS: an independent digital design and development agency in Nairobi, Kenya — who we are, how we work, and what you can expect from us.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <main className="bg-ink">
      {/* Hero */}
      <section className="page-hero">
        <Image
          src="/photos/02-studio.webp"
          alt="A bright creative workspace with a desk and drawings by a window"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-44 md:px-8 md:pb-32 md:pt-56">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
              02 — Studio
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-6xl">
              An independent design and development agency in Nairobi.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              {SITE.supportingLine}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream md:text-4xl">
              Who we are
            </h2>
          </Reveal>
          <div className="space-y-6 text-base leading-relaxed text-cream/80">
            <Reveal delay={60}>
              <p>
                MOONBUILDS is an independent digital design and development
                agency based in Nairobi, Kenya. We are deliberately small and
                deliberately senior: every project is handled by the people who
                actually design and build it, and we take on a limited number of
                engagements at a time so each one gets real attention.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                We work across the full range of what a modern website can be —
                from a company&apos;s first serious website to e-commerce stores
                and interactive 3D experiences — and we hold all of that work to
                the same standard: distinctive design, clean engineering, honest
                communication.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                We don&apos;t publish client logos, awards or years-of-experience
                claims we can&apos;t verify. We label our portfolio honestly and
                we&apos;d rather show you how we think and build than list logos.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-cream/10 bg-charcoal">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream md:text-4xl">
              How we work
            </h2>
            <p className="mt-4 max-w-2xl text-cream/80">
              Five stages, always in the open. You always know what stage your
              project is in and what happens next.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.index} delay={i * 70}>
                <li className="h-full rounded-2xl border border-cream/10 bg-ink/60 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                    {step.index}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {step.summary.split(".")[0]}.
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <Link
              href="/process"
              className="mt-10 inline-flex min-h-11 items-center rounded-full border border-cream/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Read the full process
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What you can expect */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream md:text-4xl">
              What you can expect
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                title: "Straight answers",
                body: "Scopes, timelines and prices stated in plain language before work starts — and kept up to date as things change.",
              },
              {
                title: "One point of contact",
                body: "The person you talk to is the person doing the work. No account-manager relay with information lost in between.",
              },
              {
                title: "Work you can inspect",
                body: "Design previews and a staging link from the first week, so you never wait weeks to see progress.",
              },
              {
                title: "Care after launch",
                body: "We stay available after go-live: updates, fixes, content changes and honest advice about what's worth doing next.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-cream/10 bg-ink/60 p-6">
                  <h3 className="font-display text-lg font-bold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-cream md:text-5xl">
              Working on something ambitious?
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-full bg-ember px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
              >
                Start a project enquiry
              </Link>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/25 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
