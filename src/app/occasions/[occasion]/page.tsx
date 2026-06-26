import { Metadata } from "next";
import { notFound } from "next/navigation";
import { occasions } from "@/data/taxonomy";
import { designsByOccasion } from "@/data/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import DesignGrid from "@/components/DesignGrid";
import { buildCollectionPageSchema } from "@/lib/schema";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return occasions.map((o) => ({ occasion: o.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ occasion: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const occasion = occasions.find((o) => o.slug === params.occasion);
  if (!occasion) return { title: "Not Found" };

  const designs = designsByOccasion.get(occasion.slug) ?? [];
  const firstImage = designs[0]?.image?.src;
  const ogImages = firstImage ? [{ url: firstImage, width: 800, height: 800, alt: occasion.title }] : [];

  return {
    title: occasion.metaTitle,
    description: occasion.metaDescription,
    keywords: occasion.keywords,
    alternates: { canonical: `/occasions/${occasion.slug}` },
    openGraph: {
      title: occasion.metaTitle,
      description: occasion.metaDescription,
      url: `${BASE_URL}/occasions/${occasion.slug}`,
      siteName: "Mehndi Design Henna",
      locale: "en_US",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: occasion.metaTitle,
      description: occasion.metaDescription,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function OccasionPage(
  props: { params: Promise<{ occasion: string }> }
) {
  const params = await props.params;
  const occasion = occasions.find((o) => o.slug === params.occasion);
  if (!occasion) notFound();

  const designs = designsByOccasion.get(occasion.slug) ?? [];
  const schema = buildCollectionPageSchema(occasion.title, occasion.metaDescription, `/occasions/${occasion.slug}`);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "en",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Occasions", item: `${BASE_URL}/mehndi-designs` },
      { "@type": "ListItem", position: 3, name: occasion.title, item: `${BASE_URL}/occasions/${occasion.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Occasions", href: "/mehndi-designs" },
            { label: occasion.title, href: `/occasions/${occasion.slug}` },
          ]}
        />
        <SectionHeading title={occasion.title} subtitle={occasion.metaDescription} />

        <DesignGrid designs={designs} />

        {/* SEO Text Section */}
        {occasion.keywords && occasion.keywords.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <div className="prose prose-invert prose-gold max-w-none">
              <h2>About {occasion.title}</h2>
              <p>
                {occasion.metaDescription} Browse our curated collection of {designs.length}+ {occasion.title.toLowerCase()} patterns, from traditional and classic to modern and minimalist styles. Whether you are looking for {occasion.keywords.slice(0, 3).join(", ")}, you will find the perfect inspiration here.
              </p>
              <p>
                Each design in this collection has been handpicked to represent the best of henna artistry for {occasion.title.toLowerCase()} occasions. Save your favorites, share with your artist, or use as inspiration for your own mehndi application.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
