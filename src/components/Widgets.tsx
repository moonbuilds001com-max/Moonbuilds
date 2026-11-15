"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Persistent WhatsApp shortcut. Hidden until the visitor scrolls
 * past the hero so it never competes with the primary CTAs.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with MOONBUILDS on WhatsApp, ${SITE.whatsappDisplay}`}
        className={`fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember text-ink shadow-lg shadow-ember/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cream ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </>
  );
}

/**
 * Consent banner shown only when analytics is configured
 * (NEXT_PUBLIC_GA_ID). Nothing loads before consent.
 */
export function ConsentBanner() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [choice, setChoice] = useState<"pending" | "granted" | "denied">(
    "pending"
  );

  useEffect(() => {
    if (!gaId) return;
    const stored = window.localStorage.getItem("mb-analytics-consent");
    if (stored === "granted" || stored === "denied") setChoice(stored);
  }, [gaId]);

  useEffect(() => {
    if (!gaId || choice !== "granted") return;
    // Load GA only after explicit consent
    const s = document.createElement("script");
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    s.async = true;
    document.head.appendChild(s);
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };
    w.gtag("js", new Date());
    w.gtag("config", gaId, { anonymize_ip: true });
  }, [gaId, choice]);

  if (!gaId || choice !== "pending") return null;

  const decide = (value: "granted" | "denied") => {
    window.localStorage.setItem("mb-analytics-consent", value);
    setChoice(value);
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-cream/15 bg-ink/95 p-5 backdrop-blur-xl md:inset-x-8"
    >
      <p className="text-sm leading-relaxed text-cream/80">
        We use privacy-friendly analytics to understand which pages help
        visitors most. Nothing loads until you agree.{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-ember">
          Privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="min-h-11 rounded-full bg-ember px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="min-h-11 rounded-full border border-cream/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
