/**
 * Downloads the site's real photographs from the Pexels image CDN and
 * optimises them with sharp:
 *   - desktop: 2400px-wide WebP, targeted under ~300KB
 *   - mobile:  1200px-wide WebP
 *   - og:      1200x630 crop of the hero, WebP + JPEG
 *
 * Every photo's licence and photographer were verified on its own
 * Pexels page before this script was written; the mapping lives in
 * src/lib/photos.ts and public/photos/CREDITS.md.
 *
 * Run: node scripts/download-photos.mjs
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "photos");
await mkdir(OUT, { recursive: true });

/** slot -> Pexels photo id (licence verified on each photo's page) */
const SLOTS = {
  "01-hero": 38623517,
  "02-studio": 6044260,
  "03-architecture": 12884282,
  "04-gallery": 11000394,
  "05-technology": 6424583,
  "06-nairobi": 29069344,
  "project-prime-springs": 9399997,
  "project-kitefold": 39473722,
  "project-dustline-300": 15751130,
  "project-future-objects": 6083568,
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

async function fetchPhoto(id) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?cs=srgb&w=3000&fit=max`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for photo ${id}`);
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) throw new Error(`Not an image (${type}) for ${id}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 20_000) throw new Error(`Too small (${buf.length}B) for ${id}`);
  return buf;
}

function report(name, buf) {
  console.log(`  ${name}: ${(buf.length / 1024).toFixed(0)} KB`);
}

const failures = [];

for (const [slot, id] of Object.entries(SLOTS)) {
  try {
    console.log(`\n[${slot}] photo ${id}`);
    const jpg = await fetchPhoto(id);
    await writeFile(path.join(OUT, `${slot}.jpg`), jpg);
    console.log(`  downloaded ${(jpg.length / 1024).toFixed(0)} KB`);

    // Desktop variant: 2400px wide, WebP, quality ramp to stay under ~300KB
    let desktop;
    for (const q of [80, 70, 60, 50, 42, 34, 28]) {
      desktop = await sharp(jpg)
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: q })
        .toBuffer();
      if (desktop.length <= 300 * 1024) break;
    }
    // Extremely detailed photos: drop to 2000px before sacrificing more quality
    if (desktop.length > 300 * 1024) {
      for (const q of [62, 52, 44, 38, 32, 28]) {
        desktop = await sharp(jpg)
          .resize({ width: 2000, withoutEnlargement: true })
          .webp({ quality: q })
          .toBuffer();
        if (desktop.length <= 300 * 1024) break;
      }
    }
    await writeFile(path.join(OUT, `${slot}.webp`), desktop);
    report(`${slot}.webp (2400w)`, desktop);

    // Mobile variant: 1200px wide
    const mobile = await sharp(jpg)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toBuffer();
    await writeFile(path.join(OUT, `${slot}-mobile.webp`), mobile);
    report(`${slot}-mobile.webp (1200w)`, mobile);
  } catch (e) {
    console.error(`  FAIL ${slot}: ${e.message}`);
    failures.push(slot);
  }
}

// OG image: 1200x630 crop of the hero photo
try {
  const hero = await readFile(OUT, "01-hero.jpg");
  const og = await sharp(hero)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .webp({ quality: 78 })
    .toBuffer();
  await writeFile(path.join(OUT, "og.webp"), og);
  report("og.webp (1200x630)", og);
  // JPEG fallback: some social platforms don't accept WebP og:image
  const ogJpg = await sharp(hero)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80 })
    .toBuffer();
  await writeFile(path.join(OUT, "og.jpg"), ogJpg);
  report("og.jpg (1200x630)", ogJpg);
  // Remove the raw download intermediates; only the optimised variants ship.
  const { readdir, unlink } = await import("node:fs/promises");
  const entries = await readdir(OUT);
  for (const f of entries) {
    if (f.endsWith(".jpg") && f !== "og.jpg") await unlink(path.join(OUT, f));
  }
  console.log("  raw .jpg intermediates removed");
} catch (e) {
  console.error(`  FAIL og image: ${e.message}`);
}

async function readFile(dir, name) {
  const { readFile } = await import("node:fs/promises");
  return readFile(path.join(dir, name));
}

console.log(
  failures.length
    ? `\n${failures.length} slot(s) failed: ${failures.join(", ")}`
    : "\nAll photos downloaded and optimised."
);
