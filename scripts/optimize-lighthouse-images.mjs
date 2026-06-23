import sharp from "sharp";
import { join, resolve } from "path";
import { existsSync, writeFileSync, unlinkSync, renameSync } from "fs";

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

async function writeSafely(filePath, buffer) {
  const tempPath = `${filePath}.tmp`;
  writeFileSync(tempPath, buffer);
  
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  } catch (err) {
    // If unlink fails, we'll try to let renameSync overwrite it
  }
  
  renameSync(tempPath, filePath);
}

async function optimize() {
  console.log("Starting Lighthouse image optimization (with safe write)...\n");

  // 1. Logo_Mehndidesign.png (resize to 528x168 and optimize compression)
  const logoPath = join(PUBLIC_DIR, "Logo_Mehndidesign.png");
  if (existsSync(logoPath)) {
    console.log("Optimizing Logo_Mehndidesign.png...");
    const buffer = await sharp(logoPath)
      .resize({ width: 528, height: 168, fit: "contain" })
      .png({ compressionLevel: 9, quality: 75 })
      .toBuffer();
    await writeSafely(logoPath, buffer);
    console.log("  Successfully optimized Logo_Mehndidesign.png!");
  }

  // 2. JPEGs: Apply quality compression (quality 60 is a standard sweet spot for web)
  const jpegs = [
    "eid-1000.jpeg",
    "bridal-3001.jpeg",
    "bridal-3000.jpeg",
    "Snapinsta.app_75272080_549807429192424_8548226213132767972_n_1080.jpg"
  ];
  for (const name of jpegs) {
    const filePath = join(PUBLIC_DIR, name);
    if (existsSync(filePath)) {
      console.log(`Optimizing JPEG: ${name}...`);
      const buffer = await sharp(filePath)
        .jpeg({ quality: 60, progressive: true })
        .toBuffer();
      await writeSafely(filePath, buffer);
      console.log(`  Successfully optimized JPEG: ${name}!`);
    }
  }

  // 3. AVIFs: Increase compression factor (avif quality 35 is standard for background/card images)
  const avifs = [
    "chakra-bridal-front-hand-mehndi-820x1024.avif",
    "wedding_salad.avif",
    "Snapinsta.app_119664771_171131687927465_5489743928879459640_n_1080.avif",
    "non_henna_by_divyaaa.avif",
    "b02e17fbd25d259f56c2d4275f15d406.avif",
    "328978478_228082722895910_7671478419807944337_n.avif"
  ];
  for (const name of avifs) {
    const filePath = join(PUBLIC_DIR, name);
    if (existsSync(filePath)) {
      console.log(`Optimizing AVIF: ${name}...`);
      const buffer = await sharp(filePath)
        .avif({ quality: 35, effort: 4 })
        .toBuffer();
      await writeSafely(filePath, buffer);
      console.log(`  Successfully optimized AVIF: ${name}!`);
    }
  }

  console.log("\nImage optimization complete!");
}

optimize().catch((err) => {
  console.error("Optimization failed:", err);
});
