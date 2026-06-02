import { Metadata } from "next";
import { notFound } from "next/navigation";
import { designCategories } from "@/data/designCategories";
import CategoryPage from "@/components/CategoryPage";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const category = designCategories.find((c) => c.slug === params.slug);
  
  if (!category) {
    return { title: "Not Found" };
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `/mehndi-designs/${category.slug}`,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      images: category.heroImage ? [{ url: category.heroImage }] : [],
    },
  };
}

export function generateStaticParams() {
  return designCategories.map((cat) => ({
    slug: cat.slug,
  }));
}

const BASE_URL = "https://www.mehndidesignhenna.com";

export default async function MehndiDesignCategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = designCategories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: category.metaTitle,
      description: category.metaDescription,
      image: category.heroImage ? [category.heroImage] : [],
      author: {
        "@type": "Organization",
        name: "HennaVerse",
      },
      publisher: {
        "@type": "Organization",
        name: "HennaVerse",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/icon.png`,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: `${category.title} Gallery`,
      description: `A collection of beautiful ${category.title} images.`,
      image: category.images.map(img => ({
        "@type": "ImageObject",
        contentUrl: `${BASE_URL}${img.src}`,
        description: img.alt
      }))
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPage category={category} />
    </>
  );
}
