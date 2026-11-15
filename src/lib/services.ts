export interface Service {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  who: string;
}

/**
 * The seven MOONBUILDS services. Every service page covers what is
 * included, who it helps and how to enquire. No performance claims
 * are made anywhere — nothing here is a verified outcome.
 */
export const SERVICES: Service[] = [
  {
    slug: "website-design",
    index: "01",
    title: "Website Design",
    short: "Distinctive interfaces designed around your business, not a template.",
    description:
      "Design is where a website earns its keep. We start from your business — what you sell, who you sell to and what makes you different — and build an interface with a clear point of view: considered typography, deliberate colour, and layouts that guide a visitor towards action. You review the design and we refine it together before any code is written.",
    includes: [
      "Creative direction and visual concept",
      "Responsive layouts for desktop, tablet and mobile",
      "Typography, colour and component system",
      "Wireframes and interactive design previews",
      "Structured revision rounds with clear feedback steps",
    ],
    who: "Best for businesses launching their first serious website, or replacing an outdated one with something that finally matches the quality of their work.",
  },
  {
    slug: "website-development",
    index: "02",
    title: "Website Development",
    short: "Fast, accessible, production-grade code — built to be maintained.",
    description:
      "Approved designs become real, working websites. We build with modern frameworks, write clean typed code, optimise images and loading behaviour, and test across browsers and real devices. The result is a site that loads quickly, is straightforward to update, and gives your content the best chance in search.",
    includes: [
      "Modern framework build (Next.js / React where suitable)",
      "Performance and accessibility optimisation",
      "On-page SEO foundations and metadata",
      "Cross-browser and real-device testing",
      "Deployment, domain and hosting configuration",
    ],
    who: "Best for businesses that need a dependable site — service companies, portfolios, booking-based operations and content-driven brands.",
  },
  {
    slug: "ecommerce-development",
    index: "03",
    title: "E-commerce Development",
    short: "Online stores designed to convert and built to scale.",
    description:
      "We build online stores with the buying journey as the first priority: clear product presentation, a short path to checkout, and an administration area you can actually run yourself. Payment integrations relevant to the Kenyan market — including mobile money — are configured where the provider makes credentials available to us.",
    includes: [
      "Store design and product page architecture",
      "Cart and checkout flow development",
      "Payment gateway integration (provider credentials required)",
      "Inventory and order management setup",
      "Order and enquiry notification flows",
    ],
    who: "Best for retailers, producers and service businesses that want to take orders or payments directly on their own platform.",
  },
  {
    slug: "interactive-3d",
    index: "04",
    title: "Interactive & 3D Web Experiences",
    short: "WebGL, 3D scenes and motion that make a site impossible to forget.",
    description:
      "Some brands need more than pages — they need an experience. We build interactive 3D scenes, product visualisations and scroll-driven storytelling with WebGL, always with a performance budget and graceful fallbacks for modest devices. The spectacle never comes at the cost of the message.",
    includes: [
      "3D scene design and development (Three.js / WebGL)",
      "Scroll-driven and pointer-reactive animation",
      "Performance budgets and mobile fallbacks",
      "Product or concept visualisation in the browser",
      "Progressive loading so the experience never blocks the page",
    ],
    who: "Best for product launches, creative campaigns, architecture practices and any brand that wants its website to be the demonstration of its ambition.",
  },
  {
    slug: "website-redesign",
    index: "05",
    title: "Website Redesign",
    short: "Keep what works, rebuild what does not.",
    description:
      "When a website underperforms — slow, dated, difficult to update or invisible in search — we rebuild it properly. We audit what exists, keep the parts that carry value (content, pages that rank, inbound links, assets) and replace the rest with a fast, modern build with safe redirects.",
    includes: [
      "Audit of the existing site (speed, content, SEO)",
      "Content and information-architecture restructuring",
      "Full redesign and rebuild",
      "Redirect mapping so no existing traffic is lost",
      "Migration with search-engine-safe URLs",
    ],
    who: "Best for established businesses whose website no longer matches the quality of their operation.",
  },
  {
    slug: "brand-experiences",
    index: "06",
    title: "Digital Brand Experiences",
    short: "Digital identity systems that hold together everywhere.",
    description:
      "A brand is how a business behaves online between the clicks. We build digital identity systems — how your website, campaign pages, social visuals and product UI feel like one coherent world — so every digital touchpoint reinforces the same impression of your business.",
    includes: [
      "Digital brand direction (type, colour, motion, tone)",
      "Design system and reusable components",
      "Campaign and landing page design",
      "Brand-consistent interaction patterns",
      "Practical usage documentation your team can follow",
    ],
    who: "Best for young businesses establishing their identity, or growing ones whose materials have drifted apart.",
  },
  {
    slug: "maintenance-support",
    index: "07",
    title: "Website Maintenance & Support",
    short: "Your site stays current, secure and fast after launch.",
    description:
      "Launch is the start, not the finish. We keep your website updated, backed up, secure and fast, and we stay available for content changes and improvements as your business moves. You get a long-term technical partner instead of a one-off vendor.",
    includes: [
      "Regular updates and security patching",
      "Uptime and performance monitoring",
      "Content updates and small changes",
      "Backup and recovery arrangements",
      "Ongoing advice on improvements",
    ],
    who: "Best for any business that wants its website cared for after launch, without hiring in-house.",
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
