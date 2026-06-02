#!/usr/bin/env node

/**
 * Fetch mehndi/henna images from licensed stock APIs.
 * Usage: node scripts/fetch-images.mjs
 *
 * Requires env vars: UNSPLASH_KEY, PEXELS_KEY, PIXABAY_KEY
 * At least one must be set. Create a .env.local file with your keys.
 */

import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";
import { join, resolve } from "path";
import https from "https";

const ROOT = resolve(import.meta.dirname, "..");
const CACHE_DIR = join(ROOT, "scripts", ".cache", "originals");
const MANIFEST_PATH = join(ROOT, "scripts", ".cache", "fetch-manifest.json");

// Load env from .env.local if present
try {
  const envPath = join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([A-Z_]+)=(.+)$/);
      if (match) process.env[match[1]] = match[2].trim();
    }
  }
} catch { /* ignore */ }

const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const PEXELS_KEY = process.env.PEXELS_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY;

const CATEGORY_KEYWORDS = {
  arabic: ["arabic mehndi", "arabic henna design", "arabic henna hand"],
  indian: ["indian mehndi design", "indian henna bridal", "indian henna hand"],
  pakistani: ["pakistani mehndi", "pakistani henna design"],
  moroccan: ["moroccan henna", "moroccan henna hand", "berber henna"],
  gulf: ["gulf henna", "khaleeji henna", "dubai henna"],
  african: ["african henna", "sudanese henna", "west african henna"],
  turkish: ["turkish henna", "turkish henna hand"],
  rajasthani: ["rajasthani mehndi", "marwari mehndi"],
  indonesian: ["indonesian henna", "henna batik"],
  bridal: ["bridal mehndi", "wedding henna", "bridal henna hand"],
  simple: ["simple mehndi design", "easy henna", "simple henna hand"],
  modern: ["modern mehndi", "contemporary henna", "fusion henna"],
  traditional: ["traditional mehndi", "classic henna design"],
  minimal: ["minimal mehndi", "minimalist henna", "delicate henna"],
  floral: ["floral mehndi", "flower henna design", "rose henna"],
  mandala: ["mandala mehndi", "mandala henna hand"],
  geometric: ["geometric henna", "geometric mehndi design"],
  jewelry: ["jewelry mehndi", "hathphool henna", "ornamental mehndi"],
  royal: ["royal mehndi design", "mughal henna", "palace mehndi"],
  "full-hand": ["full hand mehndi", "full hand henna"],
  "back-hand": ["back hand mehndi", "backhand henna design"],
  "front-hand": ["front hand mehndi", "palm henna design"],
  finger: ["finger mehndi", "finger henna design", "ring henna"],
  foot: ["foot mehndi", "feet henna design", "leg henna"],
  eid: ["eid mehndi", "eid henna design", "ramadan henna"],
  kids: ["kids mehndi", "children henna", "easy kids henna"],
};

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location, headers).then(resolve, reject);
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const body = Buffer.concat(chunks);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ body, contentType: res.headers["content-type"] });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body.toString().slice(0, 200)}`));
        }
      });
    });
    req.on("error", reject);
  });
}

async function fetchUnsplash(query, perPage = 30) {
  if (!UNSPLASH_KEY) return [];
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`;
  try {
    const { body } = await httpGet(url, { Authorization: `Client-ID ${UNSPLASH_KEY}` });
    const data = JSON.parse(body.toString());
    return (data.results || []).map((p) => ({
      sourceId: `unsplash-${p.id}`,
      downloadUrl: p.urls.regular,
      credit: p.user.name,
      creditUrl: p.user.links.html,
      license: "Unsplash",
      licenseUrl: "https://unsplash.com/license",
      width: p.width,
      height: p.height,
      description: p.description || p.alt_description || "",
    }));
  } catch (e) {
    console.warn(`  Unsplash error for "${query}": ${e.message}`);
    return [];
  }
}

