import type { Metadata } from "next";
import { SceneWalk } from "@/components/SceneWalk";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "MOONBUILDS",
  description:
    "We design and develop distinctive digital experiences that help ambitious businesses stand out. Digital design and development agency in Nairobi, Kenya.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      {/* Screen-reader-first content for the walk; the visual walk is decorative-adjacent but fully keyboard reachable via its CTAs */}
      <SceneWalk />
    </main>
  );
}
