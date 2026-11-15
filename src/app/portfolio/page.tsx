import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Prime Springs, Kitefold, Dustline 300 and Future Objects — MOONBUILDS concept and demonstration projects showing how we design, engineer and tell stories on the web.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <main className="bg-ink">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
            04 — Portfolio
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-6xl">
            Work that shows how we think.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            Four concept and demonstration projects — self-initiated work we
            built to explore the kind of design and engineering we do. Every
            project is clearly labelled as concept work: no invented clients, no
            invented outcomes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 90}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border border-cream/10 bg-charcoal transition-colors hover:border-ember/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.coverAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream backdrop-blur">
                    {project.statusLabel}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                      {project.category}
                    </p>
                    <p className="font-mono text-[11px] text-stone">
                      {project.year}
                    </p>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-cream md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream/70">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                    View project
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-cream/10 bg-ink/60 p-7 md:p-8">
            <h2 className="font-display text-xl font-bold text-cream md:text-2xl">
              What could we build for you?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream/70 md:text-base">
              These concepts show the standard, not the limit. Your project gets
              its own thinking.
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
