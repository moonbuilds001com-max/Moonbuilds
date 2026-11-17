"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATIONS, type Station } from "@/lib/stations";

/** Procedural gallery, loaded only when a photo fails to load. */
const FallbackScene = dynamic(() => import("./FallbackScene"), { ssr: false });

function Plate({
  station,
  active,
  useMobileImage,
}: {
  station: Station;
  active: boolean;
  useMobileImage?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`scene-plate absolute inset-0 transition-opacity duration-100 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      data-station={station.id}
    >
      <div className="scene-plate-parallax absolute inset-[-24px]">
        {failed ? (
          <FallbackScene stationId={station.id} />
        ) : (
          <Image
            src={useMobileImage ? station.mobileImage : station.image}
            alt={station.imageAlt}
            fill
            loading="eager"
            priority={station.id === "home"}
            sizes="100vw"
            className="scene-plate-img object-cover"
            onError={() => setFailed(true)}
          />
        )}
        {/* Legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/40" />
      </div>
    </div>
  );
}

function StationCard({ station }: { station: Station }) {
  return (
    <div
      className="scene-card pointer-events-none absolute inset-0 flex items-center px-5 md:items-end md:px-0"
      data-card={station.id}
      // Keeps the card inside the *visible* screen: the scene is sized to
      // 100lvh (largest viewport), so when the address bar is shown the
      // visible area is smaller by (100lvh - 100dvh). Padding by that
      // amount keeps a centred card centred and a bottom card tappable.
      style={{ paddingBottom: "calc(100lvh - 100dvh)" }}
    >
      <div className="scene-card-inner pointer-events-auto w-full max-w-xl rounded-2xl border border-cream/10 bg-ink/85 p-6 shadow-2xl shadow-ink/60 backdrop-blur-xl md:mb-24 md:ml-12 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
          {station.label}
        </p>
        {station.id === "home" ? (
          <h1
            className="mt-4 font-display font-bold tracking-tight text-cream whitespace-pre-line text-4xl leading-[1.02] md:text-6xl"
          >
            {station.heading}
          </h1>
        ) : (
          <h2
            className="mt-4 font-display font-bold tracking-tight text-cream whitespace-pre-line text-3xl leading-[1.05] md:text-5xl"
          >
            {station.heading}
          </h2>
        )}
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/95 md:text-base">
          {station.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={station.primary.href}
            className="inline-flex min-h-11 items-center rounded-full bg-ember px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            {station.primary.label}
          </Link>
          {station.secondary.href.startsWith("http") ? (
            <a
              href={station.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              {station.secondary.label}
            </a>
          ) : (
            <Link
              href={station.secondary.href}
              className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              {station.secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** Static stacked layout for mobile and reduced-motion visitors. */
function StationStack() {
  return (
    <div>
      {STATIONS.map((station, i) => (
        <section
          key={station.id}
          id={station.id}
          className="relative min-h-[92svh] border-b border-cream/5"
        >
          <Image
            src={station.mobileImage}
            alt={station.imageAlt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${station.imageAlt ? "" : "sr-only"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/40" />
          <div className="relative flex min-h-[92svh] items-end px-5 pb-16 pt-28">
            <div className="w-full max-w-xl rounded-2xl border border-cream/10 bg-ink/85 p-6 shadow-2xl shadow-ink/60 backdrop-blur-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                {station.label}
              </p>
              {station.id === "home" ? (
                <h1 className="mt-3 whitespace-pre-line font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream">
                  {station.heading}
                </h1>
              ) : (
                <h2 className="mt-3 whitespace-pre-line font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream">
                  {station.heading}
                </h2>
              )}
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                {station.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={station.primary.href}
                  className="inline-flex min-h-11 items-center rounded-full bg-ember px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
                >
                  {station.primary.label}
                </Link>
                {station.secondary.href.startsWith("http") ? (
                  <a
                    href={station.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
                  >
                    {station.secondary.label}
                  </a>
                ) : (
                  <Link
                    href={station.secondary.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
                  >
                    {station.secondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * The walk-through: a pinned, scroll-scrubbed cross-fade between
 * full-screen photo plates with a slow push-in, pointer-responsive
 * depth parallax, vignette and film grain. Falls back to a stacked
 * layout when reduced motion is requested.
 */
export function SceneWalk() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stacked, setStacked] = useState(true);
  const [narrow, setNarrow] = useState(true);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const decide = () => {
      setStacked(mqReduce.matches);
      setNarrow(mqMobile.matches);
    };
    decide();
    mqReduce.addEventListener("change", decide);
    mqMobile.addEventListener("change", decide);
    return () => {
      mqReduce.removeEventListener("change", decide);
      mqMobile.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (stacked) return;
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const plates = root.querySelectorAll<HTMLElement>(".scene-plate");
    const cards = root.querySelectorAll<HTMLElement>(".scene-card");
    const labels = root.querySelectorAll<HTMLElement>(".scene-rail-label");
    const count = STATIONS.length;
    const hold = 0.55; // portion of each station's span spent fully on it

    // Initial states
    gsap.set(plates[0], { opacity: 1, scale: 1.12, transformOrigin: "50% 60%" });
    for (let i = 1; i < plates.length; i++) {
      gsap.set(plates[i], { opacity: 0, scale: 1.12 });
    }
    gsap.set(cards, { autoAlpha: 0, yPercent: 12 });
    gsap.set(cards[0], { autoAlpha: 1, yPercent: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${(count - 1) * 100}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            count - 1,
            Math.floor(self.progress * count * (1 / (1 / count)) + 0.0001)
          );
          labels.forEach((l, i) => {
            l.classList.toggle("is-active", i === idx);
          });
        },
      },
    });

    for (let i = 1; i < count; i++) {
      const at = (i - 1) + (1 - hold); // position in timeline units
      // Cross-fade plates
      tl.to(plates[i - 1], { opacity: 0, duration: 0.4, ease: "none" }, at);
      tl.to(
        plates[i],
        { opacity: 1, duration: 0.4, ease: "none" },
        at
      );
      // Slow push-in on the incoming plate across its full window
      tl.to(
        plates[i],
        { scale: 1.0, duration: hold + 0.4, ease: "none" },
        at
      );
      // Cards
      tl.to(cards[i - 1], { autoAlpha: 0, yPercent: -8, duration: 0.25 }, at);
      tl.fromTo(
        cards[i],
        { autoAlpha: 0, yPercent: 12 },
        { autoAlpha: 1, yPercent: 0, duration: 0.35 },
        at + 0.15
      );
    }
    // Hold the last station slightly longer by padding the timeline
    tl.to({}, { duration: 0.15 });

    // Pointer-responsive depth parallax (plates drift one way, cards the other)
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      root.style.setProperty("--px", nx.toFixed(3));
      root.style.setProperty("--py", ny.toFixed(3));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Recalculate once images are in
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointermove", onMove);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [stacked]);

  if (stacked) return <StationStack />;

  return (
    <div
      ref={rootRef}
      className="scene relative h-[100svh] overflow-hidden bg-ink"
      // 100lvh = largest possible viewport, so the pinned scene is never
      // shorter than the visible screen (no black band when the phone
      // browser's address bar toggles). svh is the fallback for browsers
      // without lvh. The card wrapper compensates for the difference so
      // nothing important hides behind the address bar.
      style={{ height: "100lvh", ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {STATIONS.map((station) => (
        <Plate key={station.id} station={station} active={false} useMobileImage={narrow} />
      ))}
      {STATIONS.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}

      {/* Station rail */}
      <nav
        aria-label="Walk stations"
        className="scene-rail absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {STATIONS.map((s, i) => (
          <span
            key={s.id}
            className={`scene-rail-label font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 transition-colors ${
              i === 0 ? "is-active" : ""
            }`}
          >
            {s.label}
          </span>
        ))}
      </nav>

      {/* Vignette + film grain */}
      <div className="vignette pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
    </div>
  );
}
