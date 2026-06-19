import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const metadata: Metadata = {
  title: "Henna Guides: How Long Does Henna Last, Henna Kits, Removal and More | Mehndi Design Henna",
  description:
    "Answers to every henna question: how long does henna last, how to remove henna, how long does henna take to dry, what henna is made of, henna vs mehndi, plus henna kit, cone, and powder guides.",
    keywords: [
    "how long does henna last",
    "how long do henna tattoos last",
    "how long does henna take to dry",
    "how to remove henna",
    "how to remove henna from skin",
    "what henna is made of",
    "how to make henna",
    "henna vs mehndi",
    "henna hair dye",
    "henna dye hair colors",
    "henna hair color",
    "henna for hair",
    "henna powder for hair",
    "henna eyebrows",
    "henna brows",
    "henna eyebrow tint",
    "black henna",
    "jagua henna",
    "red henna",
    "henna freckles",
    "henna kit",
    "henna kits",
    "henna tattoo kit",
    "henna cones",
    "henna cone",
    "henna powder",
    "henna paste",
    "henna pen",
    "henna plant",
    "henna stencils",
    "mehndi stencils",
    "henna and tattoos",
    "henna hand tattoo",
    "henna tattoo ideas",
    "temporary henna tattoos",
    "permanent henna tattoo",
    "henna tattoo removal",
    "how to remove henna tattoo",
    "henna tattoo meaning",
    "henna tattoo symbolism",
    "how much do henna tattoos cost",
    "henna tattoos how long does it last",
    "what is henna tattoo",
    "henna tattoo aftercare",
    "dark henna tattoo",
    "henna tattoo eyebrows",
    "henna for men",
    "henna patterns for men",
    "henna artist near me",
    "henna tattoo near me",
    "henna tattoo close to me",
    "henna tattoos near me",
    "henna tattoo artist near me",
    "henna cones near me",
    "bridal henna near me",
    "henna with hair dye",
    "henna hair",
    "henna color",
    "eyebrows and henna",
    "henna simple design for hand",
    "clothes for mehndi",
    "mehndi wear",
    "mehndi outfit",
    "outfits for mehndi",
    "mehndi dress",
    "mehndi dress for bride",
    "pakistani mehndi wear",
    "mehndi decor",
    "mehndi stickers",
    "mehndi henna"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Henna Guides: How Long Does Henna Last, Henna Kits, Removal and More",
    description:
      "How long does henna last, how to remove henna, henna vs mehndi, and complete henna kit, cone, and powder guides.",
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "Mehndi Design Henna",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henna Guides and Tutorials | Mehndi Design Henna",
    description:
      "How long does henna last, how to remove henna, henna vs mehndi, and complete henna kit guides.",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mehndi Design Henna Blog",
    description:
      "Expert mehndi tutorials, cultural guides, bridal henna tips, and design inspiration from traditions around the world.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Mehndi Design Henna",
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
            Mehndi Design Henna Blog
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
