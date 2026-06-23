const BASE_URL = "https://www.mehndidesignhenna.com";

export function buildBreadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "en",
    "itemListElement": [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.href}`,
      })),
    ],
  };
}

export function buildFAQSchema(faqs: { q: string; a: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "en",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildImageObjectSchema(image: {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  creditUrl?: string;
  license: string;
  licenseUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "inLanguage": "en",
    "contentUrl": `${BASE_URL}${image.src}`,
    "description": image.alt,
    "width": image.width,
    "height": image.height,
    "creditText": image.credit,
    ...(image.creditUrl && { creator: { "@type": "Person", name: image.credit, url: image.creditUrl } }),
    "license": image.licenseUrl || image.license,
  };
}

export function buildCollectionPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "inLanguage": "en",
    name,
    description,
    "url": `${BASE_URL}${url}`,
  };
}

export function buildArticleSchema(
  title: string,
  description: string,
  image?: string,
  datePublished?: string,
  dateModified?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "inLanguage": "en",
    "headline": title,
    description,
    "image": image ? [`${BASE_URL}${image}`] : [],
    "author": { "@type": "Organization", name: "Mehndi Design Henna" },
    "publisher": {
      "@type": "Organization",
      name: "Mehndi Design Henna",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.png` },
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };
}

export function buildItemListSchema(items: { name: string; url: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "inLanguage": "en",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
      "name": item.name,
      ...(item.image && { "image": item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image}` }),
    })),
  };
}
