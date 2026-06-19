import { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import { designCategories } from "@/data/designCategories";
import { mehndiTools } from "@/data/mehndiTools";

import arabicDesigns from "@/data/designs/arabic.json";
import indianDesigns from "@/data/designs/indian.json";
import pakistaniDesigns from "@/data/designs/pakistani.json";
import moroccanDesigns from "@/data/designs/moroccan.json";
import gulfDesigns from "@/data/designs/gulf.json";
import africanDesigns from "@/data/designs/african.json";
import turkishDesigns from "@/data/designs/turkish.json";
import rajasthaniDesigns from "@/data/designs/rajasthani.json";
import indonesianDesigns from "@/data/designs/indonesian.json";
import bridalDesigns from "@/data/designs/bridal.json";
import simpleDesigns from "@/data/designs/simple.json";
import modernDesigns from "@/data/designs/modern.json";
import traditionalDesigns from "@/data/designs/traditional.json";
import minimalDesigns from "@/data/designs/minimal.json";
import floralDesigns from "@/data/designs/floral.json";
import mandalaDesigns from "@/data/designs/mandala.json";
import geometricDesigns from "@/data/designs/geometric.json";
import jewelryDesigns from "@/data/designs/jewelry.json";
import royalDesigns from "@/data/designs/royal.json";
import fullHandDesigns from "@/data/designs/full-hand.json";
import backHandDesigns from "@/data/designs/back-hand.json";
import frontHandDesigns from "@/data/designs/front-hand.json";
import fingerDesigns from "@/data/designs/finger.json";
import footDesigns from "@/data/designs/foot.json";
import eidDesigns from "@/data/designs/eid.json";
import kidsDesigns from "@/data/designs/kids.json";

const BASE_URL = "https://www.mehndidesignhenna.com";

const allDesignSlugs: string[] = [
  arabicDesigns, indianDesigns, pakistaniDesigns, moroccanDesigns,
  gulfDesigns, africanDesigns, turkishDesigns, rajasthaniDesigns,
  indonesianDesigns, bridalDesigns, simpleDesigns, modernDesigns,
  traditionalDesigns, minimalDesigns, floralDesigns, mandalaDesigns,
  geometricDesigns, jewelryDesigns, royalDesigns, fullHandDesigns,
  backHandDesigns, frontHandDesigns, fingerDesigns, footDesigns,
  eidDesigns, kidsDesigns,
].flat().map((d: any) => d.slug);

const newCategorySlugs = [
  "gulf", "african", "turkish", "rajasthani", "indonesian",
  "modern", "traditional", "jewelry", "royal", "full-hand", "eid",
];

const occasionSlugs = [
  "wedding", "eid", "karva-chauth", "diwali",
  "teej", "engagement", "party", "raksha-bandhan",
];

const bodyPartSlugs = [
  "front-hand", "back-hand", "full-hand", "finger", "foot", "arm",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-06-15");

  const staticRoutes = [
    "", "/about", "/blog", "/gallery", "/styles", "/tools",
    "/mehndi-designs", "/sitemap-html",
    "/privacy-policy", "/disclaimer", "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryRoutes = designCategories.map((c) => ({
    url: `${BASE_URL}/mehndi-designs/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const newCategoryRoutes = newCategorySlugs
    .filter((s) => !designCategories.some((c) => c.slug === s))
    .map((slug) => ({
      url: `${BASE_URL}/mehndi-designs/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const occasionRoutes = occasionSlugs.map((slug) => ({
    url: `${BASE_URL}/occasions/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bodyPartRoutes = bodyPartSlugs.map((slug) => ({
    url: `${BASE_URL}/body/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const styleRoutes = countries.map((country) => ({
    url: `${BASE_URL}/styles/${country.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolRoutes = mehndiTools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const designRoutes = allDesignSlugs.map((slug) => ({
    url: `${BASE_URL}/designs/${slug}`,
    lastModified: now,
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
