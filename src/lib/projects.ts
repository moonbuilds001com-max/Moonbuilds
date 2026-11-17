export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  statusLabel: string;
  cover: string;
  coverAlt: string;
  description: string;
  challenge: string;
  direction: string;
  features: string[];
  stack: string[];
  /** Present only for verified outcomes. All current entries are concept work. */
  outcome?: string;
}

/**
 * The four portfolio entries are MOONBUILDS concept and demonstration
 * projects — self-initiated explorations that show how we think and build.
 * None of them is presented as a delivered client engagement, so none
 * carries an outcome claim or a live link.
 */
export const PROJECTS: Project[] = [
  {
    slug: "prime-springs",
    title: "Prime Springs",
    category: "Hospitality & Water · Concept",
    year: "2026",
    statusLabel: "MOONBUILDS concept / demonstration",
    cover: "/photos/project-prime-springs.webp",
    coverAlt:
      "Clear water rippling with sunlight reflections — the visual language of the Prime Springs concept",
    description:
      "A concept website for a premium natural-water and wellness brand: a calm, water-led visual system where clarity is the product and the interface at the same time.",
    challenge:
      "Water brands tend to look interchangeable — blue gradients, stock droplets, interchangeable claims. The brief we set ourselves was to make purity feel architectural: space, light and restraint instead of clichés, while keeping the path to purchase obvious.",
    direction:
      "The interface borrows from the product. Long scroll sections carry one message at a time; water photography is used in large planes rather than as decoration; a deep charcoal-and-water palette holds the premium register; and the type is large, quiet and confident.",
    features: [
      "Full-bleed water photography with a slow parallax reveal",
      "Single-column story scroll for the sourcing narrative",
      "Product selector with volume and subscription states",
      "Delivery-area enquiry flow for wholesale buyers",
      "A thumb-first mobile layout, redesigned rather than shrunk",
    ],
    stack: ["React", "TypeScript", "GSAP ScrollTrigger"],
  },
  {
    slug: "kitefold",
    title: "Kitefold",
    category: "Architecture & Fabrication · Concept",
    year: "2025",
    statusLabel: "MOONBUILDS concept / demonstration",
    cover: "/photos/project-kitefold.webp",
    coverAlt:
      "Modern building facade with repeating geometric panels and shadows — the Kitefold concept cover",
    description:
      "A concept site for a structural fabrication and folding-façade studio: an architecture-grade portfolio where the work is presented the way architects actually judge it — sequence, material, section.",
    challenge:
      "Fabricators are judged on capability, but portfolio websites usually show nothing but photographs. Kitefold needed to demonstrate precision as an experience: the structure of the site itself had to feel engineered, and every project page needed depth without becoming slow.",
    direction:
      "A strict grid, monospaced technical labels and monochrome photography let the geometry of the work do the talking. Each project opens on a full-height elevation image, then steps through material, span and finish in a fixed sequence — closer to a drawing set than a slideshow.",
    features: [
      "Project pages structured as specification sheets",
      "Pointer-linked parallax on façade imagery",
      "Interactive folding-section explorer (3D on desktop, static fallback elsewhere)",
      "Monospaced technical annotation system",
      "Lazy-loaded image planes to keep heavy imagery fast",
    ],
    stack: ["React", "TypeScript", "Three.js", "Lenis"],
  },
  {
    slug: "dustline-300",
    title: "Dustline 300",
    category: "Energy & Industrial · Concept",
    year: "2024",
    statusLabel: "MOONBUILDS concept / demonstration",
    cover: "/photos/project-dustline-300.webp",
    coverAlt:
      "Rows of solar panels in a field under a clear sky — the Dustline 300 concept cover",
    description:
      "A concept product site for a hypothetical off-grid solar unit, the Dustline 300: a single-product landing page built to test how far a technical product can be made genuinely persuasive online.",
    challenge:
      "Technical products drown in specification tables. The question we posed: can a battery-and-panel unit be explained with the confidence of a consumer product — what it runs, and for how long, in plain language — while keeping the engineering credible for professional buyers?",
    direction:
      "The page runs as one long, confident argument: an interactive capacity calculator, honest runtime figures, and photography of the unit's real environments. Industrial orange is used sparingly and precisely — for energy, action and the primary conversion — against a near-black technical field.",
    features: [
      "Interactive load calculator (appliance selection → estimated runtime)",
      "Scroll-driven storytelling with technical annotations",
      "Progressive spec sheet instead of a single dense table",
      "Dealer-enquiry form with structured output",
      "Dark high-contrast theme with reduced-motion support",
    ],
    stack: ["React", "TypeScript", "GSAP"],
  },
  {
    slug: "future-objects",
    title: "Future Objects",
    category: "Product Design & 3D · Concept",
    year: "2024",
    statusLabel: "MOONBUILDS concept / demonstration",
    cover: "/photos/project-future-objects.webp",
    coverAlt:
      "White product objects under dramatic studio lighting — the Future Objects concept cover",
    description:
      "A concept showcase for a fictional industrial-design studio: an object gallery built around real-time 3D, where every product can be turned, inspected and lit in the browser.",
    challenge:
      "Design studios need to show objects, but photography flattens them. We asked whether a browser could replace the showroom: real-time materials, controlled lighting, and a catalogue that still loads fast on ordinary phones in markets like Nairobi.",
    direction:
      "Gallery-white minimalism on a hard editorial grid. Objects sit in generous space, and interaction — not decoration — creates the drama. The catalogue degrades deliberately: full WebGL on capable devices, beautifully lit stills with the same interactions on modest ones.",
    features: [
      "Real-time WebGL object viewer with turntable and light presets",
      "Progressive catalogue that swaps 3D for stills on low-power devices",
      "Keyboard-navigable object grid",
      "Material and finish switcher per object",
      "Editorial grid that reflows into a single column on mobile",
    ],
    stack: ["React", "TypeScript", "Three.js"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
