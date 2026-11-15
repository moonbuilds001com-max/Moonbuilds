/**
 * Central business facts for MOONBUILDS.
 * Only verified channels live here: WhatsApp and location.
 * Never invent team members, awards, client history or social URLs.
 */
export const SITE = {
  name: "MOONBUILDS",
  tagline: "We build digital worlds.",
  supportingLine:
    "We design and develop distinctive digital experiences that help ambitious businesses stand out.",
  description:
    "MOONBUILDS is an independent digital design and development agency in Nairobi, Kenya, building websites, e-commerce stores and interactive web experiences for ambitious businesses.",
  city: "Nairobi, Kenya",
  whatsappNumber: "+254103732569",
  whatsappDisplay: "+254 103 732 569",
  whatsappUrl: "https://wa.me/254103732569",
  email: "Moonbuilds001.com@gmail.com",
  emailUrl: "mailto:Moonbuilds001.com@gmail.com",
} as const;

/** Canonical site URL, configurable per deployment via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://moonbuilds.co.ke";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICE_OPTIONS = [
  "Website Design",
  "Website Development",
  "E-commerce Development",
  "Interactive & 3D Web Experiences",
  "Website Redesign",
  "Digital Brand Experiences",
  "Website Maintenance & Support",
  "Not sure yet — please advise",
] as const;
