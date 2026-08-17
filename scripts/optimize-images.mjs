/**
 * optimize-images.mjs
 * Converts the flagged large images to AVIF with proper compression.
 * Run once: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Images to convert/compress. Each entry: { input, output, width? }
// width = resize to this max width (maintaining aspect ratio), undefined = no resize
const tasks = [
  // The biggest culprit: 754 KB JPEG → AVIF, resize to 900px wide (blog card max ~662px displayed)
  {
    input: 'asian-henna-floral-paisley-design.jpg',
    output: 'asian-henna-floral-paisley-design.avif',
    width: 900,
    quality: 65,
  },
  // eid-1000.jpeg → AVIF
  {
    input: 'eid-1000.jpeg',
    output: 'eid-1000.avif',
    width: 900,
    quality: 65,
  },
  // Logo PNG → WebP (logos have transparency - use WebP not AVIF for wider compat)
  {
    input: 'Logo_Mehndidesign.png',
    output: 'Logo_Mehndidesign.webp',
    quality: 85,
  },
  // bridal-3000.jpeg - downsize (displayed 662x496 but file is 800x499)
  {
    input: 'bridal-3000.jpeg',
    output: 'bridal-3000.avif',
    width: 800,
    quality: 65,
  },
  // wedding_salad.avif - recompress at higher ratio
  {
    input: 'wedding_salad.avif',
    output: 'wedding_salad_opt.avif',
    quality: 50,
  },
  // non_henna_by_divyaaa.avif - recompress
  {
    input: 'non_henna_by_divyaaa.avif',
    output: 'non_henna_by_divyaaa_opt.avif',
    quality: 50,
  },
  // Snapinsta jpg → avif
  {
    input: 'Snapinsta.app_75272080_549807429192424_8548226213132767972_n_1080.jpg',
    output: 'Snapinsta.app_75272080_549807429192424_8548226213132767972_n_1080.avif',
    quality: 60,
  },
];

for (const task of tasks) {
  const inputPath = join(publicDir, task.input);
  const outputPath = join(publicDir, task.output);

  if (!existsSync(inputPath)) {
    console.log(`⚠  SKIP (not found): ${task.input}`);
    continue;
  }

  const inputSize = Math.round(statSync(inputPath).size / 1024);

  try {
    let pipeline = sharp(inputPath);

    if (task.width) {
      pipeline = pipeline.resize({ width: task.width, withoutEnlargement: true });
    }

    // Determine output format from extension
    const ext = task.output.split('.').pop().toLowerCase();
    if (ext === 'avif') {
      pipeline = pipeline.avif({ quality: task.quality ?? 65, effort: 6 });
    } else if (ext === 'webp') {
      pipeline = pipeline.webp({ quality: task.quality ?? 80, effort: 6 });
    } else {
      pipeline = pipeline.jpeg({ quality: task.quality ?? 80, mozjpeg: true });
    }

    await pipeline.toFile(outputPath);

    const outputSize = Math.round(statSync(outputPath).size / 1024);
    const savings = Math.round(((inputSize - outputSize) / inputSize) * 100);
    console.log(`✓  ${task.input} → ${task.output}: ${inputSize}KB → ${outputSize}KB (${savings}% saved)`);
  } catch (err) {
    console.error(`✗  ERROR converting ${task.input}:`, err.message);
  }
}

console.log('\nDone! Remember to update any code references to use the new file names.');
