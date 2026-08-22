import TryOnClient from "./TryOnClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Mehndi Try-On Tool | See Henna on Your Hand",
  description:
    "Upload a photo of your hand and try on 100+ beautiful mehndi designs instantly. Adjust, rotate, and preview henna art on your own skin tone before booking an artist.",
  alternates: {
    canonical: "/try-on",
  },
  openGraph: {
    title: "Virtual Mehndi Try-On Tool | Mehndi Design Henna",
    description:
      "Try on mehndi designs virtually! Upload your hand photo and preview 100+ stunning henna patterns instantly.",
    url: "/try-on",
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

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Virtual Mehndi Try-On Tool",
    "operatingSystem": "Web",
    "applicationCategory": "LifestyleApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <TryOnClient />
    </>
  );
}
