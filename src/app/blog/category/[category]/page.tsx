import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getBlogsByCategory } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BASE_URL = "https://www.mehndidesignhenna.com";

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const categories = getAllCategories();
  const matchedCategory = categories.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-") === params.category.toLowerCase()
  );

  if (!matchedCategory) {
    return { title: "Category Not Found" };
  }

  const title = `${matchedCategory} Henna Articles & Guides | Mehndi Design Henna`;
  const description = `Explore our collection of expert ${matchedCategory.toLowerCase()} articles, tips, and tutorials about henna and mehndi art.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/category/${params.category}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${BASE_URL}/blog/category/${params.category}`,
      siteName: "Mehndi Design Henna",
    },
  };
}

export default async function BlogCategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const categories = getAllCategories();
  const matchedCategory = categories.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-") === params.category.toLowerCase()
  );

  if (!matchedCategory) {
    notFound();
  }

  const categoryBlogs = getBlogsByCategory(matchedCategory);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: matchedCategory,
        item: `${BASE_URL}/blog/category/${params.category}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to All Articles
          </Link>
        </div>

        <header className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/30 uppercase tracking-widest mb-3">
            Category
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 capitalize">
            {matchedCategory} Articles
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Browse all expert guides, insights, and stories categorized under {matchedCategory}.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryBlogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} index={index} />
          ))}
        </div>

        {categoryBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No articles found in this category.</p>
            <Link
              href="/blog"
              className="mt-4 inline-block text-gold hover:text-gold-light transition-colors text-sm"
            >
              Browse all blog posts
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
