/**
 * HennaVerse Pixabay Image Seeder
 * 
 * Fetches real mehndi/henna images from Pixabay API and seeds them into Supabase.
 * 
 * Usage:
 *   PIXABAY_API_KEY=xxx NEXT_PUBLIC_SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-designs.mjs
 */

import { createClient } from '@supabase/supabase-js';

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!PIXABAY_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing environment variables. Required:');
  console.error('   PIXABAY_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Search queries mapped to categories/styles
const SEARCH_QUERIES = [
  // India
  { query: 'mehndi design hand', country: 'India', style: 'Rajasthani', occasion: 'Wedding', limit: 5 },
  { query: 'bridal mehndi henna', country: 'India', style: 'Bridal', occasion: 'Wedding', limit: 5 },
  { query: 'mandala henna design', country: 'India', style: 'Mandala', occasion: 'Festival', limit: 4 },
  { query: 'peacock mehndi art', country: 'India', style: 'Peacock', occasion: 'Diwali', limit: 3 },
  { query: 'south indian mehndi', country: 'India', style: 'South Indian', occasion: 'Festival', limit: 3 },
  // Pakistan
  { query: 'pakistani mehndi bridal', country: 'Pakistan', style: 'Bridal', occasion: 'Wedding', limit: 5 },
  { query: 'tikki mehndi design', country: 'Pakistan', style: 'Tikki', occasion: 'Eid', limit: 4 },
  { query: 'geometric henna pattern', country: 'Pakistan', style: 'Geometric', occasion: 'Engagement', limit: 3 },
  { query: 'floral henna hand', country: 'Pakistan', style: 'Floral', occasion: 'Party', limit: 3 },
  // Arabia
  { query: 'arabic mehndi design', country: 'Arabia', style: 'Arabic bold', occasion: 'Eid', limit: 5 },
  { query: 'gulf khaleeji henna', country: 'Arabia', style: 'Gulf', occasion: 'Wedding', limit: 5 },
  { query: 'arabic henna minimal', country: 'Arabia', style: 'Minimal Arabic', occasion: 'Casual', limit: 5 },
  // Morocco
  { query: 'moroccan henna design', country: 'Morocco', style: 'Berber', occasion: 'Festival', limit: 5 },
  { query: 'berber tribal henna', country: 'Morocco', style: 'Tribal', occasion: 'Festival', limit: 4 },
  { query: 'geometric henna moroccan', country: 'Morocco', style: 'Geometric', occasion: 'Casual', limit: 3 },
  // Turkey
  { query: 'turkish henna night', country: 'Turkey', style: 'Ottoman', occasion: 'Wedding', limit: 5 },
  { query: 'ottoman floral pattern', country: 'Turkey', style: 'Floral Turkish', occasion: 'Engagement', limit: 5 },
  // Indonesia
  { query: 'javanese henna art', country: 'Indonesia', style: 'Javanese', occasion: 'Wedding', limit: 5 },
  { query: 'balinese henna design', country: 'Indonesia', style: 'Balinese', occasion: 'Festival', limit: 5 },
  // Sudan/Africa
  { query: 'african henna design', country: 'Sudan', style: 'African Tribal', occasion: 'Festival', limit: 4 },
  { query: 'sudanese henna tattoo', country: 'Sudan', style: 'Sudanese', occasion: 'Wedding', limit: 4 },
  // Western/Fusion
  { query: 'minimalist henna tattoo', country: 'Western', style: 'Minimalist', occasion: 'Casual', limit: 5 },
  { query: 'modern geometric henna', country: 'Western', style: 'Geometric Modern', occasion: 'Party', limit: 5 },
];

// Category metadata
const CATEGORIES = [
  { name: 'India', slug: 'india', flag: '🇮🇳', description: 'India is the heartland of mehndi art, with traditions spanning over 5000 years. From intricate Rajasthani patterns to elegant Mughal motifs, Indian mehndi is renowned for its complexity and cultural significance.', traditions: 'Mehndi is an essential part of Indian weddings, festivals like Karva Chauth, Teej, and Diwali. The darkness of the bride\'s mehndi is said to predict the depth of her husband\'s love.', famous_for: 'Intricate full-hand bridal designs with paisleys, peacocks, and mandala motifs', styles: ['Rajasthani', 'Mughal', 'South Indian', 'Bridal', 'Peacock', 'Mandala'] },
  { name: 'Pakistan', slug: 'pakistan', flag: '🇵🇰', description: 'Pakistani mehndi art blends Mughal elegance with bold geometric patterns. Known for its intricate tikki (circular) designs and heavy bridal work that covers both hands and feet.', traditions: 'The Mehndi Night (Raat ki Mehndi) is one of the most vibrant pre-wedding celebrations in Pakistani culture, filled with music, dance, and elaborate henna application.', famous_for: 'Heavy bridal mehndi with tikki centers and geometric fills', styles: ['Bridal', 'Tikki', 'Geometric', 'Floral'] },
  { name: 'Arabia', slug: 'arabia', flag: '🇸🇦', description: 'Arabic mehndi is distinguished by its bold, flowing patterns that emphasize open spaces. Gulf-style (Khaleeji) designs are particularly popular, featuring large floral motifs and thick outlines.', traditions: 'Henna is applied during Eid celebrations, weddings, and other festive occasions across the Arab world. Black henna is popular in Gulf countries for its striking contrast.', famous_for: 'Bold flowing patterns with open spaces and large floral motifs', styles: ['Arabic bold', 'Gulf', 'Minimal Arabic'] },
  { name: 'Morocco', slug: 'morocco', flag: '🇲🇦', description: 'Moroccan henna art reflects the rich Berber heritage with bold geometric patterns, tribal symbols, and diamond shapes. It is deeply rooted in North African traditions of protection and celebration.', traditions: 'In Morocco, henna is applied during weddings, births, and religious holidays. The "henna party" (henna night) is a cherished pre-wedding tradition for Moroccan brides.', famous_for: 'Bold geometric Berber patterns with tribal symbolism', styles: ['Berber', 'Tribal', 'Geometric'] },
  { name: 'Turkey', slug: 'turkey', flag: '🇹🇷', description: 'Turkish henna traditions center around the Kına Gecesi (henna night), a pre-wedding ceremony filled with emotion and celebration. Ottoman-inspired floral patterns dominate Turkish henna art.', traditions: 'The Turkish Kına Gecesi is an emotional ceremony where the bride\'s hands are decorated while traditional songs are sung, often bringing tears of joy and farewell.', famous_for: 'Ottoman-inspired floral designs with elegant curves', styles: ['Ottoman', 'Floral Turkish'] },
  { name: 'Indonesia', slug: 'indonesia', flag: '🇮🇩', description: 'Indonesian henna art draws from both Hindu-Buddhist and Islamic traditions, creating a unique blend of Javanese and Balinese motifs with delicate nature-inspired patterns.', traditions: 'In Javanese wedding traditions, henna application is part of the "siraman" purification ceremony. Balinese henna often incorporates temple flower motifs and sacred geometry.', famous_for: 'Nature-inspired designs blending Hindu-Buddhist and Islamic motifs', styles: ['Javanese', 'Balinese'] },
  { name: 'Sudan', slug: 'sudan', flag: '🇸🇩', description: 'Sudanese and African henna traditions feature bold, striking patterns with thick lines and geometric shapes. The "Sudani" style is particularly distinctive with its dark, dramatic application.', traditions: 'In Sudan, henna ceremonies called "jirtig" are essential wedding preparations. The bride undergoes multiple henna sessions, each with specific cultural significance.', famous_for: 'Bold dramatic patterns with thick lines and deep black stain', styles: ['African Tribal', 'Sudanese'] },
  { name: 'Western', slug: 'western', flag: '🌍', description: 'Western and fusion henna represents the modern evolution of mehndi art, combining traditional elements with contemporary minimalist aesthetics. Popular at music festivals and as temporary body art.', traditions: 'Western henna culture has grown through music festivals, bohemian fashion, and social media, creating a new generation of henna enthusiasts who blend global styles.', famous_for: 'Minimalist designs, geometric patterns, and Indo-Western fusion', styles: ['Minimalist', 'Geometric Modern'] },
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];

async function fetchPixabayImages(query, perPage = 10) {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true&orientation=vertical&min_width=400&min_height=400`;
  
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`❌ Pixabay API error for "${query}": ${res.status} ${res.statusText}`);
    return [];
  }
  const data = await res.json();
  return data.hits || [];
}

function generateTitle(style, country, index) {
  const adjectives = ['Elegant', 'Stunning', 'Beautiful', 'Intricate', 'Mesmerizing', 'Graceful', 'Exquisite', 'Captivating', 'Enchanting', 'Radiant'];
  const adj = adjectives[(index + style.length) % adjectives.length];
  return `${adj} ${style} ${country} Mehndi Design`;
}

function generateDescription(style, country, occasion) {
  const templates = [
    `A breathtaking ${style.toLowerCase()} mehndi design from ${country}, perfect for ${occasion.toLowerCase()} celebrations. This intricate henna pattern showcases the rich artistic heritage of ${country}'s mehndi tradition with stunning detail and craftsmanship.`,
    `Discover this gorgeous ${style.toLowerCase()} henna art inspired by ${country}'s centuries-old traditions. Ideal for ${occasion.toLowerCase()}, this design features flowing patterns that blend classic elegance with contemporary style.`,
    `This exquisite ${style.toLowerCase()} mehndi pattern embodies the beauty of ${country}'s henna culture. Created for ${occasion.toLowerCase()} occasions, it combines traditional motifs with artistic flair that will leave everyone mesmerized.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateTags(style, country, occasion) {
  const baseTags = [style.toLowerCase(), country.toLowerCase(), occasion.toLowerCase(), 'mehndi', 'henna'];
  const extraTags = ['bridal', 'traditional', 'modern', 'elegant', 'intricate', 'hand art', 'body art', 'tattoo', 'festival', 'celebration'];
  const shuffled = extraTags.sort(() => Math.random() - 0.5);
  return [...new Set([...baseTags, ...shuffled.slice(0, 3)])];
}

async function seedCategories() {
  console.log('\n📂 Seeding categories...');
  
  // Delete existing
  await supabase.from('categories').delete().neq('id', 0);
  
  const { error } = await supabase.from('categories').insert(CATEGORIES);
  
  if (error) {
    console.error('❌ Error seeding categories:', error.message);
    return false;
  }
  console.log(`✅ Seeded ${CATEGORIES.length} categories`);
  return true;
}

async function seedDesigns() {
  console.log('\n🎨 Fetching images from Pixabay and seeding designs...\n');
  
  // Delete existing
  await supabase.from('designs').delete().neq('id', 0);
  
  let totalSeeded = 0;
  const seenPixabayIds = new Set();
  
  for (const searchConfig of SEARCH_QUERIES) {
    const { query, country, style, occasion, limit } = searchConfig;
    
    console.log(`🔍 Searching: "${query}" (${country}/${style})...`);
    
    const images = await fetchPixabayImages(query, limit + 5); // fetch extra to account for duplicates
    
    if (images.length === 0) {
      console.warn(`⚠️  No images found for "${query}". Skipping.`);
      continue;
    }
    
    const designs = [];
    let count = 0;
    
    for (const img of images) {
      if (count >= limit) break;
      if (seenPixabayIds.has(img.id)) continue;
      seenPixabayIds.add(img.id);
      
      designs.push({
        title: generateTitle(style, country, count),
        description: generateDescription(style, country, occasion),
        country,
        style,
        occasion,
        difficulty: DIFFICULTIES[(totalSeeded + count) % 4],
        image_url: img.largeImageURL || img.webformatURL,
        thumbnail_url: img.previewURL || img.webformatURL,
        tags: generateTags(style, country, occasion),
        pixabay_id: img.id,
        views: img.views || 0,
        likes: img.likes || 0,
        photographer: img.user || null,
        source: 'pixabay',
      });
      
      count++;
    }
    
    if (designs.length > 0) {
      const { error } = await supabase.from('designs').insert(designs);
      if (error) {
        console.error(`❌ Error inserting designs for "${query}":`, error.message);
      } else {
        totalSeeded += designs.length;
        console.log(`   ✅ Seeded ${designs.length} designs (total: ${totalSeeded})`);
      }
    }
    
    // Rate limit: Pixabay allows 100 requests/minute
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n🎉 Total designs seeded: ${totalSeeded}`);
  return totalSeeded;
}

async function updateCategoryCounts() {
  console.log('\n📊 Updating category design counts...');
  
  for (const cat of CATEGORIES) {
    const { count } = await supabase
      .from('designs')
      .select('*', { count: 'exact', head: true })
      .eq('country', cat.name);
    
    await supabase
      .from('categories')
      .update({ design_count: count || 0 })
      .eq('name', cat.name);
    
    console.log(`   ${cat.flag} ${cat.name}: ${count || 0} designs`);
  }
}

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   HennaVerse Pixabay Image Seeder      ║');
  console.log('╚════════════════════════════════════════╝');
  
  const catOk = await seedCategories();
  if (!catOk) {
    console.error('Failed to seed categories. Make sure you ran the SQL migration first.');
    process.exit(1);
  }
  
  const total = await seedDesigns();
  
  if (total > 0) {
    await updateCategoryCounts();
  }
  
  console.log('\n✨ Seeding complete! Your HennaVerse database is ready.');
}

main().catch(console.error);
