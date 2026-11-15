import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Seven services, one team: website design, development, e-commerce, interactive 3D web experiences, redesigns, digital brand experiences and ongoing support.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-ink">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
            03 — Services
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-6xl">
            Design and development, end to end.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            Seven services that cover the whole life of a website — designed,
            built and supported by the same team, with no hand-offs. Choose a
            service to see what&apos;s included, who it helps and how to enquire.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-charcoal p-7 transition-colors hover:border-ember/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone">
                    {service.index}
                  </p>
                  <ArrowRight
                    className="h-5 w-5 text-stone transition-all group-hover:translate-x-1 group-hover:text-ember"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-cream md:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70 md:text-base">
                  {service.short}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-cream/10 bg-ink/60 p-7 md:p-8">
            <h2 className="font-display text-xl font-bold text-cream md:text-2xl">
              Not sure which you need?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream/70 md:text-base">
              Most projects mix services. Tell us what you&apos;re trying to
              achieve and we&apos;ll recommend the smallest set that does the job.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ember px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
            >
              Start a project enquiry
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
