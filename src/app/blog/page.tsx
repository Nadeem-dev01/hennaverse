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
