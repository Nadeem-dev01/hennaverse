import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const designsFilePath = path.join(__dirname, '..', 'src', 'data', 'designs.ts');
const blogsFilePath = path.join(__dirname, '..', 'src', 'data', 'blogs.ts');
const categoriesFilePath = path.join(__dirname, '..', 'src', 'data', 'designCategories.ts');

const categoriesContent = fs.readFileSync(categoriesFilePath, 'utf8');
const matchCats = categoriesContent.match(/export const designCategories: DesignCategory\[\] = (\[[\s\S]*\]);/);
const categories = JSON.parse(matchCats[1]);

// Extract all image URLs to use as a pool
let imagePool = [];
categories.forEach(cat => {
  imagePool.push(...cat.images.map(img => img.src));
});

// Shuffle
imagePool = imagePool.sort(() => Math.random() - 0.5);

let poolIdx = 0;

// Update designs.ts
const designsContent = fs.readFileSync(designsFilePath, 'utf8');
const matchDesigns = designsContent.match(/export const designs: Design\[\] = (\[[\s\S]*\]);/);
const designs = JSON.parse(matchDesigns[1]);

designs.forEach(design => {
  if (poolIdx >= imagePool.length) poolIdx = 0; // Wrap around if needed
  design.imageUrl = imagePool[poolIdx++];
});

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
console.log('✅ Updated designs.ts with local images');

// Update blogs.ts
const blogsContent = fs.readFileSync(blogsFilePath, 'utf8');
const matchBlogs = blogsContent.match(/export const blogs: BlogPost\[\] = (\[[\s\S]*\]);/);
const blogs = JSON.parse(matchBlogs[1]);

blogs.forEach(blog => {
  if (poolIdx >= imagePool.length) poolIdx = 0; // Wrap around if needed
  blog.imageUrl = imagePool[poolIdx++];
});

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
console.log('✅ Updated blogs.ts with local images');
