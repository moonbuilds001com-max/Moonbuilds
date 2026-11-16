import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Minimal Cloudflare configuration for the MOONBUILDS site.
 *
 * All pages are statically prerendered at build time, so no incremental
 * cache (R2/KV) is needed. If you later add dynamic pages that use
 * Next.js caching, enable the R2 incremental cache:
 * https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({});
