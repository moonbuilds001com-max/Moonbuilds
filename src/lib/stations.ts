/**
 * The scroll walk: one full-screen photo plate per station.
 * Home is a scroll-driven walk through these stations on desktop;
 * mobile and reduced-motion visitors get the same content as a
 * stacked, lighter layout.
 */
export interface Station {
  id: string;
  label: string;
  heading: string;
  body: string;
  image: string;
  mobileImage: string;
  imageAlt: string;
  /** Primary and secondary call-to-action shown on the station card. */
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export const STATIONS: Station[] = [
  {
    id: "home",
    label: "01 — Home",
    heading: "We build\ndigital worlds.",
    body: "MOONBUILDS is an independent digital design and development agency in Nairobi, Kenya. We design and develop distinctive digital experiences that help ambitious businesses stand out.",
    image: "/photos/01-hero.webp",
    mobileImage: "/photos/01-hero-mobile.webp",
    imageAlt: "",
    primary: { label: "Start a project enquiry", href: "/contact" },
    secondary: { label: "View portfolio", href: "/portfolio" },
  },
  {
    id: "studio",
    label: "02 — Studio",
    heading: "A small studio\nwith high standards.",
    body: "We take a limited number of projects and give each one real attention: design with a point of view, engineering that lasts, and communication you never have to chase.",
    image: "/photos/02-studio.webp",
    mobileImage: "/photos/02-studio-mobile.webp",
    imageAlt:
      "A bright creative workspace with a desk and drawings by a window",
    primary: { label: "About the studio", href: "/studio" },
    secondary: { label: "How we work", href: "/process" },
  },
  {
    id: "services",
    label: "03 — Services",
    heading: "Design and\ndevelopment, end to end.",
    body: "Website design, development, e-commerce, interactive 3D experiences, redesigns, digital brand systems and ongoing support — seven services, one team, no hand-offs.",
    image: "/photos/04-gallery.webp",
    mobileImage: "/photos/04-gallery-mobile.webp",
    imageAlt:
      "A modern gallery interior with framed works on a white wall",
    primary: { label: "Explore services", href: "/services" },
    secondary: { label: "Start an enquiry", href: "/contact" },
  },
  {
    id: "portfolio",
    label: "04 — Portfolio",
    heading: "Work that shows\nhow we think.",
    body: "Prime Springs, Kitefold, Dustline 300, Future Objects — concept and demonstration projects that show our approach to design, engineering and storytelling.",
    image: "/photos/03-architecture.webp",
    mobileImage: "/photos/03-architecture-mobile.webp",
    imageAlt:
      "A concrete architectural staircase under natural light from a skylight",
    primary: { label: "View portfolio", href: "/portfolio" },
    secondary: { label: "Our process", href: "/process" },
  },
  {
    id: "process",
    label: "05 — Process",
    heading: "Five steps,\nno mysteries.",
    body: "Discovery, strategy and design, development, testing, launch and support. You always know what stage your project is in and what happens next.",
    image: "/photos/05-technology.webp",
    mobileImage: "/photos/05-technology-mobile.webp",
    imageAlt:
      "Programming code displayed on a monitor in a dark room",
    primary: { label: "See the process", href: "/process" },
    secondary: { label: "Start a project", href: "/contact" },
  },
  {
    id: "contact",
    label: "06 — Contact",
    heading: "Let's build\nyours.",
    body: "Tell us about your project and we will reply with honest advice, a clear scope and a quote. Or simply message us on WhatsApp.",
    image: "/photos/06-nairobi.webp",
    mobileImage: "/photos/06-nairobi-mobile.webp",
    imageAlt:
      "Aerial view of Nairobi's skyline with modern buildings under a clear daytime sky",
    primary: { label: "Start a project enquiry", href: "/contact" },
    secondary: { label: "WhatsApp us", href: "https://wa.me/254103732569" },
  },
];
