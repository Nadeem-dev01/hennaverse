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
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
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
        name: "Mehndi Design Henna",
      },
      publisher: {
        "@type": "Organization",
        name: "Mehndi Design Henna",
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Mehndi Designs", item: `${BASE_URL}/mehndi-designs` },
        { "@type": "ListItem", position: 3, name: category.title, item: `${BASE_URL}/mehndi-designs/${category.slug}` },
      ],
    },
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
