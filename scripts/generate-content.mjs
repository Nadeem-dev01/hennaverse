#!/usr/bin/env node

/**
 * Generate unique descriptions and FAQs for each design entry.
 * Uses fact banks + per-design attributes to create varied content.
 * For AI-assisted generation, set ANTHROPIC_API_KEY in .env.local.
 * Without an API key, generates template-based content from fact banks.
 *
 * Usage: node scripts/generate-content.mjs [--category=arabic] [--force]
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DESIGNS_DIR = join(ROOT, "src", "data", "designs");
const FACTBANKS_DIR = join(ROOT, "src", "data", "factbanks");

// Parse CLI args
const args = process.argv.slice(2);
const targetCategory = args.find((a) => a.startsWith("--category="))?.split("=")[1];
const forceOverwrite = args.includes("--force");

function loadFactbank(category) {
  const path = join(FACTBANKS_DIR, `${category}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8"));
}

function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateDescription(design, factbank) {
  const catTitle = titleCase(design.category.replace(/-/g, " "));
  const paras = [];

  const difficultyDescr = {
    Easy: "beginner-friendly and quick to apply",
    Medium: "moderately detailed with a balanced level of intricacy",
    Hard: "intricate and requiring skilled application",
    Expert: "highly complex and demanding expert-level artistry",
  };

  paras.push(
    `This ${catTitle} mehndi design showcases ${design.tags.slice(0, 3).join(", ")} elements in a composition that is ${difficultyDescr[design.difficulty] || "beautifully crafted"}. ` +
    (design.bodyPart ? `Designed for the ${design.bodyPart.replace(/-/g, " ")}, it ` : "It ") +
    `captures the essence of ${catTitle.toLowerCase()} henna artistry with attention to both form and flow.`
  );

  if (factbank?.culturalBackground?.length) {
    const facts = pickRandom(factbank.culturalBackground, 2);
    paras.push(facts.join(" ") + ` This design draws from these rich traditions while adding its own unique character.`);
  }

  if (factbank?.motifs?.length) {
    const motifs = pickRandom(factbank.motifs, 3);
    paras.push(
      `Key motifs in this design include ${motifs.join(", ")}. ` +
      `These elements work together to create a harmonious pattern that is both visually striking and culturally meaningful.`
    );
  }

  if (design.occasion) {
    paras.push(
      `This design is particularly well-suited for ${design.occasion.replace(/-/g, " ")} celebrations, ` +
      `where its ${design.difficulty === "Easy" ? "simplicity makes it a practical choice" : "detailed artistry makes a memorable statement"}.`
    );
  }

  return paras;
}

function generateFAQs(design, factbank) {
  const catTitle = titleCase(design.category.replace(/-/g, " "));
  const faqs = [];

  if (factbank?.faqPool?.length) {
    const selected = pickRandom(factbank.faqPool, Math.min(3, factbank.faqPool.length));
    faqs.push(...selected);
  }

  if (faqs.length < 2) {
    faqs.push({
      q: `How difficult is this ${catTitle} mehndi design?`,
      a: `This design is rated "${design.difficulty}". ${design.difficulty === "Easy" ? "It is suitable for beginners and can be completed in under 30 minutes." : design.difficulty === "Medium" ? "It requires some practice but is achievable for intermediate henna artists." : "It demands skilled artistry and patience, typically taking 45-90 minutes to complete."}`,
    });
  }

  if (faqs.length < 3 && design.bodyPart) {
    faqs.push({
      q: `What's the best body placement for this design?`,
      a: `This design is optimized for the ${design.bodyPart.replace(/-/g, " ")}. The pattern's proportions and flow are tailored to complement this area naturally.`,
    });
  }

  return faqs.slice(0, 4);
}

function main() {
  const files = readdirSync(DESIGNS_DIR).filter((f) => f.endsWith(".json"));
  let totalUpdated = 0;
  let totalSkipped = 0;

  console.log("Generating content for design entries...\n");

  for (const file of files) {
    const category = file.replace(".json", "");
    if (targetCategory && category !== targetCategory) continue;

    const filePath = join(DESIGNS_DIR, file);
    const designs = JSON.parse(readFileSync(filePath, "utf-8"));
    if (!designs.length) continue;

    const factbank = loadFactbank(category);
    let updated = 0;

    for (const design of designs) {
      const hasContent = design.descriptionParagraphs?.length > 0;
      if (hasContent && !forceOverwrite) {
        totalSkipped++;
        continue;
      }

      design.descriptionParagraphs = generateDescription(design, factbank);
      design.faq = generateFAQs(design, factbank);
      updated++;
    }

    if (updated > 0) {
      writeFileSync(filePath, JSON.stringify(designs, null, 2));
    }

    console.log(`  [${category}] ${updated} updated, ${designs.length - updated} skipped`);
    totalUpdated += updated;
  }

  console.log(`\nDone. ${totalUpdated} designs updated, ${totalSkipped} skipped.`);
}

main();
