#!/usr/bin/env node

/**
 * Generate 5000 unique design entries from existing images.
 * Each design has a unique slug, title, description, and FAQ.
 * Images are distributed across 26 categories with different
 * body-part and occasion assignments — a single mehndi image
 * legitimately belongs to multiple categories (e.g. "arabic" + "back-hand" + "wedding").
 *
 * Usage: node scripts/generate-5000-designs.mjs
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, resolve, extname } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");
const DESIGNS_DIR = join(ROOT, "src", "data", "designs");
const FACTBANKS_DIR = join(ROOT, "src", "data", "factbanks");

const TARGET = 5000;

const CATEGORIES = [
  "arabic", "indian", "pakistani", "moroccan", "gulf", "african",
  "turkish", "rajasthani", "indonesian", "bridal", "simple", "modern",
  "traditional", "minimal", "floral", "mandala", "geometric", "jewelry",
  "royal", "full-hand", "back-hand", "front-hand", "finger", "foot", "eid", "kids",
];

const BODY_PARTS = ["front-hand", "back-hand", "full-hand", "finger", "foot", "arm"];
const OCCASIONS = ["wedding", "eid", "karva-chauth", "diwali", "teej", "engagement", "party", "everyday"];
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const STYLE_ADJECTIVES = [
  "elegant", "intricate", "stunning", "beautiful", "exquisite", "graceful",
  "ornate", "delicate", "bold", "detailed", "classic", "charming",
  "sophisticated", "gorgeous", "captivating", "mesmerizing", "traditional",
  "contemporary", "luxurious", "artistic", "refined", "elaborate",
  "dainty", "majestic", "striking", "enchanting", "alluring", "radiant",
];

const PATTERN_TYPES = [
  "floral vine", "paisley", "mandala", "geometric grid", "peacock motif",
  "lotus pattern", "leaf trail", "chain link", "dotwork", "swirl",
  "mesh jaal", "bracelet cuff", "ring pattern", "anklet border",
  "circular medallion", "diamond lattice", "feather stroke", "ribbon weave",
  "sunburst", "teardrop cascade", "spiral rosette", "star cluster",
  "wave pattern", "petal arrangement", "crescent motif", "heart vine",
  "butterfly wing", "bell garland", "net pattern", "checkered fill",
];

const CATEGORY_DESCRIPTIONS = {
  arabic: { style: "Arabic", traits: "bold free-flowing patterns with ample negative space, dramatic florals, and diagonal vine trails" },
  indian: { style: "Indian", traits: "dense intricate coverage with paisleys, peacocks, and traditional motifs rooted in centuries of South Asian artistry" },
  pakistani: { style: "Pakistani", traits: "a beautiful fusion of Indian intricacy and Arabic boldness, featuring heavy wrist cuffs and elegant finger trails" },
  moroccan: { style: "Moroccan", traits: "bold geometric patterns derived from Berber traditions, featuring diamond grids, tribal lines, and protective symbols" },
  gulf: { style: "Gulf", traits: "Khaleeji-inspired bold floral designs with thick dramatic outlines and generous spacing" },
  african: { style: "African", traits: "diverse tribal patterns reflecting West African, Sudanese, and Somali henna traditions with bold geometric shapes" },
  turkish: { style: "Turkish", traits: "Ottoman-inspired elegant motifs blending Eastern and Western design sensibilities" },
  rajasthani: { style: "Rajasthani", traits: "mirror-image symmetry with the densest coverage in Indian henna art, featuring royal Marwari patterns" },
  indonesian: { style: "Indonesian", traits: "batik-inspired motifs with bold lines and nature elements from Javanese traditions" },
  bridal: { style: "Bridal", traits: "elaborate full-coverage wedding henna designed to make every bride feel like royalty on her special day" },
  simple: { style: "Simple", traits: "easy-to-apply elegant patterns perfect for beginners and everyday occasions" },
  modern: { style: "Modern", traits: "contemporary fusion aesthetics blending traditional henna with innovative design techniques" },
  traditional: { style: "Traditional", traits: "timeless classic patterns preserving authentic henna motifs passed down through generations" },
  minimal: { style: "Minimal", traits: "understated elegance with delicate lines, small motifs, and intentional negative space" },
  floral: { style: "Floral", traits: "nature-inspired designs featuring roses, lotuses, sunflowers, and cascading vine arrangements" },
  mandala: { style: "Mandala", traits: "meditative circular patterns with geometric symmetry radiating from a central focal point" },
  geometric: { style: "Geometric", traits: "clean angular lines, mathematical precision, and modern symmetric shapes" },
  jewelry: { style: "Jewelry", traits: "ornamental designs mimicking rings, bracelets, hathphool, and necklace patterns" },
  royal: { style: "Royal", traits: "majestic Mughal-inspired designs featuring palace motifs, elephants, and regal artistry" },
  "full-hand": { style: "Full Hand", traits: "complete front-and-back coverage from fingertips to wrist for maximum visual impact" },
  "back-hand": { style: "Back Hand", traits: "designs optimized for the dorsal hand — the most visible and photographed placement" },
  "front-hand": { style: "Front Hand", traits: "palm-centered patterns designed for the darkest henna stain and intricate detail work" },
  finger: { style: "Finger", traits: "delicate ring patterns, trail work, and minimal accents adorning individual fingers" },
  foot: { style: "Foot", traits: "anklet-style and toe-to-ankle patterns designed for bridal and festive feet henna" },
  eid: { style: "Eid", traits: "festive designs perfect for Eid ul-Fitr and Eid ul-Adha celebrations" },
  kids: { style: "Kids", traits: "fun, quick, and safe patterns designed for children's small hands" },
};

function titleCase(str) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pickFromSeed(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickNFromSeed(arr, n, rng) {
  const shuffled = [...arr].sort(() => rng() - 0.5);
  return shuffled.slice(0, n);
}

function generateUniqueDescription(category, bodyPart, occasion, difficulty, index, rng) {
  const catInfo = CATEGORY_DESCRIPTIONS[category];
  const adj1 = pickFromSeed(STYLE_ADJECTIVES, rng);
  const adj2 = pickFromSeed(STYLE_ADJECTIVES.filter(a => a !== adj1), rng);
  const pattern1 = pickFromSeed(PATTERN_TYPES, rng);
  const pattern2 = pickFromSeed(PATTERN_TYPES.filter(p => p !== pattern1), rng);
  const bpName = bodyPart ? titleCase(bodyPart) : "hand";
  const occName = occasion ? titleCase(occasion) : "any occasion";

  const diffDescriptions = {
    Easy: "beginner-friendly and quick to apply, making it ideal for those new to henna art",
    Medium: "moderately detailed, striking a balance between simplicity and intricacy",
    Hard: "highly intricate, requiring skilled hands and patience to achieve its full beauty",
    Expert: "exceptionally complex, demanding master-level artistry and hours of dedicated work",
  };

  const paras = [];

  paras.push(
    `This ${adj1} ${catInfo.style} mehndi design features ${catInfo.traits}. ` +
    `The composition incorporates ${pattern1} and ${pattern2} elements that create a ${adj2} visual harmony ` +
    `perfectly suited for the ${bpName.toLowerCase()}.`
  );

  paras.push(
    `Rated as ${difficulty}, this design is ${diffDescriptions[difficulty]}. ` +
    `It draws inspiration from ${catInfo.style.toLowerCase()} henna traditions while incorporating ` +
    `a fresh perspective through its unique arrangement of motifs and spacing.`
  );

  paras.push(
    `Whether you are preparing for ${occName.toLowerCase()} or simply seeking artistic inspiration, ` +
    `this ${catInfo.style.toLowerCase()} pattern offers a timeless appeal. ` +
    `The interplay between filled and open areas gives this design its distinctive character, ` +
    `making it a standout choice for henna enthusiasts of all levels.`
  );

  return paras;
}

function generateUniqueFAQs(category, bodyPart, difficulty, index, rng) {
  const catInfo = CATEGORY_DESCRIPTIONS[category];
  const bpName = bodyPart ? titleCase(bodyPart) : "hand";

  const timeMap = { Easy: "15-25 minutes", Medium: "30-45 minutes", Hard: "45-90 minutes", Expert: "1.5-3 hours" };
  const skillMap = { Easy: "beginners", Medium: "intermediate artists", Hard: "experienced artists", Expert: "master henna artists" };

  const allFaqs = [
    { q: `How long does it take to apply this ${catInfo.style} design?`, a: `This ${difficulty.toLowerCase()}-level design typically takes ${timeMap[difficulty]} to complete. The time varies based on the artist's experience and the level of detail desired.` },
    { q: `Is this ${catInfo.style} mehndi suitable for ${bpName.toLowerCase()}?`, a: `Yes, this design is specifically composed for the ${bpName.toLowerCase()}. Its proportions, flow, and motif placement are optimized for this area to ensure the best visual result.` },
    { q: `What skill level is needed for this design?`, a: `This design is best suited for ${skillMap[difficulty]}. It is rated "${difficulty}" based on the intricacy of its patterns and the precision required.` },
    { q: `How can I get the darkest stain with this mehndi?`, a: `Leave the henna paste on for 6-8 hours (overnight is ideal). Apply a lemon-sugar sealant once dry, keep your hands warm, and avoid water for 12-24 hours after paste removal.` },
    { q: `Can I modify this ${catInfo.style} design?`, a: `Absolutely! This design serves as a foundation. You can simplify it by removing inner details, or enhance it by adding more motifs. Many artists personalize designs to match the wearer's preferences.` },
    { q: `What occasions is this design best for?`, a: `This ${catInfo.style} design works beautifully for weddings, Eid celebrations, festivals, and special events. Its ${difficulty.toLowerCase()}-level complexity makes it ${difficulty === "Easy" ? "perfect for casual occasions too" : "ideal for memorable celebrations"}.` },
  ];

  return pickNFromSeed(allFaqs, 3, rng);
}

function main() {
  console.log("Scanning existing images...\n");

  const imageExts = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp", ".jfif"]);
  const skipFiles = new Set(["favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png"]);

  const allImages = readdirSync(PUBLIC_DIR)
    .filter((f) => {
      const ext = extname(f).toLowerCase();
      return imageExts.has(ext) && !skipFiles.has(f);
    })
    .map((f) => ({
      filename: f,
      src: `/${f}`,
      ext: extname(f).toLowerCase(),
    }));

  // Deduplicate by base name (same image may exist as .avif, .jpg, .jpeg variants)
  const baseMap = new Map();
  for (const img of allImages) {
    const base = img.filename.replace(/\.(avif|jpg|jpeg|png|webp|jfif)$/i, "").replace(/[_ ]\(\d+\)$/, "");
    if (!baseMap.has(base)) {
      // Prefer avif > webp > jpg > jpeg > png > jfif
      baseMap.set(base, img);
    } else {
      const existing = baseMap.get(base);
      const priority = { ".avif": 6, ".webp": 5, ".jpg": 4, ".jpeg": 3, ".png": 2, ".jfif": 1 };
      if ((priority[img.ext] || 0) > (priority[existing.ext] || 0)) {
        baseMap.set(base, img);
      }
    }
  }

  const uniqueImages = [...baseMap.values()];
  console.log(`  ${allImages.length} total image files → ${uniqueImages.length} unique images (after dedup)\n`);

  // Distribute TARGET designs across categories
  const perCategory = Math.ceil(TARGET / CATEGORIES.length);
  const categoryDesigns = {};

  let globalIndex = 0;

  for (const category of CATEGORIES) {
    categoryDesigns[category] = [];
    const catInfo = CATEGORY_DESCRIPTIONS[category];

    for (let i = 0; i < perCategory && globalIndex < TARGET; i++) {
      globalIndex++;
      const rng = seededRandom(globalIndex * 31337 + category.charCodeAt(0) * 7);

      const img = uniqueImages[globalIndex % uniqueImages.length];
      const bodyPart = pickFromSeed(BODY_PARTS, rng);
      const occasion = pickFromSeed(OCCASIONS, rng);
      const difficulty = pickFromSeed(DIFFICULTIES, rng);
      const adj = pickFromSeed(STYLE_ADJECTIVES, rng);
      const pattern = pickFromSeed(PATTERN_TYPES, rng);

      const designNum = i + 1;
      const slug = `${category}-${bodyPart}-${adj}-${pattern.replace(/\s+/g, "-")}-mehndi-${String(designNum).padStart(4, "0")}`;
      const title = `${titleCase(adj)} ${catInfo.style} ${titleCase(pattern)} Mehndi Design for ${titleCase(bodyPart)} #${designNum}`;

      const tags = pickNFromSeed([
        category.replace(/-/g, " "), bodyPart.replace(/-/g, " "), pattern,
        adj, occasion, difficulty.toLowerCase(), "henna", "mehndi",
        "2026", catInfo.style.toLowerCase(),
      ], 5, rng);

      const idPrefix = category.replace(/-/g, "").slice(0, 4);
      categoryDesigns[category].push({
        id: `${idPrefix}-${String(globalIndex).padStart(5, "0")}`,
        slug,
        title,
        descriptionParagraphs: generateUniqueDescription(category, bodyPart, occasion, difficulty, globalIndex, rng),
        category,
        categories: [category, ...pickNFromSeed(CATEGORIES.filter(c => c !== category), 2, rng)],
        region: ["arabic", "gulf"].includes(category) ? "gulf" : ["indian", "rajasthani"].includes(category) ? "india" : ["pakistani"].includes(category) ? "pakistan" : undefined,
        occasion,
        bodyPart,
        difficulty,
        tags,
        image: {
          src: img.src,
          width: 1080,
          height: 1350,
          alt: `${catInfo.style} ${titleCase(pattern)} mehndi design for ${titleCase(bodyPart).toLowerCase()} — ${adj} henna pattern`,
          credit: "HennaVerse Collection",
          license: "Unknown",
        },
        relatedIds: [],
        faq: generateUniqueFAQs(category, bodyPart, difficulty, globalIndex, rng),
      });
    }
  }

  // Write JSON files
  let totalWritten = 0;
  for (const [category, designs] of Object.entries(categoryDesigns)) {
    const outPath = join(DESIGNS_DIR, `${category}.json`);
    writeFileSync(outPath, JSON.stringify(designs, null, 2));
    console.log(`  [${category}] ${designs.length} designs`);
    totalWritten += designs.length;
  }

  console.log(`\n  Total: ${totalWritten} design entries written across ${CATEGORIES.length} categories.`);

  // Now compute related designs
  console.log("\nComputing related designs...");
  const allDesigns = Object.values(categoryDesigns).flat();
  const idMap = new Map(allDesigns.map((d) => [d.id, d]));

  for (const design of allDesigns) {
    const sameCategory = allDesigns
      .filter((d) => d.id !== design.id && d.category === design.category)
      .slice(0, 4)
      .map((d) => d.id);

    const sameBodyPart = allDesigns
      .filter((d) => d.id !== design.id && d.bodyPart === design.bodyPart && d.category !== design.category)
      .slice(0, 4)
      .map((d) => d.id);

    design.relatedIds = [...sameCategory, ...sameBodyPart].slice(0, 8);
  }

  // Re-write with related IDs
  for (const [category, designs] of Object.entries(categoryDesigns)) {
    const outPath = join(DESIGNS_DIR, `${category}.json`);
    writeFileSync(outPath, JSON.stringify(designs, null, 2));
  }

  console.log("  Related designs computed and written.\n");
  console.log(`Done! ${totalWritten} unique design pages ready.`);
  console.log("Next: run 'npm run build' to generate all static pages.");
}

main();
