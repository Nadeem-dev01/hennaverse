import { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';
import { countries } from '@/data/countries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hennaverse.com';

  const staticRoutes = ['', '/about', '/gallery', '/blog', '/styles'].map(
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

  return [...staticRoutes, ...blogRoutes, ...styleRoutes];
}
