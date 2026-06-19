import TryOnClient from "./TryOnClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Mehndi Try-On Tool | See Henna on Your Hand",
  description:
    "Upload a photo of your hand and try on 100+ beautiful mehndi designs instantly. Adjust, rotate, and preview henna art on your own skin tone before booking an artist.",
  keywords: [
    "virtual mehndi try on",
    "henna try on tool",
    "hand henna",
    "henna hand tattoo",
    "mehndi patterns for hands",
    "mehndi designs on hands",
    "henna stencils",
    "mehndi stencils",
    "easy mehndi designs",
    "henna and tattoos",
    "henna tattoo ideas",
    "mehndi design photoshoot",
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/try-on",
  },
  openGraph: {
    title: "Virtual Mehndi Try-On Tool | Mehndi Design Henna",
    description:
      "Try on mehndi designs virtually! Upload your hand photo and preview 100+ stunning henna patterns instantly.",
    url: "https://www.mehndidesignhenna.com/try-on",
    type: "website",
    siteName: "Mehndi Design Henna",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Mehndi Try-On Tool | Mehndi Design Henna",
    description: "Try on mehndi designs virtually! Upload your hand photo and preview henna patterns instantly.",
  },
};

const BASE_URL = "https://www.mehndidesignhenna.com";

export default function TryOnPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Virtual Try-On", item: `${BASE_URL}/try-on` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TryOnClient />
    </>
  );
}
