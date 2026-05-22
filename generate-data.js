const fs = require('fs');
const path = require('path');

const srcDataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

// Generate designs.ts
const countries = ['India', 'Pakistan', 'Arabia', 'Morocco', 'Turkey', 'Indonesia', 'Sudan', 'Western'];
const stylesByCountry = {
  'India': ['Rajasthani', 'Mughal', 'South Indian', 'Bridal', 'Peacock', 'Mandala'],
  'Pakistan': ['Bridal', 'Tikki', 'Geometric', 'Floral'],
  'Arabia': ['Gulf/Khaleeji', 'Arabic bold', 'minimal Arabic'],
  'Morocco': ['Berber', 'geometric', 'tribal'],
  'Turkey': ['Ottoman', 'floral Turkish'],
  'Indonesia': ['Javanese', 'Balinese'],
  'Sudan': ['African tribal', 'Sudanese'],
  'Western': ['Minimalist', 'Geometric modern', 'Indo-Western']
};
const occasions = ['Wedding', 'Eid', 'Diwali', 'Festival', 'Casual', 'Party', 'Engagement', 'Karva Chauth', 'Teej', 'Mehendi Night'];
const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
const tagsList = ['intricate', 'bold', 'modern', 'traditional', 'elegant', 'heavy', 'light', 'floral', 'geometric'];

let designs = [];
let idCounter = 1;

for (let i = 0; i < 100; i++) {
  const country = countries[i % countries.length];
  const styles = stylesByCountry[country];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const occasion = occasions[Math.floor(Math.random() * occasions.length)];
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  
  const title = `${style} Mehndi Design ${i+1}`;
  const description = `A stunning ${difficulty.toLowerCase()} ${style} design perfect for ${occasion}. This beautiful henna pattern features unique elements from ${country} traditions.`;
  
  // pick 2 random tags
  const t1 = tagsList[Math.floor(Math.random() * tagsList.length)];
  let t2 = tagsList[Math.floor(Math.random() * tagsList.length)];
  while (t1 === t2) { t2 = tagsList[Math.floor(Math.random() * tagsList.length)]; }

  designs.push({
    id: idCounter++,
    title,
    description,
    country,
    style,
    occasion,
    difficulty,
    imageUrl: `/images/designs/${country.toLowerCase()}-${Math.floor(Math.random()*5)+1}.jpg`,
    tags: [t1, t2]
  });
}

const designsCode = `export interface Design {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl: string;
  tags: string[];
}

export const designs: Design[] = ${JSON.stringify(designs, null, 2)};
`;

fs.writeFileSync(path.join(srcDataDir, 'designs.ts'), designsCode);

// Generate blogs.ts
const blogTopics = [
  'The Complete Guide to Indian Mehndi Styles',
  'Pakistani Bridal Mehndi: Traditions & Modern Trends',
  'Arabic Mehndi: Bold, Beautiful & Timeless',
  'Moroccan Henna Art: A Journey Through Berber Traditions',
  'Turkish Henna Night: Kına Gecesi Traditions',
  'Indonesian Henna: Javanese & Balinese Styles',
  'African Henna Traditions: Sudan, Somalia & Beyond',
  '10 Easy Mehndi Designs for Beginners',
  'How to Make Natural Henna Paste at Home',
  'Bridal Mehndi Guide: Choosing the Perfect Design',
  'Mehndi Care Tips: How to Get the Darkest Stain',
  '2025 Mehndi Trends: What is Hot This Year',
  'Minimalist Mehndi: Modern Designs for Everyday',
  'The History & Cultural Significance of Henna',
  'Festival Mehndi: Designs for Eid, Diwali & Celebrations'
];

const categories = ['Tutorial', 'Guide', 'Culture', 'Tips', 'Trends'];
let blogs = [];

blogTopics.forEach((topic, idx) => {
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const category = categories[idx % categories.length];
  
  blogs.push({
    slug,
    title: topic,
    excerpt: `Discover everything you need to know about ${topic.split(':')[0]}. Learn from our experts.`,
    content: `
      <h2>Introduction</h2>
      <p>Welcome to our comprehensive guide on ${topic}. Henna has a rich history and beautiful traditions associated with it. This article will explore the deep cultural roots and modern applications.</p>
      
      <h2>The Details</h2>
      <p>Here are some fascinating details about this topic. You will find that the styles and techniques vary widely, but the core essence of henna remains a symbol of joy and celebration.</p>
      <ul>
        <li>Key technique 1: Ensuring good paste consistency.</li>
        <li>Key technique 2: Proper aftercare for dark stains.</li>
        <li>Key technique 3: Understanding the cultural patterns.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>We hope this guide helps you on your henna journey. Keep practicing and exploring new designs!</p>
    `,
    author: 'HennaVerse Team',
    date: '2024-' + String((idx%12)+1).padStart(2, '0') + '-15',
    readTime: (Math.floor(Math.random()*5)+3) + ' min read',
    category,
    country: 'Global',
    imageUrl: '/images/blogs/blog-' + ((idx%5)+1) + '.jpg',
    tags: ['henna', category.toLowerCase()]
  });
});

const blogsCode = `export interface BlogPost {
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

fs.writeFileSync(path.join(srcDataDir, 'blogs.ts'), blogsCode);
console.log('Generated designs.ts and blogs.ts');
