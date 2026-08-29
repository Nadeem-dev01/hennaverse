import { Metadata } from "next";
import { notFound } from "next/navigation";
import { designCategories } from "@/data/designCategories";
import { categories } from "@/data/taxonomy";
import { designsByCategory } from "@/data/index";
import CategoryPage from "@/components/CategoryPage";
import CategoryDesignsPage from "@/components/CategoryDesignsPage";

const BASE_URL = "https://www.mehndidesignhenna.com";

// All valid category slugs = union of curated (designCategories) + taxonomy (26).
const allCategorySlugs = Array.from(
  new Set([
    ...designCategories.map((c) => c.slug),
    ...categories.map((c) => c.slug),
  ])
);

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

  const metaTitle = curated?.metaTitle ?? taxo?.metaTitle;
  const metaDescription = curated?.metaDescription ?? taxo?.metaDescription;
  if (!metaTitle) return { title: "Not Found" };

  const heroImage = curated?.heroImage;
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const canonicalUrl = page > 1 
    ? `/mehndi-designs/${params.slug}?page=${page}` 
    : `/mehndi-designs/${params.slug}`;

  return {
    title: page > 1 ? `${metaTitle} - Page ${page}` : metaTitle,
    description: metaDescription,
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

  // Breadcrumb JSON-LD is emitted by the <Breadcrumbs> component inside
  // CategoryPage / CategoryDesignsPage, matching the visible trail — so we
  // intentionally do NOT add a second BreadcrumbList here.

  // Curated categories keep their existing rich, hand-built page.
  if (curated) {
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "inLanguage": "en",
        headline: metaTitle,
        description: metaDescription,
        image: heroImage ? [heroImage] : [],
        author: { "@type": "Organization", name: "Mehndi Design Henna" },
        publisher: {
          "@type": "Organization",
          name: "Mehndi Design Henna",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.png` },
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
        <CategoryPage category={curated} />
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
      <CategoryDesignsPage 
        category={taxo!} 
        designs={designs} 
        related={related} 
        currentPage={currentPage}
      />
    </>
  );
}
