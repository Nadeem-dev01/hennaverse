const BASE_URL = "https://www.mehndidesignhenna.com";

export function buildBreadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
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
    mainEntity: faqs.map((faq) => ({
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
    contentUrl: `${BASE_URL}${image.src}`,
    description: image.alt,
    width: image.width,
    height: image.height,
    creditText: image.credit,
    ...(image.creditUrl && { creator: { "@type": "Person", name: image.credit, url: image.creditUrl } }),
    license: image.licenseUrl || image.license,
  };
}

export function buildCollectionPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${BASE_URL}${url}`,
  };
}

export function buildArticleSchema(title: string, description: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? [`${BASE_URL}${image}`] : [],
    author: { "@type": "Organization", name: "HennaVerse" },
    publisher: {
      "@type": "Organization",
      name: "HennaVerse",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.png` },
    },
  };
}
