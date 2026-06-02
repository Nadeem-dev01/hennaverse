#!/usr/bin/env node

/**
 * Pre-build data validator. Exits 1 on any failure to block broken builds.
 * Run: node scripts/validate-data.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { createHash } from "crypto";

const ROOT = resolve(import.meta.dirname, "..");
const DESIGNS_DIR = join(ROOT, "src", "data", "designs");
const PUBLIC_DIR = join(ROOT, "public");

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  WARN: ${msg}`);
  warnings++;
}

function loadJsonFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const path = join(dir, f);
      return { file: f, data: JSON.parse(readFileSync(path, "utf-8")) };
    });
}

function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function textHash(text) {
  return createHash("md5").update(normalizeText(text)).digest("hex");
}

console.log("Validating design data...\n");

if (!existsSync(DESIGNS_DIR)) {
  console.log("  No src/data/designs/ directory yet — skipping.\n");
  console.log("Validation passed (no data to validate).\n");
  process.exit(0);
}

const files = loadJsonFiles(DESIGNS_DIR);
const allDesigns = files.flatMap((f) => f.data);

if (allDesigns.length === 0) {
  console.log(`  Found ${files.length} JSON files, all empty — skipping detailed checks.\n`);
  console.log("Validation passed (no designs yet).\n");
  process.exit(0);
}

console.log(`  Found ${allDesigns.length} designs across ${files.length} files.\n`);

// --- Checks ---

const slugs = new Set();
const ids = new Set();
const titles = new Set();
const descriptionHashes = new Map();
const phashes = new Map();

for (const design of allDesigns) {
  // Duplicate ID
  if (design.id) {
    if (ids.has(design.id)) error(`Duplicate id: "${design.id}"`);
    ids.add(design.id);
  }

  // Duplicate slug
  if (design.slug) {
    if (slugs.has(design.slug)) error(`Duplicate slug: "${design.slug}"`);
    slugs.add(design.slug);
  }

  // Duplicate title
  if (design.title) {
    if (titles.has(design.title)) error(`Duplicate title: "${design.title}"`);
    titles.add(design.title);
  }

  // Required fields
  if (!design.id) error(`Design missing id (slug: ${design.slug || "unknown"})`);
  if (!design.slug) error(`Design "${design.id}" missing slug`);
  if (!design.title) error(`Design "${design.slug || design.id}" missing title`);
  if (!design.category) error(`Design "${design.slug}" missing category`);
  if (!design.categories || !design.categories.length) error(`Design "${design.slug}" missing categories array`);
  if (!design.descriptionParagraphs || !design.descriptionParagraphs.length) {
    warn(`Design "${design.slug}" has no description paragraphs`);
  }
  if (!design.difficulty) warn(`Design "${design.slug}" missing difficulty`);

  // Image existence
  if (design.image?.src) {
    const imgPath = join(PUBLIC_DIR, design.image.src);
    if (!existsSync(imgPath)) {
      error(`Image not found: ${design.image.src} (design: ${design.slug})`);
    }
  } else {
    error(`Design "${design.slug}" has no image.src`);
  }

  // Image metadata
  if (design.image) {
    if (!design.image.alt) warn(`Missing alt text: ${design.slug}`);
    if (!design.image.credit) warn(`Missing credit: ${design.slug}`);
    if (!design.image.license) warn(`Missing license: ${design.slug}`);
    if (!design.image.width || !design.image.height) warn(`Missing image dimensions: ${design.slug}`);
  }

  // Near-duplicate description detection
  if (design.descriptionParagraphs?.length) {
    const joined = design.descriptionParagraphs.join(" ");
    const hash = textHash(joined);
    if (descriptionHashes.has(hash)) {
      error(`Near-duplicate description: "${design.slug}" matches "${descriptionHashes.get(hash)}"`);
    }
    descriptionHashes.set(hash, design.slug);
  }

  // Perceptual hash collision (same image used twice)
  if (design.image?.phash) {
    if (phashes.has(design.image.phash)) {
      warn(`Possible duplicate image (same phash): "${design.slug}" matches "${phashes.get(design.image.phash)}"`);
    }
    phashes.set(design.image.phash, design.slug);
  }

  // Related IDs integrity
  if (design.relatedIds) {
    for (const rid of design.relatedIds) {
      if (!allDesigns.some((d) => d.id === rid)) {
        error(`Broken relatedId "${rid}" in design "${design.slug}"`);
      }
    }
  }

  // FAQ validation
  if (design.faq) {
    for (const entry of design.faq) {
      if (!entry.q || !entry.a) warn(`Incomplete FAQ entry in "${design.slug}"`);
    }
  }
}

// --- Combo gate check ---
try {
  const taxonomyPath = join(ROOT, "src", "data", "taxonomy.ts");
  if (existsSync(taxonomyPath)) {
    const taxonomySrc = readFileSync(taxonomyPath, "utf-8");
    const comboMatch = taxonomySrc.match(/minDesigns:\s*(\d+)/g);
    if (comboMatch) {
      console.log(`  Found ${comboMatch.length} combo page definitions in taxonomy.ts`);
    }
  }
} catch {
  // taxonomy check is best-effort
}

console.log("");
console.log(`  ${errors} error(s), ${warnings} warning(s)`);
console.log("");

if (errors > 0) {
  console.error(`VALIDATION FAILED: ${errors} error(s) found.\n`);
  process.exit(1);
} else {
  console.log("Validation passed.\n");
}