async function fetchPexels(query, perPage = 30) {
  if (!PEXELS_KEY) return [];
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`;
  try {
    const { body } = await httpGet(url, { Authorization: PEXELS_KEY });
    const data = JSON.parse(body.toString());
    return (data.photos || []).map((p) => ({
      sourceId: `pexels-${p.id}`,
      downloadUrl: p.src.large,
      credit: p.photographer,
      creditUrl: p.photographer_url,
      license: "Pexels",
      licenseUrl: "https://www.pexels.com/license/",
      width: p.width,
      height: p.height,
      description: p.alt || "",
    }));
  } catch (e) {
    console.warn(`  Pexels error for "${query}": ${e.message}`);
    return [];
  }
}

async function fetchPixabay(query, perPage = 30) {
  if (!PIXABAY_KEY) return [];
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}&image_type=photo&orientation=vertical`;
  try {
    const { body } = await httpGet(url, {});
    const data = JSON.parse(body.toString());
    return (data.hits || []).map((p) => ({
      sourceId: `pixabay-${p.id}`,
      downloadUrl: p.largeImageURL,
      credit: p.user,
      creditUrl: `https://pixabay.com/users/${p.user}-${p.user_id}/`,
      license: "Pixabay",
      licenseUrl: "https://pixabay.com/service/license-summary/",
      width: p.imageWidth,
      height: p.imageHeight,
      description: p.tags || "",
    }));
  } catch (e) {
    console.warn(`  Pixabay error for "${query}": ${e.message}`);
    return [];
  }
}

async function downloadImage(url, destPath) {
  try {
    const { body } = await httpGet(url);
    writeFileSync(destPath, body);
    return true;
  } catch (e) {
    console.warn(`  Download failed: ${e.message}`);
    return false;
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!UNSPLASH_KEY && !PEXELS_KEY && !PIXABAY_KEY) {
    console.error("ERROR: Set at least one of UNSPLASH_KEY, PEXELS_KEY, PIXABAY_KEY in .env.local");
    process.exit(1);
  }

  console.log("Fetching mehndi images from licensed APIs...\n");
  console.log(`  APIs available: ${[UNSPLASH_KEY && "Unsplash", PEXELS_KEY && "Pexels", PIXABAY_KEY && "Pixabay"].filter(Boolean).join(", ")}\n`);

  mkdirSync(join(ROOT, "scripts", ".cache"), { recursive: true });

  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"))
    : {};

  const seenSourceIds = new Set(Object.values(manifest).flatMap((cat) => cat.map((e) => e.sourceId)));
  let totalNew = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const catDir = join(CACHE_DIR, category);
    mkdirSync(catDir, { recursive: true });

    if (!manifest[category]) manifest[category] = [];
    const existing = manifest[category].length;

    console.log(`  [${category}] ${existing} existing, searching...`);

    for (const keyword of keywords) {
      const results = [
        ...(await fetchUnsplash(keyword, 20)),
        ...(await fetchPexels(keyword, 20)),
        ...(await fetchPixabay(keyword, 20)),
      ];

      for (const result of results) {
        if (seenSourceIds.has(result.sourceId)) continue;
        seenSourceIds.add(result.sourceId);

        const ext = result.downloadUrl.match(/\.(jpg|jpeg|png|webp)/i)?.[1] || "jpg";
        const filename = `${result.sourceId}.${ext}`;
        const destPath = join(catDir, filename);

        if (!existsSync(destPath)) {
          const ok = await downloadImage(result.downloadUrl, destPath);
          if (!ok) continue;
          await sleep(200);
        }

        manifest[category].push({
          ...result,
          localFile: `${category}/${filename}`,
        });
        totalNew++;
      }
    }

    console.log(`    → ${manifest[category].length} total (${manifest[category].length - existing} new)`);
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${totalNew} new images fetched. Manifest: ${MANIFEST_PATH}`);
  console.log("\nNext step: node scripts/process-images.mjs");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
