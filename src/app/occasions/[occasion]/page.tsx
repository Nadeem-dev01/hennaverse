import { Metadata } from "next";
import { notFound } from "next/navigation";
import { occasions } from "@/data/taxonomy";
import { designsByOccasion } from "@/data/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import DesignGrid from "@/components/DesignGrid";
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

        <DesignGrid designs={designs} />
      </div>
    </>
  );
}
