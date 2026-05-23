import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const outputFilePath = path.join(__dirname, '..', 'src', 'data', 'designCategories.ts');

const imageRegex = /\.(jpg|jpeg|jfif|avif|png|webp)$/i;

let files = fs.readdirSync(publicDir)
  .filter(f => imageRegex.test(f))
  .filter(f => !f.includes('(1)'))
  .filter(f => !f.includes('(2)'))
  .filter(f => !f.includes('(3)'))
  .filter(f => !f.startsWith('Unconfirmed'))
  .filter(f => !f.startsWith('img-'))
  .filter(f => !f.startsWith('ss-'));

console.log(`Found ${files.length} unique images.`);

const categoriesConfig = [
  { slug: 'bridal-mehndi-designs', title: 'Bridal Mehndi Designs' },
  { slug: 'arabic-mehndi-designs', title: 'Arabic Mehndi Designs' },
  { slug: 'indian-mehndi-designs', title: 'Indian Mehndi Designs' },
  { slug: 'pakistani-mehndi-designs', title: 'Pakistani Mehndi Designs' },
  { slug: 'simple-mehndi-designs', title: 'Simple Mehndi Designs' },
  { slug: 'back-hand-mehndi-designs', title: 'Back Hand Mehndi Designs' },
  { slug: 'front-hand-mehndi-designs', title: 'Front Hand Mehndi Designs' },
  { slug: 'finger-mehndi-designs', title: 'Finger Mehndi Designs' },
  { slug: 'mandala-mehndi-designs', title: 'Mandala Mehndi Designs' },
  { slug: 'minimalist-mehndi-designs', title: 'Minimalist Mehndi Designs' },
  { slug: 'kids-mehndi-designs', title: 'Kids Mehndi Designs' },
  { slug: 'moroccan-mehndi-designs', title: 'Moroccan Mehndi Designs' },
  { slug: 'leg-mehndi-designs', title: 'Leg & Feet Mehndi Designs' },
  { slug: 'floral-mehndi-designs', title: 'Floral Mehndi Designs' },
  { slug: 'geometric-mehndi-designs', title: 'Geometric Mehndi Designs' }
];

// Shuffle images
files = files.sort(() => Math.random() - 0.5);

const imagesPerCategory = Math.floor(files.length / categoriesConfig.length);

const categories = categoriesConfig.map((cat, index) => {
  const startIdx = index * imagesPerCategory;
  // Give remainder to last category
  const endIdx = index === categoriesConfig.length - 1 ? files.length : startIdx + imagesPerCategory;
  
  const catImages = files.slice(startIdx, endIdx).map(f => ({
    src: `/${f}`,
    alt: `${cat.title} pattern ${Math.floor(Math.random() * 1000)}`,
    title: `${cat.title} Inspiration`
  }));

  return {
    ...cat,
    metaTitle: `100+ Stunning ${cat.title} (2025 Trends) | HennaVerse`,
    metaDescription: `Explore our massive collection of ${cat.title}. Discover intricate patterns, easy tutorials, and the latest trends for your next occasion.`,
    heroImage: catImages.length > 0 ? catImages[0].src : '',
    images: catImages,
    // Content will be generated separately per page to reach 4000 words,
    // but we can store a brief intro here if needed.
  };
});

const tsCode = `export interface CategoryImage {
  src: string;
  alt: string;
  title: string;
}

export interface DesignCategory {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  images: CategoryImage[];
}

export const designCategories: DesignCategory[] = ${JSON.stringify(categories, null, 2)};
`;

fs.writeFileSync(outputFilePath, tsCode, 'utf8');
console.log(`✅ Generated designCategories.ts successfully.`);
