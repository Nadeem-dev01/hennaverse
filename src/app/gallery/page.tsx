import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { designs } from "@/data/designs";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Mehndi Patterns for Hands: Easy, Cute and Simple Henna Designs Gallery",
  description:
    "Browse mehndi patterns for hands and cute henna designs: easy mehndi designs, simple arabic mehndi, back hand mehndi designs, kids mehndi designs, and henna patterns for men. Filter by style, difficulty, and occasion.",
    keywords: [
    "mehndi patterns for hands",
    "easy mehndi designs",
    "cute henna designs",
    "easy henna ideas",
    "mehndi designs simple",
    "simple mehndi designs for hands",
    "easy mehndi patterns for hands",
    "mehndi designs on hands",
    "mehndi design in hand",
    "back hand mehndi design",
    "stylish back hand mehndi designs",
    "mehndi designs for back of hand",
    "front hand mehndi design",
    "finger mehndi patterns",
    "mehndi patterns for fingers",
    "easy arabic mehndi design",
    "simple arabic mehndi design",
    "arabic mehndi patterns",
    "indian mehndi designs",
    "pakistani mehndi design",
    "childrens mehndi designs",
    "kids mehndi designs",
    "simple mehndi designs for kids",
    "feet mehndi design",
    "foot henna patterns",
    "mandala mehndi design",
    "circle mehndi design",
    "floral mehndi design",
    "flower designs for henna",
    "henna flower designs",
    "lotus mehndi design",
    "peacock mehndi design",
    "minimalist mehndi designs",
    "contemporary mehndi design",
    "henna patterns for men",
    "henna for men",
    "henna tattoo for men",
    "henna tattoos for men",
    "male henna tattoo",
    "masculine henna tattoos",
    "hand henna",
    "henna hand tattoo",
    "henna tattoos on the hand",
    "henna tattoo designs for hands",
    "henna hand tattoo ideas",
    "simple henna tattoo designs",
    "easy henna tattoos",
    "small henna tattoo",
    "butterfly henna tattoo",
    "henna arm tattoo",
    "henna foot tattoo",
    "henna wrist tattoo",
    "mehndi design photoshoot",
    "eid henna patterns"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Mehndi Design Gallery | Mehndi Design Henna",
    description:
      "Browse 5000+ stunning mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Filter by country, style, difficulty, and occasion.",
    type: "website",
    url: `${BASE_URL}/gallery`,
    siteName: "Mehndi Design Henna",
    images: [{ url: "/Logo_Mehndidesign.png", width: 800, height: 255, alt: "Mehndi Design Henna Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Design Gallery | Mehndi Design Henna",
    description: "Browse 5000+ stunning mehndi designs from around the world.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Mehndi Design Henna Gallery",
    description:
      "A curated collection of stunning mehndi designs from India, Pakistan, Arabia, Morocco, Turkey, Indonesia, Africa, and Western fusion traditions.",
    url: `${BASE_URL}/gallery`,
    publisher: {
      "@type": "Organization",
      name: "Mehndi Design Henna",
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
