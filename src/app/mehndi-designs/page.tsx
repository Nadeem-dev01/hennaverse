import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { designCategories } from "@/data/designCategories";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "190+ Beautiful Mehndi Designs & Patterns (2025)",
  description: "Browse our massive collection of henna art organized by style. From bridal to minimal, find the perfect mehndi design for any occasion.",
  keywords: [
    "mehndi designs",
    "henna patterns",
    "mehndi design collection",
    "bridal mehndi designs",
    "arabic mehndi patterns",
    "indian henna designs",
    "easy mehndi designs",
    "simple henna patterns",
    "mehndi design categories",
    "henna art styles",
    "mehndi for weddings",
    "mehndi for eid",
    "mehndi for festivals",
    "latest mehndi designs 2025",
    "new henna patterns",
    "beautiful mehndi gallery",
    "mehndi design inspiration",
    "henna design ideas",
    "mehndi by style",
    "mehndi by occasion",
    "back hand mehndi designs",
    "full hand henna",
    "finger mehndi collection",
    "minimalist mehndi designs",
    "traditional mehndi hub",
    "modern henna patterns",
    "mandala mehndi collection",
    "geometric henna designs",
    "floral mehndi patterns",
    "Pakistani mehndi collection",
    "Moroccan henna gallery",
    "Turkish henna designs",
    "African henna collection",
    "rajasthani mehndi gallery",
    "mehndi design download",
    "free henna designs",
    "mehndi images hd",
    "mehndi photo gallery",
    "henna design categories",
    "mehndi pattern library"
  ],
  alternates: {
    canonical: "/mehndi-designs",
  },
};

export default function MehndiDesignsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mehndi Designs Hub",
    description: metadata.description,
    url: "https://www.mehndidesignhenna.com/mehndi-designs",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
