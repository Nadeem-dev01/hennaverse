#!/usr/bin/env node

/**
 * Process fetched images: resize, convert to WebP+AVIF, rename SEO-friendly.
 * Reads from scripts/.cache/originals/, writes to public/designs/[category]/
 * Usage: node scripts/process-images.mjs
 */

import { mkdirSync, existsSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join, resolve } from "path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const CACHE_DIR = join(ROOT, "scripts", ".cache", "originals");
const MANIFEST_PATH = join(ROOT, "scripts", ".cache", "fetch-manifest.json");
const OUTPUT_DIR = join(ROOT, "public", "designs");
const PROCESSED_MANIFEST = join(ROOT, "scripts", ".cache", "processed-manifest.json");

const TARGET_WIDTH = 1080;
const WEBP_QUALITY = 72;
const AVIF_QUALITY = 50;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function processImage(inputPath, outputBase, category, index) {
  const seoName = `${category}-mehndi-design-${String(index).padStart(4, "0")}`;
  const webpPath = join(outputBase, `${seoName}.webp`);
  const avifPath = join(outputBase, `${seoName}.avif`);

  if (existsSync(webpPath) && existsSync(avifPath)) {
    const meta = await sharp(webpPath).metadata();
    return { webpPath: `/designs/${category}/${seoName}.webp`, avifPath: `/designs/${category}/${seoName}.avif`, width: meta.width, height: meta.height, skipped: true };
  }

  try {
    const img = sharp(inputPath).resize({ width: TARGET_WIDTH, withoutEnlargement: true });
    const meta = await img.metadata();

    await img.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    await img.clone().avif({ quality: AVIF_QUALITY }).toFile(avifPath);

    const outMeta = await sharp(webpPath).metadata();
    return {
      webpPath: `/designs/${category}/${seoName}.webp`,
      avifPath: `/designs/${category}/${seoName}.avif`,
      width: outMeta.width,
      height: outMeta.height,
      skipped: false,
    };
  } catch (e) {
    console.warn(`  Failed to process ${inputPath}: ${e.message}`);
    return null;
  }
}

async function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error("No fetch manifest found. Run fetch-images.mjs first.");
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  const processed = existsSync(PROCESSED_MANIFEST)
    ? JSON.parse(readFileSync(PROCESSED_MANIFEST, "utf-8"))
    : {};

  let totalProcessed = 0;
  let totalSkipped = 0;

  console.log("Processing images...\n");

  for (const [category, entries] of Object.entries(manifest)) {
    if (!entries.length) continue;

    const catDir = join(OUTPUT_DIR, category);
    mkdirSync(catDir, { recursive: true });

    if (!processed[category]) processed[category] = [];
    let idx = processed[category].length;

    console.log(`  [${category}] ${entries.length} source images, ${idx} already processed`);

    for (const entry of entries) {
      if (processed[category].some((p) => p.sourceId === entry.sourceId)) continue;

      const inputPath = join(CACHE_DIR, entry.localFile);
      if (!existsSync(inputPath)) continue;

      idx++;
      const result = await processImage(inputPath, catDir, category, idx);
      if (!result) continue;

      processed[category].push({
        sourceId: entry.sourceId,
        credit: entry.credit,
        creditUrl: entry.creditUrl,
        license: entry.license,
        licenseUrl: entry.licenseUrl,
        description: entry.description,
        webpPath: result.webpPath,
        avifPath: result.avifPath,
        width: result.width,
        height: result.height,
      });

      if (result.skipped) totalSkipped++;
      else totalProcessed++;
    }

    console.log(`    → ${processed[category].length} processed`);
  }

  writeFileSync(PROCESSED_MANIFEST, JSON.stringify(processed, null, 2));
  console.log(`\nDone. ${totalProcessed} new, ${totalSkipped} skipped.`);
  console.log(`Manifest: ${PROCESSED_MANIFEST}`);
  console.log("\nNext step: node scripts/build-design-entries.mjs");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
