import fs from "fs";
import path from "path";
import { blogs, BlogPost } from "../src/data/blogs";
import { blogContentBatch1 } from "../src/data/blog-content-batch1";

// 1. Identify duplicate sections
const DUP_START_HEADER = "<h2>The Botanical Origins and Chemistry of Henna</h2>";
const DUP_END_HEADER = "<h2>Conclusion and Final Thoughts</h2>";

// We will extract the full boilerplate content from the first blog post to use for the Ultimate Henna Guide
const firstPostContent = blogs[0].content;
const dupStartIndex = firstPostContent.indexOf(DUP_START_HEADER);
const dupEndIndex = firstPostContent.indexOf(DUP_END_HEADER);

if (dupStartIndex === -1 || dupEndIndex === -1) {
  console.error("Could not find boilerplate boundaries in blogs[0].content!");
  process.exit(1);
}

// The exact boilerplate content (8 chapters) shared across posts
const boilerplateContent = firstPostContent.slice(dupStartIndex, dupEndIndex);

// Create the new Ultimate Henna Guide post
const ultimateGuide: BlogPost = {
  slug: "ultimate-henna-guide",
  title: "The Ultimate Henna Guide: Origins, Chemistry, Safety & Aftercare",
  excerpt: "A comprehensive masterclass on natural henna: botanical chemistry, historical origins, application techniques, safety warnings, and complete stain aftercare.",
  author: "Mehndi Design Henna Editorial Team",
  date: "2026-05-15",
  readTime: "15 min read",
  category: "Guide",
  country: "Global",
  imageUrl: "/bridal-3000.jpeg",
  tags: ["henna guide", "aftercare", "safety", "chemistry", "history"],
  content: `
    <h2>The Definitive Guide to Natural Henna</h2>
    <p class="lead mb-8 text-xl text-muted">Welcome to the ultimate masterclass on natural henna. Whether you are a beginner looking to understand the basics or an experienced artist seeking to refine your craft, this guide covers everything from the chemistry of the lawsone molecule to the cultural traditions and aftercare practices that define this ancient art form.</p>
    
    ${boilerplateContent}
    
    <h2>Conclusion and Final Thoughts</h2>
    <p>Natural henna is a beautiful, transient art form that connects us to thousands of years of human heritage. By understanding its botanical origins, chemical properties, and correct aftercare protocols, you can ensure safe, stunning, and long-lasting stains. We encourage you to <a href="/gallery" class="text-gold hover:underline">explore our designs gallery</a> for inspiration or visit our <a href="/tools" class="text-gold hover:underline">interactive tools</a> to generate your next pattern.</p>
  `.trim()
};

// Update all posts
const updatedBlogs: BlogPost[] = blogs.map((post) => {
  // Check if this post has unique content in batch 1
  // Normalize Turkish slug differences
  const normalizedSlug = post.slug === "turkish-henna-night-kina-gecesi-traditions" 
    ? "turkish-henna-night-k-na-gecesi-traditions" 
    : post.slug;

  const uniqueBatch = blogContentBatch1.find(b => b.slug === normalizedSlug);

  if (uniqueBatch) {
    console.log(`Updating ${post.slug} with unique content from batch 1.`);
    return {
      ...post,
      title: uniqueBatch.title,
      excerpt: uniqueBatch.excerpt,
      readTime: uniqueBatch.readTime,
      category: uniqueBatch.category,
      country: uniqueBatch.country,
      tags: uniqueBatch.tags,
      content: uniqueBatch.content.trim(),
    };
  }

  // If no batch 1 unique content, programmatically prune the boilerplate
  console.log(`Pruning boilerplate content from ${post.slug}.`);
  const content = post.content;
  const startIndex = content.indexOf(DUP_START_HEADER);
  const endIndex = content.indexOf(DUP_END_HEADER);

  if (startIndex !== -1 && endIndex !== -1) {
    const intro = content.slice(0, startIndex).trim();
    const conclusion = content.slice(endIndex).trim();

    // Callout box linking to the Ultimate Henna Guide
    const calloutBox = `
<div class="my-8 p-6 rounded-2xl bg-gold/5 border border-gold/20 flex gap-4 items-start">
  <div class="text-2xl text-gold mt-1">💡</div>
  <div>
    <h4 class="font-serif text-lg font-bold text-foreground mb-1">Essential Henna Knowledge</h4>
    <p class="text-muted text-sm leading-relaxed mb-3">To read about the chemistry of henna, essential oil terp selections, hand-rolled cone application techniques, historical civilizational roots, and black henna safety warnings, explore our master guide.</p>
    <a href="/blog/ultimate-henna-guide" class="text-gold font-semibold text-sm hover:underline inline-flex items-center gap-1">Read The Ultimate Henna Guide &rarr;</a>
  </div>
</div>
    `.trim();

    return {
      ...post,
      content: `${intro}\n\n${calloutBox}\n\n${conclusion}`,
    };
  }

  return post;
});

// Append the Ultimate Guide to the blogs list
updatedBlogs.push(ultimateGuide);

// Generate the TypeScript file content
const fileHeader = `export interface BlogPost {
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

export const blogs: BlogPost[] = `;

const outputContent = `${fileHeader}${JSON.stringify(updatedBlogs, null, 2)};\n`;

// Write back toblogs.ts
const targetPath = path.resolve(__dirname, "../src/data/blogs.ts");
fs.writeFileSync(targetPath, outputContent, "utf8");
console.log("Successfully deduplicated blogs.ts!");
