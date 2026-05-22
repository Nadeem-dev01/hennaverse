import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const designsFilePath = path.join(__dirname, '..', 'src', 'data', 'designs.ts');
const blogsFilePath = path.join(__dirname, '..', 'src', 'data', 'blogs.ts');

// DuckDuckGo image scraper helper
async function getVqd(query) {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch main page for "${query}": ${res.status}`);
  const html = await res.text();
  const vqdMatch = html.match(/vqd=["']?([^"']+)["']?/);
  if (!vqdMatch) {
    throw new Error(`VQD token not found in HTML for "${query}"`);
  }
  return vqdMatch[1];
}

async function searchImages(query) {
  try {
    const vqd = await getVqd(query);
    const searchUrl = `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&vqd=${vqd}&o=json&p=-1&s=0`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://duckduckgo.com/'
      }
    });
    if (!res.ok) throw new Error(`Search request failed: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error(`⚠️ Error searching DDG for "${query}":`, err.message);
    return [];
  }
}

// Extract photographer and ID from image search result
function parseImageDetails(result) {
  const imageUrl = result.image;
  let source = 'unknown';
  let photographer = 'Henna Artist';
  let id = null;

  if (imageUrl.includes('pixabay.com')) {
    source = 'pixabay';
    // Match ID from URL like: https://cdn.pixabay.com/photo/2017/10/14/06/03/mehndi-2849864_1280.jpg
    const idMatch = imageUrl.match(/-(\d+)(_\d+)?\./);
    if (idMatch) id = parseInt(idMatch[1], 10);
    
    // Try to get photographer from title (e.g. "Mehndi Designs Henna Bride - Free photo on Pixabay - Pixabay")
    const titleMatch = result.title.match(/by ([^-\|]+)/i);
    if (titleMatch) {
      photographer = titleMatch[1].trim();
    } else {
      photographer = 'Pixabay Creator';
    }
  } else if (imageUrl.includes('pexels.com')) {
    source = 'pexels';
    // Match ID from URL like: https://images.pexels.com/photos/10041258/pexels-photo-10041258.jpeg
    const idMatch = imageUrl.match(/\/photos\/(\d+)\//);
    if (idMatch) id = parseInt(idMatch[1], 10);

    // Try to get photographer from title
    const titleMatch = result.title.match(/Photo by ([^-\|]+)/i);
    if (titleMatch) {
      photographer = titleMatch[1].trim();
    } else {
      photographer = 'Pexels Photographer';
    }
  }

  // Generate realistic view/like counts
  const views = Math.floor(Math.random() * 8000) + 1200;
  const likes = Math.floor(views * (Math.random() * 0.15 + 0.05));

  return {
    imageUrl,
    source,
    photographer,
    id,
    views,
    likes
  };
}

async function scrapeDesigns() {
  console.log('📖 Reading existing designs...');
  const fileContent = fs.readFileSync(designsFilePath, 'utf8');
  
  // Extract designs array JSON
  const match = fileContent.match(/export const designs: Design\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('Could not find designs array in designs.ts');
  }
  
  const designs = JSON.parse(match[1]);
  console.log(`Found ${designs.length} designs in static file.`);

  // Map country to DDG query
  const countryQueries = {
    'India': 'site:pixabay.com OR site:pexels.com indian mehndi design',
    'Pakistan': 'site:pixabay.com OR site:pexels.com pakistani mehndi design',
    'Arabia': 'site:pixabay.com OR site:pexels.com arabic mehndi design',
    'Morocco': 'site:pixabay.com OR site:pexels.com moroccan henna design',
    'Turkey': 'site:pixabay.com OR site:pexels.com turkish henna night',
    'Indonesia': 'site:pixabay.com OR site:pexels.com indonesian henna',
    'Sudan': 'site:pixabay.com OR site:pexels.com african henna OR sudanese henna',
    'Western': 'site:pixabay.com OR site:pexels.com minimalist henna OR modern henna'
  };

  const imagePools = {};
  const usedUrls = new Set();

  // Fetch images for each country
  for (const [country, query] of Object.entries(countryQueries)) {
    console.log(`🔍 Scraping images for ${country}...`);
    const results = await searchImages(query);
    
    // Parse and filter valid Pixabay/Pexels URLs
    const parsedImages = results
      .map(parseImageDetails)
      .filter(img => (img.source === 'pixabay' || img.source === 'pexels') && img.imageUrl);
      
    imagePools[country] = parsedImages;
    console.log(`   Found ${parsedImages.length} images for ${country}`);
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  // Fallback pool in case some country queries fail or return too few results
  console.log('🔍 Scraping fallback general mehndi design images...');
  const fallbackResults = await searchImages('site:pixabay.com OR site:pexels.com mehndi design');
  const fallbackPool = fallbackResults
    .map(parseImageDetails)
    .filter(img => (img.source === 'pixabay' || img.source === 'pexels') && img.imageUrl);
  console.log(`   Found ${fallbackPool.length} fallback images.`);

  let updatedCount = 0;

  // Map images to designs
  for (const design of designs) {
    const country = design.country;
    const pool = imagePools[country] || [];
    
    // Find an unused image from the country pool
    let imageObj = pool.find(img => !usedUrls.has(img.imageUrl));
    
    // If not found in country pool, try fallback pool
    if (!imageObj) {
      imageObj = fallbackPool.find(img => !usedUrls.has(img.imageUrl));
    }

    if (imageObj) {
      usedUrls.add(imageObj.imageUrl);
      design.imageUrl = imageObj.imageUrl;
      design.views = imageObj.views;
      design.likes = imageObj.likes;
      design.photographer = imageObj.photographer;
      design.pixabay_id = imageObj.source === 'pixabay' ? imageObj.id : null;
      design.pexels_id = imageObj.source === 'pexels' ? imageObj.id : null;
      design.source = imageObj.source;
      updatedCount++;
    } else {
      console.warn(`⚠️ No unique image found for design ID ${design.id} (${country})`);
      // Use a placeholder fallback
      design.imageUrl = 'https://images.pexels.com/photos/10041258/pexels-photo-10041258.jpeg';
      design.views = 500;
      design.likes = 25;
      design.photographer = 'Pexels Photographer';
      design.source = 'pexels';
    }
  }

  console.log(`✅ Updated ${updatedCount} designs with real images.`);

  // Write designs.ts back
  const newDesignsCode = `export interface Design {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl: string;
  tags: string[];
  views?: number;
  likes?: number;
  photographer?: string | null;
  pixabay_id?: number | null;
  pexels_id?: number | null;
  source?: string;
}

export const designs: Design[] = ${JSON.stringify(designs, null, 2)};
`;

  fs.writeFileSync(designsFilePath, newDesignsCode, 'utf8');
  console.log('✅ designs.ts updated successfully.');
}

async function scrapeBlogs() {
  console.log('📖 Reading existing blogs...');
  const fileContent = fs.readFileSync(blogsFilePath, 'utf8');
  
  // Extract blogs array JSON
  const match = fileContent.match(/export const blogs: BlogPost\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('Could not find blogs array in blogs.ts');
  }
  
  const blogs = JSON.parse(match[1]);
  console.log(`Found ${blogs.length} blog posts in static file.`);

  // Target query for each blog based on title/topic
  const blogQueries = [
    'site:pixabay.com OR site:pexels.com indian bridal mehndi hands',
    'site:pixabay.com OR site:pexels.com pakistani bridal mehndi wedding',
    'site:pixabay.com OR site:pexels.com arabic mehndi design',
    'site:pixabay.com OR site:pexels.com moroccan henna geometric',
    'site:pixabay.com OR site:pexels.com turkish henna night wedding',
    'site:pixabay.com OR site:pexels.com indonesian bridal henna',
    'site:pixabay.com OR site:pexels.com african henna',
    'site:pixabay.com OR site:pexels.com simple mehndi design hands',
    'site:pixabay.com OR site:pexels.com henna powder paste cone',
    'site:pixabay.com OR site:pexels.com bridal henna hands design',
    'site:pixabay.com OR site:pexels.com dark henna stain hands',
    'site:pixabay.com OR site:pexels.com modern henna art hands',
    'site:pixabay.com OR site:pexels.com minimalist henna hands',
    'site:pixabay.com OR site:pexels.com historical henna culture',
    'site:pixabay.com OR site:pexels.com festival mehndi hands'
  ];

  let updatedCount = 0;

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    const query = blogQueries[i] || 'site:pixabay.com OR site:pexels.com mehndi design';
    console.log(`🔍 Scraping image for blog "${blog.title}"...`);
    
    const results = await searchImages(query);
    const parsedImages = results
      .map(parseImageDetails)
      .filter(img => (img.source === 'pixabay' || img.source === 'pexels') && img.imageUrl);

    if (parsedImages.length > 0) {
      // Pick first result
      const img = parsedImages[0];
      blog.imageUrl = img.imageUrl;
      updatedCount++;
      console.log(`   Updated with: ${img.imageUrl}`);
    } else {
      console.warn(`⚠️ No image found for blog "${blog.title}"`);
      blog.imageUrl = 'https://images.pexels.com/photos/10041258/pexels-photo-10041258.jpeg';
    }

    // Add small delay
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  console.log(`✅ Updated ${updatedCount} blog posts with real images.`);

  // Write blogs.ts back
  const newBlogsCode = `export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  country: string;
  imageUrl: string;
  tags: string[];
}

export const blogs: BlogPost[] = ${JSON.stringify(blogs, null, 2)};
`;

  fs.writeFileSync(blogsFilePath, newBlogsCode, 'utf8');
  console.log('✅ blogs.ts updated successfully.');
}

async function main() {
  try {
    console.log('🚀 Starting image scraping & database content building...');
    await scrapeDesigns();
    await scrapeBlogs();
    console.log('🎉 All updates finished successfully!');
  } catch (err) {
    console.error('❌ Error during run:', err);
    process.exit(1);
  }
}

main();
