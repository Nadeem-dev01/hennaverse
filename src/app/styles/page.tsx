import SectionHeading from "@/components/SectionHeading";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";

export const metadata = {
  title: "Henna Styles Around the World | HennaVerse",
  description: "Explore traditional and modern mehndi styles from different countries.",
};

export default function StylesPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <SectionHeading 
        title="Mehndi Styles Around the World" 
        subtitle="Discover unique henna traditions from cultures across the globe"
      />
      
      <div className="max-w-3xl mb-12 text-muted leading-relaxed">
        <p className="mb-4">
          Henna art is a universal language of celebration, yet every culture has developed its own distinct dialect. From the bold geometric patterns of North Africa to the intricate floral tapestries of South Asia, explore the rich diversity of mehndi styles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {countries.map((country, index) => (
          <CountryCard key={country.id} country={country} index={index} />
        ))}
      </div>
    </div>
  );
}
