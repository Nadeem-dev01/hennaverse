import { Metadata } from "next";
import { notFound } from "next/navigation";
import { bodyParts } from "@/data/taxonomy";
import { designsByBodyPart } from "@/data/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import DesignGrid from "@/components/DesignGrid";
import { buildCollectionPageSchema } from "@/lib/schema";

const BASE_URL = "https://www.mehndidesignhenna.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return bodyParts.map((bp) => ({ bodyPart: bp.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ bodyPart: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const bodyPart = bodyParts.find((bp) => bp.slug === params.bodyPart);
  if (!bodyPart) return { title: "Not Found" };

  const designs = designsByBodyPart.get(bodyPart.slug) ?? [];
  const firstImage = designs[0]?.image?.src;
  const ogImages = firstImage
    ? [{ url: firstImage, width: 800, height: 800, alt: bodyPart.title }]
    : [];

  return {
    title: bodyPart.metaTitle,
    description: bodyPart.metaDescription,
    alternates: { canonical: `/body/${bodyPart.slug}` },
    openGraph: {
      title: bodyPart.metaTitle,
      description: bodyPart.metaDescription,
      url: `${BASE_URL}/body/${bodyPart.slug}`,
      siteName: "Mehndi Design Henna",
      locale: "en_US",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: bodyPart.metaTitle,
      description: bodyPart.metaDescription,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function BodyPartPage(
  props: { params: Promise<{ bodyPart: string }> }
) {
  const params = await props.params;
  const bodyPart = bodyParts.find((bp) => bp.slug === params.bodyPart);
  if (!bodyPart) notFound();

  const designs = designsByBodyPart.get(bodyPart.slug) ?? [];

  const schema = buildCollectionPageSchema(
    bodyPart.title,
    bodyPart.metaDescription,
    `/body/${bodyPart.slug}`
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "en",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Mehndi Designs", item: `${BASE_URL}/mehndi-designs` },
      { "@type": "ListItem", position: 3, name: bodyPart.title, item: `${BASE_URL}/body/${bodyPart.slug}` },
    ],
  };

  const imageGalleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "inLanguage": "en",
    name: `${bodyPart.title} Gallery`,
    description: bodyPart.metaDescription,
    image: designs.slice(0, 30).map((d) => ({
      "@type": "ImageObject",
      contentUrl: `${BASE_URL}${d.image.src}`,
      description: d.image.alt,
      width: d.image.width,
      height: d.image.height,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryLd) }} />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Mehndi Designs", href: "/mehndi-designs" },
            { label: bodyPart.title, href: `/body/${bodyPart.slug}` },
          ]}
        />

        <SectionHeading
          title={bodyPart.title}
          subtitle={bodyPart.metaDescription}
        />

        {designs.length > 0 ? (
          <DesignGrid designs={designs} />
        ) : (
          <div className="text-center py-20 text-muted">
            <p className="text-lg">No designs found for this body part yet. Check back soon!</p>
          </div>
        )}

        {/* SEO Text Section */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="prose prose-invert prose-gold max-w-none">
            <h2>About {bodyPart.title}</h2>
            <p>
              {bodyPart.metaDescription} Our collection features {designs.length}+ unique patterns
              curated from professional henna artists worldwide. Whether you prefer traditional
              coverage or modern minimalist styles, explore our gallery to find your perfect design.
            </p>
            <p>
              Browse our full library of{" "}
              <a href="/mehndi-designs">mehndi designs</a> to discover more styles, or explore
              designs by occasion such as{" "}
              <a href="/occasions/wedding">wedding mehndi</a>,{" "}
              <a href="/occasions/eid">Eid mehndi</a>, and{" "}
              <a href="/occasions/engagement">engagement mehndi</a>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
