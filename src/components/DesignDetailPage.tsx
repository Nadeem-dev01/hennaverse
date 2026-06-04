"use client";

import Image from "next/image";
import Link from "next/link";
import type { Design } from "@/data/types";
import Breadcrumbs from "./Breadcrumbs";
import FAQAccordion from "./FAQAccordion";
import RelatedDesigns from "./RelatedDesigns";
import AdSlot from "./AdSlot";
import { DownloadButton, ShareButton } from "./ImageActions";

function titleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DesignDetailPage({
  design,
  relatedDesigns,
}: {
  design: Design;
  relatedDesigns: Design[];
}) {
  const catTitle = titleCase(design.category.replace(/-/g, " "));

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Mehndi Designs", href: "/mehndi-designs" },
          { label: `${catTitle} Mehndi`, href: `/mehndi-designs/${design.category}` },
          { label: design.title, href: `/designs/${design.slug}` },
        ]}
      />

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-4">
            {design.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {design.difficulty && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple/10 text-purple border border-purple/20">
                {design.difficulty}
              </span>
            )}
            {design.bodyPart && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20">
                {titleCase(design.bodyPart.replace(/-/g, " "))}
              </span>
            )}
            {design.occasion && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20">
                {titleCase(design.occasion.replace(/-/g, " "))}
              </span>
            )}
            {design.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs rounded-full bg-surface text-muted border border-border">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="relative w-full max-w-2xl mx-auto mb-6">
          <Image
            src={design.image.src}
            alt={design.image.alt}
            width={design.image.width}
            height={design.image.height}
            className="rounded-2xl border border-border w-full h-auto"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
          {design.image.credit && (
            <p className="text-xs text-muted mt-2 text-center">
              Photo by{" "}
              {design.image.creditUrl ? (
                <a href={design.image.creditUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  {design.image.credit}
                </a>
              ) : (
                design.image.credit
              )}
              {" "}({design.image.license})
            </p>
          )}
        </div>

        {/* Download & Share Buttons */}
        <div className="flex items-center justify-center gap-3 mb-10 max-w-2xl mx-auto">
          <DownloadButton imageUrl={design.image.src} title={design.title} />
          <ShareButton title={design.title} description={design.descriptionParagraphs[0] || design.image.alt} urlPath={`/designs/${design.slug}`} />
        </div>

        <AdSlot adSlot="detail-header" />

        {design.descriptionParagraphs.length > 0 && (
          <div className="prose prose-invert prose-gold max-w-none mb-10">
            {design.descriptionParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm text-muted mr-2">Browse more:</span>
          {design.categories.map((cat) => (
            <Link
              key={cat}
              href={`/mehndi-designs/${cat}`}
              className="px-3 py-1 text-sm rounded-full bg-surface text-foreground border border-border hover:border-gold/50 hover:text-gold transition-colors"
            >
              {titleCase(cat.replace(/-/g, " "))}
            </Link>
          ))}
        </div>

        <FAQAccordion items={design.faq} />

        <AdSlot adSlot="detail-footer" className="mt-10" />

        <RelatedDesigns designs={relatedDesigns} />
      </article>
    </div>
  );
}
