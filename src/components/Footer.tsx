import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import { LogoMark } from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { PHOTO_CREDITS } from "@/lib/photos";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/10 bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* Branding */}
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7 text-cream" />
            <span className="font-display text-base font-bold tracking-[0.22em] text-cream">
              MOONBUILDS
            </span>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
            {SITE.supportingLine}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/80 transition-colors hover:text-ember"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-sm text-cream/80 transition-colors hover:text-ember"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-cream/80 transition-colors hover:text-ember"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream/80 transition-colors hover:text-ember"
              >
                <MessageCircle className="h-4 w-4 text-ember" aria-hidden="true" />
                {SITE.whatsappDisplay} (WhatsApp)
              </a>
            </li>
            <li>
              <a
                href={SITE.emailUrl}
                className="text-cream/80 transition-colors hover:text-ember"
              >
                {SITE.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-cream/80">
              <MapPin className="h-4 w-4 text-ember" aria-hidden="true" />
              {SITE.city}
            </li>
          </ul>
        </div>
      </div>

      {/* Photo credits — good practice even though the Pexels Licence does not require it */}
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <p className="text-xs leading-relaxed text-stone">
            Photography:{" "}
            {PHOTO_CREDITS.map((c, i) => (
              <span key={c.file}>
                {i > 0 && ", "}
                <a
                  href={c.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-stone/50 underline-offset-2 transition-colors hover:text-cream"
                >
                  {c.photographer}
                </a>
              </span>
            ))}{" "}
            via Pexels,{" "}
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-stone/50 underline-offset-2 transition-colors hover:text-cream"
            >
              Pexels License
            </a>
            . Full credits in{" "}
            <Link href="/photos/CREDITS.md" className="underline decoration-stone/50 underline-offset-2 transition-colors hover:text-cream">
              /photos/CREDITS.md
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-stone md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} MOONBUILDS. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
