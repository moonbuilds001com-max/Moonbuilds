import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle, Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS, getProject } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.statusLabel}`,
    description: project.description,
    path: `/portfolio/${project.slug}`,
    image: project.cover,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main className="bg-ink">
      {/* Cover */}
      <section className="page-hero">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-44 md:px-8 md:pb-28 md:pt-56">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All projects
            </Link>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-cream md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 inline-flex rounded-full border border-cream/20 bg-ink/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream backdrop-blur">
              {project.statusLabel}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 md:px-8 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-14">
            <Reveal>
              <section aria-labelledby="overview">
                <h2 id="overview" className="label">
                  Overview
                </h2>
                <p className="mt-4 text-base leading-relaxed text-cream/85 md:text-lg">
                  {project.description}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="challenge">
                <h2 id="challenge" className="label">
                  The challenge we set ourselves
                </h2>
                <p className="mt-4 text-base leading-relaxed text-cream/85 md:text-lg">
                  {project.challenge}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="direction">
                <h2 id="direction" className="label">
                  Creative direction
                </h2>
                <p className="mt-4 text-base leading-relaxed text-cream/85 md:text-lg">
                  {project.direction}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="features">
                <h2 id="features" className="label">
                  Features in this concept
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 rounded-xl border border-cream/10 bg-charcoal px-5 py-4"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-cream/85 md:text-base">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-2xl border border-cream/15 bg-charcoal p-7">
                <h2 className="font-display text-lg font-bold text-cream">
                  Concept, honestly labelled
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  This is MOONBUILDS concept and demonstration work — built by
                  us to show our approach. It has no client, no live site and no
                  outcome claims, because none of those things exist to claim.
                </p>
                {project.outcome ? (
                  <p className="mt-4 rounded-xl border border-ember/40 bg-ember/10 p-4 text-sm text-cream">
                    <strong className="font-semibold">Verified outcome:</strong>{" "}
                    {project.outcome}
                  </p>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl border border-cream/10 bg-charcoal p-7">
                <h2 className="label">Demonstrated stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-cream/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/80"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-2xl border border-cream/15 bg-charcoal p-7">
                <h2 className="font-display text-lg font-bold text-cream">
                  Want work like this?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  Tell us what you&apos;re building. We&apos;ll reply with honest
                  advice and a clear scope.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-ember px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
                  >
                    Start a project enquiry
                  </Link>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp us
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Next project */}
        <Reveal>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group mt-20 flex items-center justify-between gap-6 rounded-2xl border border-cream/10 bg-charcoal p-7 transition-colors hover:border-ember/60 md:p-8"
          >
            <div>
              <p className="label">Next project</p>
              <p className="mt-2 font-display text-2xl font-bold tracking-tight text-cream md:text-3xl">
                {next.title}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                {next.category}
              </p>
            </div>
            <ArrowRight
              className="h-6 w-6 shrink-0 text-stone transition-all group-hover:translate-x-1 group-hover:text-ember"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
