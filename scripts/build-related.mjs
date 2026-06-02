#!/usr/bin/env node

/**
 * Compute relatedIds for each design based on shared categories, tags, occasion, bodyPart.
 * Updates existing src/data/designs/*.json files in-place.
 * Usage: node scripts/build-related.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DESIGNS_DIR = join(ROOT, "src", "data", "designs");
const MAX_RELATED = 8;

function loadAllDesigns() {
  const files = readdirSync(DESIGNS_DIR).filter((f) => f.endsWith(".json"));
  const all = [];
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(DESIGNS_DIR, file), "utf-8"));
    all.push(...data);
  }
  return all;
}

function score(a, b) {
  if (a.id === b.id) return -1;
  let s = 0;
  for (const cat of a.categories || []) {
    if ((b.categories || []).includes(cat)) s += 3;
  }
  if (a.occasion && a.occasion === b.occasion) s += 2;
  if (a.bodyPart && a.bodyPart === b.bodyPart) s += 2;
  if (a.difficulty === b.difficulty) s += 1;
  for (const tag of a.tags || []) {
    if ((b.tags || []).includes(tag)) s += 1;
  }
  return s;
}

function main() {
  const all = loadAllDesigns();
  if (all.length === 0) {
    console.log("No designs found — nothing to do.");
    return;
  }

  console.log(`Computing related designs for ${all.length} entries...\n`);

  const idMap = new Map(all.map((d) => [d.id, d]));

  for (const design of all) {
    const scored = all
      .filter((other) => other.id !== design.id)
      .map((other) => ({ id: other.id, score: score(design, other) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RELATED);

    design.relatedIds = scored.map((s) => s.id);
  }

  const byCategory = new Map();
  for (const d of all) {
    const cat = d.category;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(d);
  }

  for (const [category, designs] of byCategory) {
    const outPath = join(DESIGNS_DIR, `${category}.json`);
    writeFileSync(outPath, JSON.stringify(designs, null, 2));
    console.log(`  [${category}] ${designs.length} designs updated`);
  }

  console.log("\nDone.");
}

main();
