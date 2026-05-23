import fs from 'fs';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'src', 'data', 'blogs.ts');

// ── 1. Read current blogs.ts ──────────────────────────────────────────────────
let content = fs.readFileSync(BLOGS_FILE, 'utf8');

// ── 2. Change ALL dates from 2026-05-xx to 2026-04-xx ─────────────────────────
content = content.replace(/"date": "2026-05-(\d{2})"/g, '"date": "2026-04-$1"');
console.log('✅ All blog dates updated to April 2026');

// ── 3. Get all eid images from public/eid ─────────────────────────────────────
const eidDir = path.join(process.cwd(), 'public', 'eid');
const eidFiles = fs.readdirSync(eidDir).filter(f => f.endsWith('.jpg'));
console.log(`Found ${eidFiles.length} Eid images`);

// ── 4. Check which slugs already exist so we don't duplicate ──────────────────
const existingSlugs = [...content.matchAll(/"slug": "([^"]+)"/g)].map(m => m[1]);

// ── 5. Titles/excerpts library for variety ────────────────────────────────────
const titleTemplates = [
  ['Eid Mehndi Inspiration: Design %n', 'A beautifully crafted Eid mehndi pattern that blends tradition with elegance.'],
  ['Stunning Eid Henna Design %n', 'This gorgeous henna motif is perfect for Eid celebrations and festive occasions.'],
  ['Bold Arabic Eid Mehndi %n', 'Featuring bold floral strokes and intricate Arabic patterns ideal for Eid.'],
  ['Floral Eid Mehndi Art %n', 'Delicate floral elements come together in this stunning Eid mehndi composition.'],
  ['Bridal-Inspired Eid Mehndi %n', 'A bridal-inspired Eid design that radiates elegance and cultural richness.'],
  ['Modern Eid Henna Pattern %n', 'A contemporary take on traditional Eid mehndi with clean, flowing lines.'],
  ['Traditional Eid Mehndi %n', 'A timeless Eid mehndi design rooted in centuries of South Asian artistry.'],
  ['Geometric Eid Mehndi %n', 'Geometric precision meets festive beauty in this striking Eid henna design.'],
  ['Intricate Eid Henna %n', 'Detailed and intricate, this Eid mehndi pattern will dazzle everyone around you.'],
  ['Elegant Eid Mehndi Look %n', 'Elegant swirls and paisley motifs make this Eid design truly unforgettable.'],
];

const categories = ['Tutorial', 'Guide', 'Culture', 'Tips', 'Trends', 'Festival'];
const tags = [
  ['eid', 'mehndi', 'henna', 'celebration'],
  ['eid', 'arabic', 'henna', 'festive'],
  ['eid', 'bridal', 'mehndi', 'traditional'],
  ['eid', 'floral', 'henna', 'patterns'],
  ['eid', 'modern', 'mehndi', 'trends'],
];

function buildBlogContent(imageUrl, title, n) {
  return `\\n      <h2>About This Eid Mehndi Design</h2>\\n      <p>${title.replace(` ${n}`, '')} is one of the most sought-after patterns during Eid season. The design showcases the timeless beauty of henna art that has been passed down through generations.</p>\\n      <div class=\\"my-6 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border\\"><img src=\\"${imageUrl}\\" alt=\\"Eid Mehndi Design\\" class=\\"absolute inset-0 w-full h-full object-cover\\" loading=\\"lazy\\" /></div>\\n      <h2>How to Recreate This Look</h2>\\n      <p>Start by preparing high-quality henna paste with eucalyptus oil for a dark, long-lasting stain. Sketch the main motifs lightly before filling them in. Keep the cone steady and maintain even pressure throughout.</p>\\n      <h2>Aftercare Tips</h2>\\n      <p>Leave the henna paste on for at least 6–8 hours. Once dry, apply a lemon-sugar solution to keep it moist. After removing, apply coconut oil to deepen the stain. Avoid water for the first 24 hours.</p>\\n    `;
}

// ── 6. Generate new blog entries for each eid image ───────────────────────────
const newBlogs = [];
let dayCounter = 1;
let skipped = 0;

for (let i = 0; i < eidFiles.length; i++) {
  const file = eidFiles[i];
  const imageUrl = `/eid/${file}`;
  const n = i + 1;
  const templateIdx = i % titleTemplates.length;
  const [titleTpl, excerpt] = titleTemplates[templateIdx];
  const title = titleTpl.replace('%n', `#${n}`);
  const slug = `eid-mehndi-design-${n}`;

  if (existingSlugs.includes(slug)) {
    skipped++;
    continue;
  }

  // Distribute across April 1–30
  const day = String(((dayCounter - 1) % 28) + 1).padStart(2, '0');
  dayCounter++;

  const category = categories[i % categories.length];
  const tagSet = tags[i % tags.length];
  const readTime = `${2 + (i % 4)} min read`;

  newBlogs.push(`  {
    "slug": "${slug}",
    "title": "${title}",
    "excerpt": "${excerpt}",
    "content": "${buildBlogContent(imageUrl, title, `#${n}`)}",
    "author": "HennaVerse Team",
    "date": "2026-04-${day}",
    "readTime": "${readTime}",
    "category": "${category}",
    "country": "Global",
    "imageUrl": "${imageUrl}",
    "tags": ${JSON.stringify(tagSet)}
  }`);
}

console.log(`Generating ${newBlogs.length} new Eid blog posts (${skipped} skipped as duplicates)`);

// ── 7. Inject new blogs before the closing ]; ─────────────────────────────────
const insertionPoint = content.lastIndexOf('];');
const updated =
  content.substring(0, insertionPoint) +
  (newBlogs.length > 0 ? ',\n' + newBlogs.join(',\n') + '\n' : '') +
  '];\n';

fs.writeFileSync(BLOGS_FILE, updated, 'utf8');
console.log('✅ blogs.ts updated successfully!');
console.log(`Total new blogs added: ${newBlogs.length}`);
