import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot: full access to all content pages and images
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // Googlebot image crawler: allow all images for Google Images indexing
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // AdsBot-Google: allow for AdSense revenue optimization
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        // Bingbot: full access
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // All other bots: standard rules — block internals only
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://www.mehndidesignhenna.com/sitemap.xml',
    host: 'https://www.mehndidesignhenna.com',
  };
}
