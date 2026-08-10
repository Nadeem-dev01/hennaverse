import { blogs, BlogPost } from "@/data/blogs";

export function getAllBlogs(): BlogPost[] {
  return [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogsByCategory(category: string): BlogPost[] {
  const normalizedCategory = category.toLowerCase();
  return getAllBlogs().filter((b) => b.category.toLowerCase() === normalizedCategory);
}

export function getBlogsByTag(tag: string): BlogPost[] {
  const normalizedTag = tag.toLowerCase();
  return getAllBlogs().filter((b) =>
    b.tags.some((t) => t.toLowerCase() === normalizedTag)
  );
}

export function getAllCategories(): string[] {
  const categories = blogs.map((b) => b.category);
  return Array.from(new Set(categories));
}

export function getAllTags(): string[] {
  const tags = blogs.flatMap((b) => b.tags || []);
  return Array.from(new Set(tags));
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  country?: string,
  tags: string[] = [],
  limit = 3
): BlogPost[] {
  const allOther = blogs.filter((b) => b.slug !== currentSlug);

  const scored = allOther.map((b) => {
    let score = 0;
    if (b.category === category) score += 3;
    if (country && b.country && b.country.toLowerCase() === country.toLowerCase()) score += 2;
    if (tags.length > 0 && b.tags) {
      const matchingTags = b.tags.filter((t) => tags.includes(t));
      score += matchingTags.length * 1.5;
    }
    return { blog: b, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.blog);
}

export function getPrevAndNextPosts(currentSlug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const sorted = getAllBlogs();
  const currentIndex = sorted.findIndex((b) => b.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  const next = currentIndex > 0 ? sorted[currentIndex - 1] : null;

  return { prev, next };
}

export function extractFAQsFromContent(contentHtml: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];

  if (!contentHtml) return faqs;

  // Match Schema / FAQ structure inside article HTML
  const questionRegex = /<h3[^>]*itemprop=["']name["'][^>]*>(.*?)<\/h3>[\s\S]*?<p[^>]*itemprop=["']text["'][^>]*>(.*?)<\/p>/gi;
  let match;

  while ((match = questionRegex.exec(contentHtml)) !== null) {
    const q = match[1].replace(/<[^>]+>/g, "").trim();
    const a = match[2].replace(/<[^>]+>/g, "").trim();
    if (q && a) {
      faqs.push({ q, a });
    }
  }

  // Fallback: match any H3 inside FAQ section if microdata tags aren't present
  if (faqs.length === 0 && contentHtml.includes("Frequently Asked Questions")) {
    const faqSectionMatch = contentHtml.match(/<h2>Frequently Asked Questions.*?<\/h2>([\s\S]*)/i);
    if (faqSectionMatch) {
      const section = faqSectionMatch[1];
      const h3Regex = /<h3>(.*?)<\/h3>[\s\S]*?<p>(.*?)<\/p>/gi;
      let fallbackMatch;
      while ((fallbackMatch = h3Regex.exec(section)) !== null) {
        const q = fallbackMatch[1].replace(/<[^>]+>/g, "").trim();
        const a = fallbackMatch[2].replace(/<[^>]+>/g, "").trim();
        if (q && a) {
          faqs.push({ q, a });
        }
      }
    }
  }

  return faqs;
}

export function calculateReadTime(contentHtml: string): string {
  const textOnly = contentHtml.replace(/<[^>]+>/g, " ");
  const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
