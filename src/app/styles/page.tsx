import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Mehndi Styles Around the World: Indian, Arabic, Moroccan and More | HennaVerse",
  description:
    "Discover unique henna and mehndi styles from India, Pakistan, Arabia, Morocco, Turkey, Indonesia, Africa, and Western fusion traditions. Explore regional patterns and cultural heritage.",
  keywords: [
    "mehndi styles",
    "henna traditions",
    "indian mehndi",
    "arabic henna",
    "moroccan henna",
    "pakistani mehndi",
    "turkish henna",
    "african henna",
    "henna by country",
  ],
  alternates: {
    canonical: "/styles",
  },
  openGraph: {
    title: "Mehndi Styles Around the World | HennaVerse",
    description:
      "Discover unique henna styles from India, Pakistan, Arabia, Morocco, Turkey, Indonesia, Africa, and Western fusion traditions.",
    type: "website",
    url: `${BASE_URL}/styles`,
    siteName: "HennaVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Styles Around the World | HennaVerse",
    description: "Explore unique henna traditions from cultures across the globe.",
  },
};

export default function StylesPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mehndi Styles Around the World",
    description:
      "Explore unique henna and mehndi traditions from India, Pakistan, Arabia, Morocco, Turkey, Indonesia, Africa, and Western fusion cultures.",
    url: `${BASE_URL}/styles`,
    publisher: {
      "@type": "Organization",
      name: "HennaVerse",
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Styles", item: `${BASE_URL}/styles` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Mehndi Styles Around the World
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Discover unique henna traditions from cultures across the globe
          </p>
        </header>

        <div className="max-w-3xl mb-12 text-muted leading-relaxed">
          <p className="mb-4">
            Henna art is a universal language of celebration, yet every culture has developed its own distinct dialect. From the bold geometric patterns of North Africa to the intricate floral tapestries of South Asia, explore the rich diversity of mehndi styles. Each tradition carries centuries of history, symbolism, and artistry that makes it uniquely beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <CountryCard key={country.id} country={country} index={index} />
          ))}
        </div>
      </main>
    </>
  );
}
