import { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { countries } from "@/data/countries";
import { designCategories } from "@/data/designCategories";
import { mehndiTools } from "@/data/mehndiTools";
import { categories, occasions, bodyParts } from "@/data/taxonomy";
import { allDesigns } from "@/data/index";

const BASE_URL = "https://www.mehndidesignhenna.com";
const DESIGNS_PER_SITEMAP = 5000;

export async function generateSitemaps() {
  const designChunks = Math.max(1, Math.ceil(allDesigns.length / DESIGNS_PER_SITEMAP));
  const ids: { id: number }[] = [];
  ids.push({ id: 0 });
  for (let i = 0; i < designChunks; i++) {
    ids.push({ id: i + 1 });
  }
  return ids;
}

export default async function sitemap(
  props: { id: number }
): Promise<MetadataRoute.Sitemap> {
  const id = props.id;

  if (id === 0) {
    const staticRoutes = [
      "",
      "/about",
      "/blog",
      "/styles",
      "/tools",
      "/mehndi-designs",
      "/privacy-policy",
      "/disclaimer",
      "/contact",
    ].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
      priority: route === "" ? 1.0 : 0.8,
    }));

    const categoryRoutes = [
      ...designCategories.map((c) => ({
        url: `${BASE_URL}/mehndi-designs/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
      ...categories
        .filter((c) => !designCategories.some((dc) => dc.slug === c.slug))
        .map((c) => ({
          url: `${BASE_URL}/mehndi-designs/${c.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        })),
    ];

    const occasionRoutes = occasions.map((o) => ({
      url: `${BASE_URL}/occasions/${o.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const bodyPartRoutes = bodyParts.map((b) => ({
      url: `${BASE_URL}/body/${b.slug}`,
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

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...occasionRoutes,
      ...bodyPartRoutes,
      ...blogRoutes,
      ...styleRoutes,
      ...toolRoutes,
    ];
  }

  const chunkIndex = id - 1;
  const start = chunkIndex * DESIGNS_PER_SITEMAP;
  const chunk = allDesigns.slice(start, start + DESIGNS_PER_SITEMAP);

  return chunk.map((design) => ({
    url: `${BASE_URL}/designs/${design.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}
