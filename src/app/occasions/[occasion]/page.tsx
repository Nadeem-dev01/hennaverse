import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { occasions } from "@/data/taxonomy";
import { designsByOccasion } from "@/data/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import { buildCollectionPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return occasions.map((o) => ({ occasion: o.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ occasion: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const occasion = occasions.find((o) => o.slug === params.occasion);
  if (!occasion) return { title: "Not Found" };

  return {
    title: occasion.metaTitle,
    description: occasion.metaDescription,
    alternates: { canonical: `/occasions/${occasion.slug}` },
  };
}

export default async function OccasionPage(
  props: { params: Promise<{ occasion: string }> }
) {
  const params = await props.params;
  const occasion = occasions.find((o) => o.slug === params.occasion);
  if (!occasion) notFound();

  const designs = designsByOccasion.get(occasion.slug) ?? [];
  const schema = buildCollectionPageSchema(occasion.title, occasion.metaDescription, `/occasions/${occasion.slug}`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Occasions", href: "/mehndi-designs" },
            { label: occasion.title, href: `/occasions/${occasion.slug}` },
          ]}
        />
        <SectionHeading title={occasion.title} subtitle={occasion.metaDescription} />

        {designs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {designs.map((d) => (
              <Link
                key={d.slug}
                href={`/designs/${d.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-colors"
              >
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  width={d.image.width}
                  height={d.image.height}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium truncate">
                    {d.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted mt-10 text-center">Designs coming soon. Check back for updates!</p>
        )}
      </div>
    </>
  );
}
