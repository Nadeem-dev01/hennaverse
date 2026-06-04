"use client";

import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import TableOfContents from "./TableOfContents";
import AdSlot from "./AdSlot";
import { ImageOverlayActions } from "./ImageActions";
import { DesignCategory } from "@/data/designCategories";

export default function CategoryPage({ category }: { category: DesignCategory }) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Mehndi Designs", href: "/mehndi-designs" },
          { label: category.title, href: `/mehndi-designs/${category.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-6">
              {category.title}
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              {category.metaDescription}
            </p>
          </header>

          <AdSlot adSlot="header-slot" />

          {category.heroImage && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-border">
              <Image
                src={category.heroImage}
                alt={category.title}
                fill
                quality={60}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <AdSlot adSlot="footer-slot" className="mt-12" />

          <section className="mt-16" id="gallery">
            <h2 className="text-3xl font-serif text-gold mb-8 border-b border-border pb-4">
              {category.title} Image Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {category.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={60}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <ImageOverlayActions
                    imageUrl={img.src}
                    title={img.title || category.title}
                    description={img.alt || category.metaDescription}
                    urlPath={`/mehndi-designs/${category.slug}#gallery`}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="lg:col-span-4 hidden lg:block space-y-8">
          <TableOfContents />
          <AdSlot adSlot="sidebar-slot" adFormat="rectangle" />
        </aside>
      </div>
    </div>
  );
}
