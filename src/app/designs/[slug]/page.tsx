import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDesigns, designBySlug } from "@/data/index";
import DesignDetailPage from "@/components/DesignDetailPage";
import { buildImageObjectSchema, buildFAQSchema } from "@/lib/schema";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return allDesigns.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const design = designBySlug.get(params.slug);
  if (!design) return { title: "Not Found" };

  return {
    title: design.title,
    description: design.descriptionParagraphs[0]?.slice(0, 160) || design.image.alt,
    alternates: { canonical: `/designs/${design.slug}` },
    openGraph: {
      title: design.title,
      description: design.descriptionParagraphs[0]?.slice(0, 160) || design.image.alt,
      images: [{ url: design.image.src, width: design.image.width, height: design.image.height, alt: design.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: design.title,
      description: design.descriptionParagraphs[0]?.slice(0, 160) || design.image.alt,
    },
  };
}

export default async function DesignPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const design = designBySlug.get(params.slug);
  if (!design) notFound();

  const related = design.relatedIds
    .map((id) => allDesigns.find((d) => d.id === id))
    .filter(Boolean)
    .slice(0, 8) as typeof allDesigns;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: design.title,
    image: `${BASE_URL}${design.image.src}`,
    description: design.descriptionParagraphs[0]?.slice(0, 160) || design.image.alt,
    author: {
      "@type": "Organization",
      name: "Mehndi Design Henna",
    },
    datePublished: "2025-01-01",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Designs", item: `${BASE_URL}/gallery` },
      { "@type": "ListItem", position: 3, name: design.title, item: `${BASE_URL}/designs/${design.slug}` },
    ],
  };

  const schemas = [
    buildImageObjectSchema(design.image),
    creativeWorkSchema,
    breadcrumbSchema,
    ...(design.faq.length ? [buildFAQSchema(design.faq)] : []),
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <DesignDetailPage design={design} relatedDesigns={related} />
    </>
  );
}
