import DesignFinderClient from "./DesignFinderClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Mehndi Design Finder | Suggest Henna based on Your Hand",
  description:
    "Upload a photo of your hand or foot, and our AI-powered Design Finder will analyze the shape and suggest the perfect mehndi designs from across the web.",
  keywords: [
    "mehndi design finder",
    "ai mehndi tool",
    "find mehndi for my hand",
    "henna suggestion tool",
    "upload hand for mehndi",
    "mehndi scanner",
    "ai henna design",
    "best mehndi for my hand",
    "suggest mehndi design",
    "henna match maker"
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/tools/design-finder",
  },
  openGraph: {
    title: "AI Mehndi Design Finder | Mehndi Design Henna",
    description:
      "Upload a photo of your hand and let our AI suggest the perfect mehndi designs tailored for you.",
    url: "https://www.mehndidesignhenna.com/tools/design-finder",
    type: "website",
  },
};

export default function DesignFinderPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "en",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mehndidesignhenna.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.mehndidesignhenna.com/tools" },
      { "@type": "ListItem", position: 3, name: "AI Mehndi Design Finder", item: "https://www.mehndidesignhenna.com/tools/design-finder" }
    ],
  };

  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "inLanguage": "en",
    "name": "AI Mehndi Design Finder",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Upload a photo of your hand or foot, and our AI-powered Design Finder will analyze the shape and suggest the perfect mehndi designs."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <DesignFinderClient />
    </>
  );
}
