import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/static/',
      ],
      crawlDelay: 2,
    },
    sitemap: 'https://www.mehndidesignhenna.com/sitemap.xml',
  };
}
