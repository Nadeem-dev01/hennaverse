import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { designCategories } from "@/data/designCategories";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Easy Mehndi Designs — Simple, Arabic, Back Hand and Eid Patterns (2026)",
  description: "Browse easy mehndi designs and mehndi patterns for hands: simple mehndi designs for hands, easy arabic mehndi designs, back hand mehndi designs, kids mehndi designs, and eid henna patterns.",
  keywords: [
    "designs mehndi designs",
    "easy mehndi designs",
    "easy designs mehndi",
    "mehndi designs simple",
    "mehndi patterns for hands",
    "simple mehndi designs for hands",
    "easy mehndi patterns for hands",
    "mehndi design easy and beautiful",
    "simple and easy designs of mehndi",
    "beautiful easy mehndi design",
    "simple easy mehndi design",
    "very very simple mehndi design",
    "stylish simple mehndi design",
    "easy arabic mehndi design",
    "simple arabic mehndi design",
    "arabic mehndi patterns",
    "mehndi design of arabic",
    "back hand mehndi design",
    "stylish back hand mehndi designs",
    "mehndi designs for back of hand",
    "back hand side mehndi designs",
    "front hand mehndi design",
    "finger mehndi patterns",
    "mehndi patterns for fingers",
    "childrens mehndi designs",
    "mehndi designs for childrens",
    "kids mehndi designs",
    "simple mehndi designs for kids",
    "feet mehndi design",
    "foot henna patterns",
    "mandala mehndi design",
    "circle mehndi design",
    "mehndi designs in circle",
    "round design mehndi",
    "floral mehndi design",
    "flower designs for henna",
    "minimalist mehndi designs",
    "contemporary mehndi design",
    "indian mehndi designs",
    "pakistani mehndi design",
    "peacock mehndi design",
    "lotus mehndi design",
    "mehndi designs for eid",
    "eid henna patterns",
    "mehndi wedding designs",
    "mehndi designs for beginners"
  ],
  alternates: {
    canonical: "/mehndi-designs",
  },
  openGraph: {
    title: "Easy Mehndi Designs — Simple, Arabic, Back Hand and Eid Patterns (2026)",
    description: "Browse easy mehndi designs and mehndi patterns for hands: simple mehndi designs, easy arabic mehndi, back hand mehndi designs, kids mehndi, and eid henna patterns.",
    url: "https://www.mehndidesignhenna.com/mehndi-designs",
    siteName: "Mehndi Design Henna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Mehndi Designs — Simple, Arabic & Eid Patterns",
    description: "Browse easy mehndi designs and mehndi patterns for hands across 15 distinct styles.",
  },
};

export default function MehndiDesignsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mehndi Designs Hub",
    description: metadata.description,
    url: "https://www.mehndidesignhenna.com/mehndi-designs",
    publisher: { "@type": "Organization", name: "Mehndi Design Henna", url: "https://www.mehndidesignhenna.com" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mehndidesignhenna.com" },
      { "@type": "ListItem", position: 2, name: "Mehndi Designs", item: "https://www.mehndidesignhenna.com/mehndi-designs" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Breadcrumbs items={[{ label: "Mehndi Designs", href: "/mehndi-designs" }]} />
        
        <SectionHeading 
          title="Explore Mehndi Designs" 
          subtitle="Find inspiration across 15 distinct styles, from traditional bridal to modern minimal patterns."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {designCategories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/mehndi-designs/${cat.slug}`}
              className="group flex flex-col glass rounded-2xl overflow-hidden border border-border hover:border-gold/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                {cat.heroImage ? (
                  <Image
                    src={cat.heroImage}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={60}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface/50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-sm text-white/80">{cat.images.length} Designs</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted line-clamp-2">
                  {cat.metaDescription}
                </p>
                <div className="mt-4 text-gold text-sm font-medium flex items-center">
                  Explore Gallery <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
