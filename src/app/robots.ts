import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot: full access to all content pages and images
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
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
        disallow: ['/api/'],
      },
      {
        // All other bots: standard rules — block internals only
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.mehndidesignhenna.com/sitemap.xml',
  };
}
