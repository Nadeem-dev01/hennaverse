import google from 'googlethis';
import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';

const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'bridal');
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'designs.ts');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

function generateNewDesigns(images) {
  return images.map((imgUrl, index) => {
    const id = 3000 + index;
    const filename = `bridal-${id}.jpg`;
    return {
      id,
      title: `Bridal Mehndi Look ${index + 1}`,
      description: `A stunning and intricate Bridal Mehndi design specially curated for grand celebrations. This elegant pattern features beautiful motifs that will make your special day unforgettable.`,
      country: 'Global',
      style: 'Bridal',
      occasion: 'Wedding',
      difficulty: 'Expert',
      imageUrl: `/bridal/${filename}`,
      tags: ['Bridal', 'Wedding', 'Mehndi', 'Celebration']
    };
  });
}

async function run() {
  try {
    console.log("Searching Google Images...");
    const images = await google.image('bridal mehndi designs for eid', { safe: false });
    console.log(`Found ${images.length} images.`);
    
    if (images.length === 0) return;
    
    const limit = Math.min(images.length, 100);
    const imagesToDownload = images.slice(0, limit);
    const designsData = generateNewDesigns(imagesToDownload);
    const downloadedUrls = [];
    
    const batchSize = 10;
    for (let i = 0; i < imagesToDownload.length; i += batchSize) {
      const batch = imagesToDownload.slice(i, i + batchSize);
      const batchData = designsData.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (img, idx) => {
        const url = img.url;
        const data = batchData[idx];
        const filename = `bridal-${data.id}.jpg`;
        const dest = path.join(DOWNLOAD_DIR, filename);
        try {
          await downloadImage(url, dest);
          downloadedUrls.push(data);
          console.log(`Downloaded: ${filename}`);
        } catch (err) {
          // ignore
        }
      }));
    }

    if (downloadedUrls.length > 0) {
      let existingContent = fs.readFileSync(DATA_FILE, 'utf8');
      const arrayEndIndex = existingContent.lastIndexOf('];');
      if (arrayEndIndex !== -1) {
        const dataToAppend = downloadedUrls.map(d => `  ${JSON.stringify(d, null, 2).replace(/\n/g, '\n  ')}`).join(',\n');
        const newContent = existingContent.substring(0, arrayEndIndex) + ',\n' + dataToAppend + '\n];\n';
        fs.writeFileSync(DATA_FILE, newContent, 'utf8');
        console.log(`Added ${downloadedUrls.length} new Bridal designs to src/data/designs.ts`);
      }
    }
  } catch (err) {
    console.error('Error fetching images:', err);
  }
}

run();
