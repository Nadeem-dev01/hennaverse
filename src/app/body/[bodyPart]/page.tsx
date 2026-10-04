import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bodyParts } from "@/data/taxonomy";
import { designsByBodyPart } from "@/data/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import DesignGrid from "@/components/DesignGrid";
import Pagination from "@/components/Pagination";
import { buildCollectionPageSchema } from "@/lib/schema";
import { clampDescription } from "@/lib/seo";

const BASE_URL = "https://www.mehndidesignhenna.com";

const DESIGNS_PER_PAGE = 48;

function parsePage(value: string | string[] | undefined) {
  const page = typeof value === "string" ? parseInt(value, 10) : 1;
  return isNaN(page) || page < 1 ? 1 : page;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return bodyParts.map((bp) => ({ bodyPart: bp.slug }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ bodyPart: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const page = parsePage((await props.searchParams).page);
  const bodyPart = bodyParts.find((bp) => bp.slug === params.bodyPart);
  if (!bodyPart) return { title: "Not Found" };

  const designs = designsByBodyPart.get(bodyPart.slug) ?? [];
  const firstImage = designs[0]?.image?.src;
  const ogImages = firstImage
    ? [{ url: `${BASE_URL}${firstImage}`, width: 800, height: 800, alt: bodyPart.title }]
    : [];

  return {
    title: page > 1 ? `${bodyPart.metaTitle} - Page ${page}` : bodyPart.metaTitle,
    description: clampDescription(bodyPart.metaDescription),
    alternates: {
      canonical: page > 1 ? `/body/${bodyPart.slug}?page=${page}` : `/body/${bodyPart.slug}`,
    },
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
      images: firstImage ? [`${BASE_URL}${firstImage}`] : [],
    },
  };
}

export default async function BodyPartPage(
  props: {
    params: Promise<{ bodyPart: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const params = await props.params;
  const currentPage = parsePage((await props.searchParams).page);
  const bodyPart = bodyParts.find((bp) => bp.slug === params.bodyPart);
  if (!bodyPart) notFound();

  const designs = designsByBodyPart.get(bodyPart.slug) ?? [];
  const totalPages = Math.max(1, Math.ceil(designs.length / DESIGNS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageDesigns = designs.slice((safePage - 1) * DESIGNS_PER_PAGE, safePage * DESIGNS_PER_PAGE);

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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryLd) }} />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Mehndi Designs", href: "/mehndi-designs" },
            { label: bodyPart.title, href: `/body/${bodyPart.slug}` },
          ]}
        />

        <SectionHeading
          as="h1"
          title={bodyPart.title}
          subtitle={bodyPart.metaDescription}
        />

        {designs.length > 0 ? (
          <>
            <DesignGrid designs={pageDesigns} />
            <Pagination currentPage={safePage} totalPages={totalPages} basePath={`/body/${bodyPart.slug}`} />
          </>
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
              <Link href="/mehndi-designs" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">mehndi designs</Link> to discover more styles, or explore
              designs by occasion such as{" "}
              <Link href="/occasions/wedding" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">wedding mehndi</Link>,{" "}
              <Link href="/occasions/eid" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Eid mehndi</Link>, and{" "}
              <Link href="/occasions/engagement" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">engagement mehndi</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
