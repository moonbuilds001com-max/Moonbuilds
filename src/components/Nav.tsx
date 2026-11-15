"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          aria-label="MOONBUILDS — home"
          className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-cream/10 bg-ink/70 px-2 py-1.5 backdrop-blur-md lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
                  active
                    ? "bg-cream text-ink"
                    : "text-cream/70 hover:bg-cream/10 hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-ember px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-ink/70 text-cream backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ember lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-lg lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-center gap-2 px-8"
        >
          {NAV_LINKS.map((link, i) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b border-cream/10 py-4 font-display text-3xl font-bold tracking-tight transition-colors ${
                  active ? "text-ember" : "text-cream hover:text-ember"
                }`}
              >
                <span className="mr-4 font-mono text-xs text-stone">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            );
          })}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp {SITE.whatsappDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
