import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MAX_WIDTH = 800;

async function optimizeImagesInDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeImagesInDir(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.avif', '.webp'].includes(ext)) {
        console.log(`Optimizing: ${filePath}`);
        const tempPath = filePath + '.tmp';
        
        try {
          const image = sharp(filePath);
          const metadata = await image.metadata();
          
          let pipeline = image;
          
          // Resize if wider than MAX_WIDTH
          if (metadata.width && metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
          }

          // Compress based on format
          if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 60, progressive: true });
          } else if (ext === '.png') {
            pipeline = pipeline.png({ quality: 60, compressionLevel: 9 });
          } else if (ext === '.avif') {
            pipeline = pipeline.avif({ quality: 50 });
          } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 60 });
          }

          await pipeline.toFile(tempPath);
          
          // Check if smaller
          const originalSize = fs.statSync(filePath).size;
          const newSize = fs.statSync(tempPath).size;
          
          if (newSize < originalSize) {
            fs.renameSync(tempPath, filePath);
            console.log(`Saved ${(originalSize - newSize) / 1024 | 0} KB on ${file}`);
          } else {
            fs.unlinkSync(tempPath);
            console.log(`Skipped ${file} (already optimal)`);
          }
        } catch (err) {
          console.error(`Failed to optimize ${file}:`, err);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  await optimizeImagesInDir(PUBLIC_DIR);
  console.log('Finished image optimization!');
}

run();
