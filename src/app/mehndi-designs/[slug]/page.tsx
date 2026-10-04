import { Metadata } from "next";
import { notFound } from "next/navigation";
import { designCategories } from "@/data/designCategories";
import { categories } from "@/data/taxonomy";
import { designsByCategory } from "@/data/index";
import CategoryPage from "@/components/CategoryPage";
import CategoryDesignsPage from "@/components/CategoryDesignsPage";
import DesignGrid from "@/components/DesignGrid";
import Pagination from "@/components/Pagination";
import FAQAccordion from "@/components/FAQAccordion";
import CategoryGuide from "@/components/CategoryGuide";
import { clampDescription } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";
import type { DesignFAQ } from "@/data/types";

const BASE_URL = "https://www.mehndidesignhenna.com";

// All valid category slugs = union of curated (designCategories) + taxonomy (26).
const allCategorySlugs = Array.from(
  new Set([
    ...designCategories.map((c) => c.slug),
    ...categories.map((c) => c.slug),
  ])
);

const DESIGNS_PER_PAGE = 48;

export const dynamicParams = false;

export function generateStaticParams() {
  return allCategorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const curated = designCategories.find((c) => c.slug === params.slug);
  const taxo = categories.find((c) => c.slug === params.slug);

  // The root layout title template appends "| Mehndi Design Henna" — strip it
  // from curated metaTitles so the brand is not repeated twice.
  const metaTitle = (curated?.metaTitle ?? taxo?.metaTitle)?.replace(/\s*\|\s*Mehndi Design Henna\s*$/, "");
  const metaDescription = curated?.metaDescription ?? taxo?.metaDescription;
  if (!metaTitle) return { title: "Not Found" };

  const heroImage = curated?.heroImage;
  const parsedPage = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const canonicalUrl = page > 1 
    ? `/mehndi-designs/${params.slug}?page=${page}` 
    : `/mehndi-designs/${params.slug}`;

  return {
    title: page > 1 ? `${metaTitle} - Page ${page}` : metaTitle,
    description: clampDescription(metaDescription),
    keywords: taxo?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page > 1 ? `${metaTitle} - Page ${page}` : metaTitle,
      description: metaDescription,
      images: heroImage ? [{ url: `${BASE_URL}${heroImage}`, width: 820, height: 1024, alt: metaTitle }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page > 1 ? `${metaTitle} - Page ${page}` : metaTitle,
      description: metaDescription,
    },
  };
}

export default async function MehndiDesignCategoryPage(
  props: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const curated = designCategories.find((c) => c.slug === params.slug);
  const taxo = categories.find((c) => c.slug === params.slug);

  if (!curated && !taxo) {
    notFound();
  }

  const metaTitle = curated?.metaTitle ?? taxo!.metaTitle;
  const metaDescription = curated?.metaDescription ?? taxo!.metaDescription;
  const heroImage = curated?.heroImage;
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  // Category FAQ from the factbank (only some categories have one), shown on page 1.
  const factbank = await import(`@/data/factbanks/${params.slug}.json`).catch(() => null);
  const faq: DesignFAQ[] = currentPage === 1 ? factbank?.default?.faqPool ?? [] : [];
  const faqSchema = faq.length ? buildFAQSchema(faq) : null;

  // Breadcrumb JSON-LD is emitted by the <Breadcrumbs> component inside
  // CategoryPage / CategoryDesignsPage, matching the visible trail — so we
  // intentionally do NOT add a second BreadcrumbList here.

  // Curated categories keep their existing rich, hand-built page.
  if (curated) {
    // Link the curated landing page into the full design dataset so the
    // individual /designs/ pages in this category are crawlable from it.
    const curatedDesigns = designsByCategory.get(curated.slug) ?? [];
    const curatedTotalPages = Math.max(1, Math.ceil(curatedDesigns.length / DESIGNS_PER_PAGE));
    const curatedPage = Math.min(currentPage, curatedTotalPages);
    const curatedStart = (curatedPage - 1) * DESIGNS_PER_PAGE;

    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "inLanguage": "en",
        headline: metaTitle,
        description: metaDescription,
        image: heroImage ? [`${BASE_URL}${heroImage}`] : [],
        author: { "@type": "Organization", name: "Mehndi Design Henna" },
        publisher: {
          "@type": "Organization",
          name: "Mehndi Design Henna",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/Logo_Mehndidesign.png` },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "inLanguage": "en",
        name: `${curated.title} Gallery`,
        description: `A collection of beautiful ${curated.title} images.`,
        image: curated.images.map((img) => ({
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}${img.src}`,
          description: img.alt,
        })),
      },
    ];

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
        <CategoryPage category={curated}>
          {curatedDesigns.length > 0 && (
            <section className="mt-16" id="all-designs">
              <h2 className="text-3xl font-serif text-gold mb-2 border-b border-border pb-4">
                All {curated.title} {curatedPage > 1 && `- Page ${curatedPage}`}
              </h2>
              <p className="text-muted text-sm mt-3">
                Showing {curatedStart + 1}-{Math.min(curatedStart + DESIGNS_PER_PAGE, curatedDesigns.length)} of {curatedDesigns.length} designs in this collection
              </p>
              <DesignGrid designs={curatedDesigns.slice(curatedStart, curatedStart + DESIGNS_PER_PAGE)} />
              <Pagination
                currentPage={curatedPage}
                totalPages={curatedTotalPages}
                basePath={`/mehndi-designs/${curated.slug}`}
              />
            </section>
          )}
          {currentPage === 1 && (
            <CategoryGuide title={curated.title} slug={curated.slug} factbank={factbank?.default ?? null} />
          )}
          <FAQAccordion items={faq} />
        </CategoryPage>
      </>
    );
  }

  // Non-curated taxonomy categories: render from the design dataset.
  const designs = designsByCategory.get(taxo!.slug) ?? [];
  if (designs.length === 0) {
    notFound();
  }

  const related = categories
    .filter((c) => c.slug !== taxo!.slug)
    .slice(0, 12)
    .map((c) => ({ slug: c.slug, title: c.title }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "inLanguage": "en",
      name: metaTitle,
      description: metaDescription,
      url: `${BASE_URL}/mehndi-designs/${taxo!.slug}`,
      publisher: { "@type": "Organization", name: "Mehndi Design Henna", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "inLanguage": "en",
      name: `${taxo!.title} Gallery`,
      description: metaDescription,
      image: designs.slice(0, 30).map((d) => ({
        "@type": "ImageObject",
        contentUrl: `${BASE_URL}${d.image.src}`,
        description: d.image.alt,
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <CategoryDesignsPage 
        category={taxo!} 
        designs={designs} 
        related={related} 
        currentPage={currentPage}
      >
        {currentPage === 1 && (
          <CategoryGuide title={taxo!.title} slug={taxo!.slug} factbank={factbank?.default ?? null} />
        )}
        <FAQAccordion items={faq} />
      </CategoryDesignsPage>
    </>
  );
}
