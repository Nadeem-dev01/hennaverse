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
    "henna patterns",
    "mehndi designs collection",
    "bridal mehndi gallery",
    "arabic henna designs",
    "indian mehndi patterns",
    "easy henna designs",
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
