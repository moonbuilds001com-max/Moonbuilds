import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
        Error 404
      </p>
      <h1 className="mt-6 font-display text-6xl font-bold tracking-tight text-cream md:text-8xl">
        Lost in orbit.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
        This page doesn&apos;t exist — it may have moved, or the address might
        be slightly off.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp us
        </a>
      </div>
    </main>
  );
}
