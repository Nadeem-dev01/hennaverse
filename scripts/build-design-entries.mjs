#!/usr/bin/env node

/**
 * Generate JSON design entries from processed image manifest.
 * Writes to src/data/designs/[category].json
 * Usage: node scripts/build-design-entries.mjs
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const PROCESSED_MANIFEST = join(ROOT, "scripts", ".cache", "processed-manifest.json");
const DESIGNS_DIR = join(ROOT, "src", "data", "designs");

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateSlug(category, index, bodyPart) {
  const parts = [category];
  if (bodyPart) parts.push(bodyPart);
  parts.push("mehndi-design");
  parts.push(String(index).padStart(4, "0"));
  return parts.join("-");
}

function generateTitle(category, index) {
  const catTitle = titleCase(category.replace(/-/g, " "));
  return `${catTitle} Mehndi Design #${index}`;
}

function main() {
  if (!existsSync(PROCESSED_MANIFEST)) {
    console.error("No processed manifest found. Run process-images.mjs first.");
    process.exit(1);
  }

  const processed = JSON.parse(readFileSync(PROCESSED_MANIFEST, "utf-8"));
  let totalEntries = 0;

  console.log("Building design entries...\n");

  for (const [category, images] of Object.entries(processed)) {
    if (!images.length) continue;

    const entries = images.map((img, i) => {
      const idx = i + 1;
      const slug = generateSlug(category, idx);
      const title = generateTitle(category, idx);
      const catTitle = titleCase(category.replace(/-/g, " "));

      return {
        id: `${category.slice(0, 3)}-${String(idx).padStart(4, "0")}`,
        slug,
        title,
        descriptionParagraphs: [],
        category,
        categories: [category],
        difficulty: "Medium",
        tags: [category.replace(/-/g, " ")],
        image: {
          src: img.webpPath,
          srcAvif: img.avifPath,
          width: img.width,
          height: img.height,
          alt: `${catTitle} mehndi pattern ${idx} — ${img.description || "beautiful henna design"}`.slice(0, 150),
          credit: img.credit,
          creditUrl: img.creditUrl || "",
          license: img.license,
          licenseUrl: img.licenseUrl || "",
          sourceId: img.sourceId,
        },
        relatedIds: [],
        faq: [],
      };
    });

    const outPath = join(DESIGNS_DIR, `${category}.json`);
    writeFileSync(outPath, JSON.stringify(entries, null, 2));
    console.log(`  [${category}] ${entries.length} entries → ${category}.json`);
    totalEntries += entries.length;
  }

  console.log(`\nDone. ${totalEntries} total design entries written.`);
  console.log("Next steps:");
  console.log("  1. node scripts/generate-content.mjs  (add descriptions & FAQs)");
  console.log("  2. node scripts/build-related.mjs     (compute related designs)");
}

main();
