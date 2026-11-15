/**
 * Queries Pexels search pages and extracts compact candidate metadata
 * (page URL, photographer, photo id, description) for each visual slot.
 * Output is a small JSON list per slot for manual selection.
 *
 * Run: node scripts/find-photos.mjs
 */
const SLOTS = {
  '01-hero': 'warm modern interior wooden slat wall daylight',
  '02-studio': 'bright creative studio workspace desk',
  '03-architecture': 'modern architecture staircase interior concrete',
  '04-gallery': 'art gallery interior exhibition',
  '05-technology': 'programmer code on screen dark desk',
  '06-nairobi': 'Nairobi skyline city',
  'project-prime-springs': 'clear water surface light reflections',
  'project-kitefold': 'modern facade folded panels architecture',
  'project-dustline-300': 'solar panels clear sky',
  'project-future-objects': 'minimal product design objects studio',
};

function extract(html) {
  // Photo page links like /photo/some-slug-12345678/
  const seen = new Map();
  const re = /href="(\/photo\/[a-z0-9-]+-(\d+)\/?)"/g;
  let m;
  while ((m = re.exec(html))) {
    const slug = m[1].replace(/\/$/, '');
    const id = m[2];
    if (!seen.has(id)) seen.set(id, slug);
  }
  // Download URLs reveal photographer: pexels-<name>-<id>.jpg
  const photographers = {};
  const dre = /images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\1\.jpeg\?[^"]*dl=pexels-([a-z0-9-]+?)-\1\.jpg/g;
  while ((m = dre.exec(html))) photographers[m[1]] = decodeURIComponent(m[2]).replace(/-/g, ' ');
  const out = [];
  for (const [id, slug] of seen) {
    out.push({ id, page: `https://www.pexels.com${slug}/`, photographer: photographers[id] || '?' });
  }
  return out.slice(0, 14);
}

for (const [slot, query] of Object.entries(SLOTS)) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(query)}/`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    const html = await res.text();
    const candidates = extract(html);
    console.log(`\n== ${slot} (${candidates.length} found)`);
    for (const c of candidates) console.log(`  ${c.id}  ${c.photographer}  ${c.page}`);
  } catch (e) {
    console.log(`\n== ${slot} ERROR: ${e.message}`);
  }
}
