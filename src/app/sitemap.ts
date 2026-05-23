import { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';
import { countries } from '@/data/countries';
import { designCategories } from '@/data/designCategories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hennaverse.com';

  const staticRoutes = [
    '', 
    '/about', 
    '/gallery', 
    '/blog', 
    '/styles', 
    '/mehndi-designs',
    '/privacy-policy',
    '/disclaimer',
    '/contact'
  ].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const styleRoutes = countries.map((country) => ({
    url: `${baseUrl}/styles/${country.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const categoryRoutes = designCategories.map((category) => ({
    url: `${baseUrl}/mehndi-designs/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes, ...styleRoutes, ...categoryRoutes];
}
