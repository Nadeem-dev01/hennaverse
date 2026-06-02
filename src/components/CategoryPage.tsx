"use client";

import Image from "next/image";
import { Download, Share2 } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import TableOfContents from "./TableOfContents";
import AdSlot from "./AdSlot";
import { DesignCategory } from "@/data/designCategories";

interface CategoryPageProps {
  category: DesignCategory;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      link.setAttribute("download", `mehndi-design-${cleanTitle}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
      window.open(imageUrl, "_blank");
    }
  };

  const handleShare = async (title: string, description: string, urlPath: string) => {
    const shareUrl = `${window.location.origin}${urlPath}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | HennaVerse`,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Mehndi Designs", href: "/mehndi-designs" },
          { label: category.title, href: `/mehndi-designs/${category.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
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

          {/* Hero Image */}
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

          {/* Image Gallery */}
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
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-center z-10">
                    <div className="w-full flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(img.src, img.title || category.title);
                        }}
                        className="p-2 rounded-lg bg-surface/90 hover:bg-gold text-foreground hover:text-background transition-all duration-300 cursor-pointer shadow-md"
                        title="Download Image"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(
                            img.title || category.title,
                            img.alt || category.metaDescription,
                            `/mehndi-designs/${category.slug}#gallery`
                          );
                        }}
                        className="p-2 rounded-lg bg-surface/90 hover:bg-gold text-foreground hover:text-background transition-all duration-300 cursor-pointer shadow-md"
                        title="Share Link"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-white mb-2">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 hidden lg:block space-y-8">
          <TableOfContents />
          <AdSlot adSlot="sidebar-slot" adFormat="rectangle" />
        </aside>
      </div>
    </div>
  );
}
