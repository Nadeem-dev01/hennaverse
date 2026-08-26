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
    canonical: "/tools/design-finder",
  },
  openGraph: {
    title: "AI Mehndi Design Finder | Mehndi Design Henna",
    description:
      "Upload a photo of your hand and let our AI suggest the perfect mehndi designs tailored for you.",
    url: "/tools/design-finder",
    type: "website",
  },
};

export default function DesignFinderPage() {
  
  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "inLanguage": "en",
    "name": "AI Mehndi Design Finder",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
    "description": "Upload a photo of your hand or foot, and our AI-powered Design Finder will analyze the shape and suggest the perfect mehndi designs."
  };

  return (
    <>
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <DesignFinderClient />
    </>
  );
}
