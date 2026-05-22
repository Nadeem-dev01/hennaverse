import { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { designs } from "@/data/designs";

export const metadata: Metadata = {
  title: "Design Gallery | HennaVerse",
  description: "Browse 100+ stunning mehndi designs from around the world. Filter by country, style, and difficulty.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Design Gallery | HennaVerse",
    description: "Browse 100+ stunning mehndi designs from around the world.",
    type: "website",
    url: "https://hennaverse.com/gallery",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "HennaVerse Design Gallery",
    description: "Browse 100+ stunning mehndi designs from around the world.",
    url: "https://hennaverse.com/gallery",
    image: designs.slice(0, 10).map((d) => ({
      "@type": "ImageObject",
      url: `https://hennaverse.com${d.imageUrl}`,
      caption: d.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryClient />
    </>
  );
}
