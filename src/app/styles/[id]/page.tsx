import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return countries.map((country) => ({
    id: country.id,
  }));
}

export default async function CountryStylePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const country = countries.find((c) => c.id === params.id);
  
  if (!country) {
    notFound();
  }

  const countryDesigns = designs.filter((d) => {
    const dc = d.country.toLowerCase();
    const cn = country.name.toLowerCase();
    return cn.includes(dc) || dc.includes(cn);
  });

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <div className="text-6xl mb-4">{country.flag}</div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-6">
          {country.name} Mehndi Styles
        </h1>
        <p className="text-xl text-foreground mb-8 max-w-3xl leading-relaxed">
          {country.description}
        </p>
        
        <div className="bg-surface border border-border p-8 rounded-2xl max-w-4xl">
          <h2 className="text-2xl font-serif text-gold mb-4">Cultural Traditions</h2>
          <p className="text-muted leading-relaxed mb-6">{country.traditions}</p>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">Popular Styles:</h3>
          <div className="flex flex-wrap gap-2">
            {country.styles.map((style) => (
              <span key={style} className="px-3 py-1 bg-purple/10 text-purple border border-purple/20 rounded-full text-sm">
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SectionHeading 
        title={`${country.name} Designs`} 
        subtitle={`Browse our collection of ${countryDesigns.length} authentic designs`}
      />
      
      {countryDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryDesigns.map((design, index) => (
            <DesignCard key={design.id} design={design} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-muted">More designs from this region coming soon.</p>
      )}
    </div>
  );
}
