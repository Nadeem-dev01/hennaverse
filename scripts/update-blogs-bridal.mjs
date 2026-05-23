import fs from 'fs';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'src', 'data', 'blogs.ts');

let content = fs.readFileSync(BLOGS_FILE, 'utf8');

const bridalDir = path.join(process.cwd(), 'public', 'bridal');
const bridalFiles = fs.readdirSync(bridalDir).filter(f => f.endsWith('.jpg'));
console.log(`Found ${bridalFiles.length} Bridal images`);

const existingSlugs = [...content.matchAll(/"slug": "([^"]+)"/g)].map(m => m[1]);

const titleTemplates = [
  ['Exquisite Bridal Mehndi Design %n', 'An exquisite bridal mehndi pattern that perfectly complements your wedding attire.'],
  ['Traditional Bridal Henna %n', 'Embrace the rich traditions of your heritage with this stunning bridal henna design.'],
  ['Royal Wedding Mehndi %n', 'Feel like royalty on your special day with this majestic wedding mehndi design.'],
  ['Intricate Bridal Mehndi %n', 'A masterclass in precision, this intricate bridal design is breathtakingly beautiful.'],
  ['Modern Bridal Henna Look %n', 'A contemporary twist on bridal mehndi, blending modern elegance with classic motifs.'],
  ['Elegant Wedding Henna %n', 'Simple yet deeply elegant, this wedding henna design is perfect for the modern bride.'],
  ['Floral Bridal Mehndi Masterpiece %n', 'Blooming with intricate floral patterns, this bridal mehndi is a true masterpiece.'],
  ['Classic Bridal Mehndi Style %n', 'A timeless, classic bridal style that has adorned brides for generations.'],
  ['Bold Bridal Henna %n', 'Make a statement with this bold and beautiful bridal henna design.'],
  ['Mandala Bridal Mehndi %n', 'Featuring gorgeous mandala elements, this bridal design symbolizes unity and harmony.'],
];

const categories = ['Tutorial', 'Guide', 'Culture', 'Tips', 'Trends', 'Festival'];
const tags = [
  ['bridal', 'mehndi', 'wedding', 'bride'],
  ['bridal', 'henna', 'marriage', 'traditional'],
  ['bridal', 'floral', 'mehndi', 'art'],
  ['bridal', 'modern', 'wedding', 'design'],
];

function buildBlogContent(imageUrl, title, n) {
  return `\\n      <h2>About This Bridal Design</h2>\\n      <p>${title.replace(` ${n}`, '')} is a meticulously crafted bridal design that adds unparalleled beauty to your wedding day. Every stroke and motif has been carefully planned to ensure you look your absolute best.</p>\\n      <div class=\\"my-6 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border\\"><img src=\\"${imageUrl}\\" alt=\\"Bridal Mehndi Design\\" class=\\"absolute inset-0 w-full h-full object-cover\\" loading=\\"lazy\\" /></div>\\n      <h2>The Application Process</h2>\\n      <p>Bridal henna requires patience and skill. The artist typically starts from the center of the palm and works their way outward, ensuring perfectly symmetrical patterns on both hands. High-quality organic henna paste is essential for achieving that deep, dark stain.</p>\\n      <h2>Bridal Aftercare Essentials</h2>\\n      <p>To ensure the darkest possible stain for your wedding, leave the paste on overnight. Seal it with a mixture of lemon juice and sugar. After gently scraping off the dried paste, massage mustard or coconut oil into the skin and avoid water for the next 24 hours.</p>\\n    `;
}

const newBlogs = [];
let dayCounter = 1;
let skipped = 0;

for (let i = 0; i < bridalFiles.length; i++) {
  const file = bridalFiles[i];
  const imageUrl = `/bridal/${file}`;
  const n = i + 1;
  const templateIdx = i % titleTemplates.length;
  const [titleTpl, excerpt] = titleTemplates[templateIdx];
  const title = titleTpl.replace('%n', `#${n}`);
  const slug = `bridal-mehndi-design-${n}`;

  if (existingSlugs.includes(slug)) {
    skipped++;
    continue;
  }

  const day = String(((dayCounter - 1) % 28) + 1).padStart(2, '0');
  dayCounter++;

  const category = categories[i % categories.length];
  const tagSet = tags[i % tags.length];
  const readTime = `${3 + (i % 3)} min read`;

  newBlogs.push(`  {
    "slug": "${slug}",
    "title": "${title}",
    "excerpt": "${excerpt}",
    "content": "${buildBlogContent(imageUrl, title, `#${n}`)}",
    "author": "HennaVerse Team",
    "date": "2026-04-${day}",
    "readTime": "${readTime}",
    "category": "${category}",
    "country": "Global",
    "imageUrl": "${imageUrl}",
    "tags": ${JSON.stringify(tagSet)}
  }`);
}

console.log(`Generating ${newBlogs.length} new Bridal blog posts (${skipped} skipped as duplicates)`);

const insertionPoint = content.lastIndexOf('];');
const updated =
  content.substring(0, insertionPoint) +
  (newBlogs.length > 0 ? ',\n' + newBlogs.join(',\n') + '\n' : '') +
  '];\n';

fs.writeFileSync(BLOGS_FILE, updated, 'utf8');
console.log('✅ blogs.ts updated with Bridal blogs successfully!');
console.log(`Total new blogs added: ${newBlogs.length}`);
