import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ConsentBanner, WhatsAppFloat } from "@/components/Widgets";
import { professionalServiceSchema, SITE_URL } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MOONBUILDS — We build digital worlds.",
    template: "%s — MOONBUILDS",
  },
  description:
    "MOONBUILDS is an independent digital design and development agency in Nairobi, Kenya, building distinctive websites, e-commerce and interactive web experiences.",
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = professionalServiceSchema();
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body className="bg-ink font-body text-cream antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SmoothScroll />
        <Nav />
        <div className="min-h-screen">{children}</div>
        <Footer />
        <WhatsAppFloat />
        <ConsentBanner />
      </body>
    </html>
  );
}
