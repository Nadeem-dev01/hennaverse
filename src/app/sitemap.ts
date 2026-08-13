import { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import { categories } from "@/data/taxonomy";
import { mehndiTools } from "@/data/mehndiTools";

const BASE_URL = "https://www.mehndidesignhenna.com";

// A real, meaningful "last updated" anchor — update this when you do a major
// content refresh. Using a hardcoded date (not build-time `new Date()`) avoids
// Google learning to ignore it.
const SITE_LAST_UPDATED = new Date("2026-06-26");

const occasionSlugs = [
  "wedding", "eid", "karva-chauth", "diwali",
  "teej", "engagement", "party", "raksha-bandhan",
];

const bodyPartSlugs = [
  "front-hand", "back-hand", "full-hand", "finger", "foot", "arm",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // --- Static / evergreen pages ---
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/mehndi-designs`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/styles`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/try-on`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/design-finder`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/sitemap-html`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // --- Category pages (high SEO value, priority 0.9) ---
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/mehndi-designs/${c.slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // --- Occasion pages ---
  const occasionRoutes: MetadataRoute.Sitemap = occasionSlugs.map((slug) => ({
    url: `${BASE_URL}/occasions/${slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // --- Body part pages ---
  const bodyPartRoutes: MetadataRoute.Sitemap = bodyPartSlugs.map((slug) => ({
    url: `${BASE_URL}/body/${slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // --- Blog posts — use REAL publish date for accurate lastModified ---
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    ...(blog.imageUrl ? { images: [`${BASE_URL}${blog.imageUrl}`] } : {}),
  }));

  // --- Style (country) pages ---
  const styleRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${BASE_URL}/styles/${country.id}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // --- Tool pages ---
  const toolRoutes: MetadataRoute.Sitemap = mehndiTools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // --- Blog category pages ---
  const blogCategories = Array.from(new Set(blogs.map((b) => b.category)));
  const blogCategoryRoutes: MetadataRoute.Sitemap = blogCategories.map((cat) => ({
    url: `${BASE_URL}/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...occasionRoutes,
    ...bodyPartRoutes,
    ...blogCategoryRoutes,
    ...blogRoutes,
    ...styleRoutes,
    ...toolRoutes,
  ];
}
