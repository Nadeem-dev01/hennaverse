import { Metadata } from "next";
import { notFound } from "next/navigation";
import { bodyParts } from "@/data/taxonomy";
import { designsByBodyPart } from "@/data/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import DesignGrid from "@/components/DesignGrid";
import { buildCollectionPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return bodyParts.map((b) => ({ part: b.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ part: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const bp = bodyParts.find((b) => b.slug === params.part);
  if (!bp) return { title: "Not Found" };

  const designs = designsByBodyPart.get(bp.slug) ?? [];
  const firstImage = designs[0]?.image?.src;
  const ogImages = firstImage ? [{ url: firstImage, width: 800, height: 800, alt: bp.title }] : [];

  return {
    title: bp.metaTitle,
    description: bp.metaDescription,
    alternates: { canonical: `/body/${bp.slug}` },
    openGraph: {
      title: bp.metaTitle,
      description: bp.metaDescription,
      url: `https://www.mehndidesignhenna.com/body/${bp.slug}`,
      siteName: "Mehndi Design Henna",
      locale: "en_US",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: bp.metaTitle,
      description: bp.metaDescription,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function BodyPartPage(
  props: { params: Promise<{ part: string }> }
) {
  const params = await props.params;
  const bp = bodyParts.find((b) => b.slug === params.part);
  if (!bp) notFound();

  const designs = designsByBodyPart.get(bp.slug) ?? [];
  const schema = buildCollectionPageSchema(bp.title, bp.metaDescription, `/body/${bp.slug}`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Body Placement", href: "/mehndi-designs" },
            { label: bp.title, href: `/body/${bp.slug}` },
          ]}
        />
        <SectionHeading title={bp.title} subtitle={bp.metaDescription} />

        <DesignGrid designs={designs} />
      </div>
    </>
  );
}
