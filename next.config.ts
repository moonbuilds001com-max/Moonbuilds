import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;

// Integrates the Cloudflare adapter with `next dev` (bindings, env vars).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// Dev-only: skipped for production builds so the build never needs to
// start the Miniflare runtime (which fails on some Windows setups).
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
