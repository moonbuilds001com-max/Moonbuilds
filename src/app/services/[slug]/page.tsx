import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, getService } from "@/lib/services";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.short,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="bg-ink">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-stone transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All services
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
            Service {service.index} / 07
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            {service.short}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <section aria-labelledby="what">
                <h2
                  id="what"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone"
                >
                  What it is
                </h2>
                <p className="mt-4 text-base leading-relaxed text-cream/80 md:text-lg">
                  {service.description}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="includes">
                <h2
                  id="includes"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone"
                >
                  What&apos;s included
                </h2>
                <ul className="mt-4 space-y-3">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-cream/10 bg-charcoal px-5 py-4"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-cream/85 md:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="who">
                <h2
                  id="who"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone"
                >
                  Who it helps
                </h2>
                <p className="mt-4 rounded-xl border border-cream/10 bg-charcoal px-5 py-4 text-sm leading-relaxed text-cream/85 md:text-base">
                  {service.who}
                </p>
              </section>
            </Reveal>
          </div>

          {/* Enquiry rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-2xl border border-cream/15 bg-charcoal p-7">
                <h2 className="font-display text-xl font-bold text-cream md:text-2xl">
                  How to enquire
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  Send us a short note about your business and what this website
                  needs to do. We reply with honest advice, a clear scope and a
                  quote — usually within one working day.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
                  >
                    Start a project enquiry
                  </Link>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp {SITE.whatsappDisplay}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <nav aria-label="Other services" className="mt-8">
                <h2 className="label">Other services</h2>
                <ul className="mt-3 space-y-2">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between rounded-lg border border-cream/10 px-4 py-3 text-sm text-cream/80 transition-colors hover:border-ember/60 hover:text-cream"
                      >
                        {s.title}
                        <span className="font-mono text-[10px] text-stone">
                          {s.index}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/services"
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-ember hover:underline"
                    >
                      View all seven
                    </Link>
                  </li>
                </ul>
              </nav>
            </Reveal>
          </aside>
        </div>
      </section>
    </main>
  );
}
