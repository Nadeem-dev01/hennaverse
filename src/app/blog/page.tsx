import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Mehndi Design Blog: Tutorials, Tips and Cultural Guides | HennaVerse",
  description:
    "Read expert henna and mehndi tutorials, bridal design guides, aftercare tips, and cultural insights from India, Pakistan, Arabia, Morocco and beyond. Updated weekly.",
    keywords: [
    "mehndi blog",
    "henna tutorials",
    "mehndi design tips",
    "bridal henna guide",
    "henna aftercare",
    "mehndi culture",
    "henna art blog",
    "mehndi tutorial videos",
    "how to apply mehndi",
    "henna paste recipe",
    "mehndi care tips",
    "darkest henna stain",
    "mehndi design ideas",
    "henna inspiration blog",
    "mehndi history",
    "henna traditions",
    "cultural henna guide",
    "indian mehndi blog",
    "arabic henna tutorial",
    "pakistani mehndi tips",
    "moroccan henna guide",
    "turkish henna blog",
    "african henna traditions",
    "beginner mehndi guide",
    "easy henna tutorial",
    "bridal mehndi planning",
    "wedding henna tips",
    "eid mehndi ideas",
    "festival henna guide",
    "minimalist mehndi tips",
    "modern henna trends",
    "mehndi artist guide",
    "henna cone making",
    "natural henna diy",
    "mehndi aftercare secrets",
    "henna stain tips",
    "mehndi design trends",
    "henna art techniques",
    "mehndi pattern guide",
    "professional henna tips"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Mehndi Design Blog: Tutorials, Tips and Cultural Guides",
    description:
      "Expert henna tutorials, bridal mehndi guides, aftercare secrets, and cultural insights from traditions around the world.",
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "HennaVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Design Blog | HennaVerse",
    description:
      "Expert henna tutorials, bridal mehndi guides, aftercare secrets, and cultural insights.",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "HennaVerse Blog",
    description:
      "Expert mehndi tutorials, cultural guides, bridal henna tips, and design inspiration from traditions around the world.",
    url: `${BASE_URL}/blog`,
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
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
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
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            HennaVerse Blog
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Stories, tutorials, and cultural insights from the world of henna art
          </p>
        </header>

        <BlogListClient />
      </main>
    </>
  );
}
