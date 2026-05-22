/**
 * HennaVerse Database Seeder
 * 
 * Reads the fully populated designs from src/data/designs.ts
 * and seeds them into Supabase.
 * 
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-designs.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing environment variables. Required:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  console.log('\n🎨 Reading designs from static file and seeding...');
  
  // Delete existing
  await supabase.from('designs').delete().neq('id', 0);
  
  const designsFilePath = path.join(__dirname, '..', 'src', 'data', 'designs.ts');
  const fileContent = fs.readFileSync(designsFilePath, 'utf8');
  
  const match = fileContent.match(/export const designs: Design\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('Could not find designs array in designs.ts');
  }
  
  const staticDesigns = JSON.parse(match[1]);
  console.log(`Found ${staticDesigns.length} designs in static file.`);

  // Map to Supabase schema
  const dbDesigns = staticDesigns.map(d => ({
    title: d.title,
    description: d.description,
    country: d.country,
    style: d.style,
    occasion: d.occasion,
    difficulty: d.difficulty,
    image_url: d.imageUrl,
    thumbnail_url: d.imageUrl,
    tags: d.tags,
    pixabay_id: d.pixabay_id || null,
    views: d.views || 0,
    likes: d.likes || 0,
    photographer: d.photographer || null,
    source: d.source || 'unknown',
  }));

  // Batch insert
  const batchSize = 50;
  let totalSeeded = 0;
  
  for (let i = 0; i < dbDesigns.length; i += batchSize) {
    const batch = dbDesigns.slice(i, i + batchSize);
    const { error } = await supabase.from('designs').insert(batch);
    if (error) {
      console.error(`❌ Error inserting designs batch:`, error.message);
    } else {
      totalSeeded += batch.length;
      console.log(`   ✅ Seeded ${totalSeeded}/${dbDesigns.length} designs`);
    }
  }

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
  console.log('║   HennaVerse Database File Seeder      ║');
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
