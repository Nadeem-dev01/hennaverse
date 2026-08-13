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

  const metaDesc = design.descriptionParagraphs[0]?.slice(0, 160) || 
    `Explore this stunning ${design.image.alt}. Get inspired by our step-by-step guides and save this design for your next occasion!`;

  // Build a richer title: "<DesignName> — <Category> Mehndi Design"
  // The layout template appends "| Mehndi Design Henna" automatically.
  const categoryLabel = design.categories?.[0]
    ? design.categories[0].charAt(0).toUpperCase() + design.categories[0].slice(1)
    : "";
  const enrichedTitle = categoryLabel
    ? `${design.title} — ${categoryLabel} Mehndi Design`
    : design.title;

  return {
    title: enrichedTitle,
    description: metaDesc,
    alternates: { canonical: `/designs/${design.slug}` },
    openGraph: {
      title: enrichedTitle,
      description: metaDesc,
      images: [{ url: design.image.src, width: design.image.width, height: design.image.height, alt: design.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: enrichedTitle,
      description: metaDesc,
      images: [design.image.src],
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
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Mehndi Design Henna",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/Logo_Mehndidesign.png`,
        width: 800,
        height: 255,
      },
    },
    datePublished: "2024-01-01",
    dateModified: "2026-06-26",
    keywords: design.tags.join(", "),
    url: `${BASE_URL}/designs/${design.slug}`,
  };

  // Breadcrumb JSON-LD is emitted by the <Breadcrumbs> component inside
  // DesignDetailPage (Home > Mehndi Designs > Category > Title), which matches
  // the visible trail. Avoid a second, conflicting BreadcrumbList here.
  const schemas = [
    buildImageObjectSchema(design.image),
    creativeWorkSchema,
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
