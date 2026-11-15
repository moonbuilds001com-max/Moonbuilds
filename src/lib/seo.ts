import type { Metadata } from "next";
import { SITE, SITE_URL } from "./site";

export { SITE_URL };

interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/** Shared Open Graph / Twitter metadata for every page. */
export function pageMetadata({
  title,
  description,
  path = "",
  image = "/photos/og.jpg",
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle =
    title === SITE.name ? `${SITE.name} — ${SITE.tagline}` : `${title} — ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Structured data for the business, included on every page via the layout. */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    slogan: SITE.tagline,
    description: SITE.description,
    url: SITE_URL,
    telephone: SITE.whatsappNumber,
    email: SITE.email,
    image: `${SITE_URL}/photos/og.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: "Kenya",
    knowsAbout: [
      "Website Design",
      "Website Development",
      "E-commerce Development",
      "Interactive and 3D Web Experiences",
      "Website Redesign",
      "Digital Brand Experiences",
      "Website Maintenance and Support",
    ],
    sameAs: [],
  };
}
