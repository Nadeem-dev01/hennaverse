// Collapses the design dataset to ONE page per unique image.
//
// The generated dataset reused ~370 photos across 5000 near-identical pages,
// which search engines treat as duplicate/thin content. This keeps a single
// design per photo, enriches it with category facts + FAQ from the factbanks,
// records real image dimensions, and writes the kept-slug list used by
// src/proxy.ts to 308-redirect the removed URLs to their category page.
//
// Usage: node scripts/dedupe-designs.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DESIGNS_DIR = "src/data/designs";
const FACTBANK_DIR = "src/data/factbanks";
const SLUGS_OUT = "src/data/designSlugs.json";

// Files in /public that were picked up as "designs" but are not henna photos.
const NOT_A_DESIGN = [/^\/Logo_/, /^\/img-/, /^\/capp_blog_/, /^\/admin\./];

const categorySlugs = fs.readdirSync(DESIGNS_DIR).map((f) => f.replace(".json", ""));
const all = categorySlugs.flatMap((c) => JSON.parse(fs.readFileSync(path.join(DESIGNS_DIR, `${c}.json`), "utf8")));

const byImage = new Map();
for (const d of all) {
  if (NOT_A_DESIGN.some((re) => re.test(d.image.src))) continue;
  if (!byImage.has(d.image.src)) byImage.set(d.image.src, []);
  byImage.get(d.image.src).push(d);
}

// Pick one design per image. Prefer the category named in the file name
// (eid-2032.jpeg -> eid); otherwise the category with the fewest designs so
// far, so every category page keeps a healthy gallery.
const keptPerCategory = new Map(categorySlugs.map((c) => [c, 0]));
const kept = [];
for (const [src, candidates] of byImage) {
  const name = src.toLowerCase();
  const hinted = candidates.filter((d) => name.includes(d.category));
  const pool = hinted.length ? hinted : candidates;
  pool.sort((a, b) => keptPerCategory.get(a.category) - keptPerCategory.get(b.category));
  const pick = pool[0];
  keptPerCategory.set(pick.category, keptPerCategory.get(pick.category) + 1);
  kept.push(pick);
}

