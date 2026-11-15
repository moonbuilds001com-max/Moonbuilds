import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PROCESS_STEPS } from "@/lib/process";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Process",
  description:
    "How MOONBUILDS works: discovery, strategy and design, development, testing, then launch and support. Five stages, always in the open.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <main className="bg-ink">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
            05 — Process
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-6xl">
            Five steps, no mysteries.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            Every project runs through the same five stages. You always know
            what stage you&apos;re in, what we&apos;re doing, and what we need
            from you next.
          </p>
        </Reveal>

        <ol className="mt-16 space-y-5">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 60}>
              <li className="grid gap-6 rounded-2xl border border-cream/10 bg-charcoal p-7 md:grid-cols-[110px_1fr_1fr] md:p-9">
                <p className="font-display text-5xl font-bold text-cream/15 md:text-6xl">
                  {step.index}
                </p>
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-cream md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
                    {step.summary}
                  </p>
                </div>
                <ul className="space-y-2.5 border-cream/10 md:border-l md:pl-8">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-cream/75"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-cream/10 bg-ink/60 p-7 text-center md:p-10">
            <h2 className="mx-auto max-w-xl font-display text-2xl font-bold tracking-tight text-cream md:text-3xl">
              Ready to start at step 01?
            </h2>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ember px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
            >
              Start a project enquiry
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
