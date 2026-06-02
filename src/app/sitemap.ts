import { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import { designCategories } from "@/data/designCategories";
import { mehndiTools } from "@/data/mehndiTools";
import { allDesigns } from "@/data/index";

const BASE_URL = "https://www.mehndidesignhenna.com";

const newCategories = [
  "gulf", "african", "turkish", "rajasthani", "indonesian",
  "modern", "traditional", "jewelry", "royal",
  "full-hand", "eid",
];

const occasionSlugs = [
  "wedding", "eid", "karva-chauth", "diwali",
  "teej", "engagement", "party", "raksha-bandhan",
];

const bodyPartSlugs = [
  "front-hand", "back-hand", "full-hand", "finger", "foot", "arm",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/styles",
    "/tools",
    "/mehndi-designs",
    "/sitemap-html",
    "/privacy-policy",
    "/disclaimer",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryRoutes = designCategories.map((c) => ({
    url: `${BASE_URL}/mehndi-designs/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const newCategoryRoutes = newCategories.map((slug) => ({
    url: `${BASE_URL}/mehndi-designs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const occasionRoutes = occasionSlugs.map((slug) => ({
    url: `${BASE_URL}/occasions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bodyPartRoutes = bodyPartSlugs.map((slug) => ({
    url: `${BASE_URL}/body/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const styleRoutes = countries.map((country) => ({
    url: `${BASE_URL}/styles/${country.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolRoutes = mehndiTools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const designRoutes = allDesigns.map((design) => ({
    url: `${BASE_URL}/designs/${design.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...newCategoryRoutes,
    ...occasionRoutes,
    ...bodyPartRoutes,
    ...blogRoutes,
    ...styleRoutes,
    ...toolRoutes,
    ...designRoutes,
  ];
}