const titleCounts = new Map();
for (const d of kept) {
  const t = d.title.replace(/\s+#\d+$/, "");
  titleCounts.set(t, (titleCounts.get(t) ?? 0) + 1);
}

// Only a few category factbanks are populated, so every design also draws on
// general henna guidance keyed by body part and difficulty.
const BODY_PART_NOTES = {
  finger:
    "Finger designs are quick to apply and dry fast, which makes them practical when time is short. Fingertips have thicker skin, so the stain there usually develops darker than on the rest of the hand.",
  "front-hand":
    "The palm has the thickest skin on the hand, so henna stains darkest here. Keep the hand open and relaxed while the paste dries so the lines do not crack or smudge.",
  "back-hand":
    "Skin on the back of the hand is thinner than the palm, so the stain is usually lighter and fades sooner. Leaving the paste on for longer helps the colour develop.",
  "full-hand":
    "Full-hand designs run from the fingertips to the wrist, so allow extra time for application. Work from the wrist towards the fingers, or the other way round, so you never rest on wet paste.",
  arm:
    "Henna on the forearm stains lighter than on the palm because the skin is thinner. Arm designs are easier to apply on someone else than on yourself, especially past the wrist.",
  foot:
    "The soles take henna as well as the palms do, while the top of the foot stains lighter. Stay seated and avoid walking until the paste has dried completely.",
};
const DIFFICULTY_NOTES = {
  Easy: "This is a beginner-friendly pattern: practise the main shapes on paper first, then copy them onto skin with a fine-tipped cone.",
  Medium: "This pattern suits someone who is already comfortable with basic lines, dots and petals and wants to practise even spacing.",
  Hard: "This pattern needs steady pressure control and fine line work, so it is best attempted after practising simpler designs.",
  Expert: "This is a detailed pattern usually done by an experienced artist; allow plenty of time and work in small sections.",
};
const GENERAL_TIPS = [
  "Leave the paste on for at least four to six hours; the longer it stays, the deeper the stain.",
  "Dab a lemon and sugar mixture on the dried paste to keep it moist and stuck to the skin.",
  "Scrape the dried paste off instead of washing it, and keep the area away from water for the first 12 to 24 hours.",
  "The stain starts orange and darkens to reddish brown over 24 to 48 hours as it oxidises.",
  "Wash and dry the skin before application and skip lotion or oil, which block the dye.",
  "Keeping the skin warm while the paste is on helps the colour develop.",
];
const GENERAL_FAQ = [
  { q: "How long does a mehndi stain last?", a: "A natural henna stain usually lasts one to three weeks. It fades faster on areas that are washed or rubbed often, such as the hands." },
  { q: "How long should I leave the mehndi paste on?", a: "Keep the paste on for at least four to six hours. Many people leave it overnight for a darker stain." },
  { q: "Why does my mehndi look orange at first?", a: "Fresh henna stains are orange. The colour deepens to reddish brown over the next 24 to 48 hours as the dye oxidises." },
  { q: "Is black henna safe?", a: "Natural henna is never black. Products sold as black henna often contain PPD, a hair-dye chemical that can cause skin reactions, so they are best avoided." },
  { q: "How can I make my mehndi darker?", a: "Leave the paste on longer, seal it with lemon and sugar, keep the skin warm, and avoid water for the first day after removing the paste." },
  { q: "Should I do a patch test before applying mehndi?", a: "Yes. Apply a small amount of the paste to the inner arm and wait 24 hours, especially if you have sensitive skin or are using a new cone." },
];

const readBank = (c) => JSON.parse(fs.readFileSync(path.join(FACTBANK_DIR, `${c}.json`), "utf8"));
const rotate = (arr, start, n) => Array.from({ length: Math.min(n, arr.length) }, (_, k) => arr[(start + k) % arr.length]);

let index = 0;
for (const d of kept) {
  const i = index++;
  // First populated factbank among the design's categories, if any.
  const bank = [d.category, ...d.categories].map(readBank).find((b) => b.culturalBackground?.length) ?? {};

  const cleanTitle = d.title.replace(/s+#d+$/, "");
  if (titleCounts.get(cleanTitle) === 1) d.title = cleanTitle;

  const intro = d.descriptionParagraphs[0].replace(/^A ([aeiou])/i, "An $1");
  const placement = [BODY_PART_NOTES[d.bodyPart], DIFFICULTY_NOTES[d.difficulty]].filter(Boolean).join(" ");
  const facts = rotate(bank.culturalBackground ?? [], i * 2, 2).join(" ");
  const tips = rotate([...(bank.applicationTips ?? []), ...GENERAL_TIPS], i * 2, 2).join(" ");
  d.descriptionParagraphs = [intro, placement, facts, `Application tips: ${tips}`].filter(Boolean);
  d.faq = rotate([...(bank.faqPool ?? []), ...GENERAL_FAQ], i, 3);

  const meta = await sharp(path.join("public", d.image.src)).metadata();
  d.image.width = meta.width;
  d.image.height = meta.height;
}

for (const d of kept) {
  const others = kept.filter((o) => o.id !== d.id);
  const same = others.filter((o) => o.category === d.category);
  const shared = others.filter((o) => o.category !== d.category && o.categories.some((c) => d.categories.includes(c)));
  d.relatedIds = [...same, ...shared].slice(0, 8).map((o) => o.id);
}

for (const c of categorySlugs) {
  const list = kept.filter((d) => d.category === c);
  fs.writeFileSync(path.join(DESIGNS_DIR, `${c}.json`), JSON.stringify(list, null, 2) + "\n");
}
fs.writeFileSync(
  SLUGS_OUT,
  JSON.stringify({ categories: categorySlugs, kept: kept.map((d) => d.slug).sort() }, null, 2) + "\n"
);

console.log(`Kept ${kept.length} of ${all.length} designs`);
console.log(Object.fromEntries(keptPerCategory));
