import { blogs } from "@/data/blogs";
import BlogClient from "./BlogClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BASE_URL = "https://www.mehndidesignhenna.com";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return { title: "Post Not Found" };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
      url: `${BASE_URL}/blog/${blog.slug}`,
      siteName: "Mehndi Design Henna",
      ...(blog.imageUrl && {
        images: [{ url: `${BASE_URL}${blog.imageUrl}`, width: 1200, height: 630, alt: blog.title }],
      }),
      section: blog.category,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      ...(blog.imageUrl && { images: [`${BASE_URL}${blog.imageUrl}`] }),
    },
    keywords: blog.tags,
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "inLanguage": "en",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.imageUrl ? `${BASE_URL}${blog.imageUrl}` : undefined,
    author: {
      "@type": "Person",
      name: blog.author,
      url: BASE_URL,
    },
    datePublished: new Date(blog.date).toISOString(),
    dateModified: new Date().toISOString(),
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${blog.slug}`,
    },
    articleSection: blog.category,
    keywords: blog.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": "en",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: blog.title, item: `${BASE_URL}/blog/${blog.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogClient params={props.params} />
    </>
  );
}
