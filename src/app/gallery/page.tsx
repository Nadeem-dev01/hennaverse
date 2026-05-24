import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { designs } from "@/data/designs";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Mehndi Design Gallery: Browse Henna Patterns by Style, Country and Occasion | HennaVerse",
  description:
    "Browse our curated collection of stunning mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Filter by country, style, difficulty, and occasion to find your perfect henna pattern.",
    keywords: [
    "mehndi design gallery",
    "henna patterns gallery",
    "mehndi designs collection",
    "bridal mehndi gallery",
    "arabic henna designs",
    "indian mehndi patterns",
    "easy henna designs",
    "mehndi design images",
    "henna design photos",
    "mehndi pictures",
    "download mehndi design",
    "free henna designs",
    "mehndi design download",
    "hd mehndi images",
    "latest mehndi gallery",
    "new henna patterns",
    "mehndi design 2025",
    "beautiful mehndi collection",
    "wedding mehndi gallery",
    "eid henna gallery",
    "festival mehndi designs",
    "simple mehndi gallery",
    "back hand mehndi gallery",
    "front hand mehndi images",
    "finger mehndi designs",
    "full hand henna gallery",
    "Pakistani mehndi designs",
    "Moroccan henna gallery",
    "mandala henna patterns",
    "floral mehndi gallery",
    "geometric henna designs",
    "minimalist mehndi gallery",
    "kids mehndi designs",
    "foot mehndi gallery",
    "arm henna designs",
    "rajasthani mehndi gallery",
    "Turkish henna designs",
    "African henna art",
    "Indonesian henna gallery",
    "mehndi for all occasions"
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Mehndi Design Gallery | HennaVerse",
    description:
      "Browse stunning mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Filter by country, style, difficulty, and occasion.",
    type: "website",
    url: `${BASE_URL}/gallery`,
    siteName: "HennaVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Design Gallery | HennaVerse",
    description: "Browse stunning mehndi designs from around the world.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "HennaVerse Mehndi Design Gallery",
    description:
      "A curated collection of stunning mehndi designs from India, Pakistan, Arabia, Morocco, Turkey, Indonesia, Africa, and Western fusion traditions.",
    url: `${BASE_URL}/gallery`,
    publisher: {
      "@type": "Organization",
      name: "HennaVerse",
      url: BASE_URL,
    },
    image: designs.slice(0, 10).map((d) => ({
      "@type": "ImageObject",
      url: `${BASE_URL}${d.imageUrl}`,
      caption: d.title,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${BASE_URL}/gallery` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GalleryClient />
    </>
  );
}
