export interface CategoryDef {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  region?: string;
  keywords: string[];
}

export interface OccasionDef {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
}

export interface BodyPartDef {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ComboDef {
  category: string;
  facet: string;
  facetType: "bodyPart" | "occasion";
  minDesigns: number;
  metaTitle: string;
  metaDescription: string;
}

// --- 26 Categories ---
export const categories: CategoryDef[] = [
  // Regional / Cultural styles
  {
    slug: "arabic",
    title: "Arabic Mehndi Designs",
    metaTitle: "200+ Arabic Mehndi Designs — Bold Florals & Free-Flowing Patterns",
    metaDescription: "Explore stunning Arabic mehndi designs known for bold floral patterns, free-flowing vines, and elegant spacing. Perfect for Eid, weddings, and everyday occasions.",
    region: "gulf",
    keywords: ["arabic mehndi designs", "arabic henna", "arabic mehndi simple", "unique arabic mehndi"],
  },
  {
    slug: "indian",
    title: "Indian Mehndi Designs",
    metaTitle: "200+ Indian Mehndi Designs — Intricate Traditional Patterns",
    metaDescription: "Discover beautiful Indian mehndi designs featuring dense coverage, paisleys, peacocks, and traditional motifs. Ideal for weddings, Karva Chauth, and festivals.",
    region: "india",
    keywords: ["indian mehndi designs", "indian henna", "indian mehndi simple", "indian mehndi front hand"],
  },
  {
    slug: "pakistani",
    title: "Pakistani Mehndi Designs",
    metaTitle: "200+ Pakistani Mehndi Designs — Elegant Bridal & Eid Patterns",
    metaDescription: "Browse gorgeous Pakistani mehndi designs blending Indian density with Arabic elegance. Popular for bridal functions, Eid celebrations, and festive occasions.",
    region: "pakistan",
    keywords: ["pakistani mehndi designs", "pakistani mehndi front hand", "pakistani mehndi for eid"],
  },
  {
    slug: "moroccan",
    title: "Moroccan Henna Designs",
    metaTitle: "150+ Moroccan Henna Designs — Geometric Berber Patterns",
    metaDescription: "Explore authentic Moroccan henna designs featuring bold geometric patterns, tribal motifs, and diamond shapes rooted in Berber and North African traditions.",
    region: "morocco",
    keywords: ["moroccan henna designs", "moroccan henna simple", "moroccan henna meanings"],
  },
  {
    slug: "gulf",
    title: "Gulf Style Mehndi Designs",
    metaTitle: "150+ Gulf Style Mehndi Designs — Khaleeji Henna Patterns",
    metaDescription: "Discover elegant Gulf style mehndi designs (Khaleeji henna) known for bold flowers, thick outlines, and dramatic spacing popular in UAE, Saudi Arabia, and Qatar.",
    region: "gulf",
    keywords: ["gulf style mehndi designs", "khaleeji henna", "gulf mehndi simple", "gulf arabic mehndi"],
  },
  {
    slug: "african",
    title: "African Henna Designs",
    metaTitle: "100+ African Henna Designs — West African, Sudanese & Somali Patterns",
    metaDescription: "Explore diverse African henna designs including West African, Sudanese, and Somali styles featuring bold geometric shapes, tribal motifs, and cultural symbolism.",
    region: "africa",
    keywords: ["african henna designs", "west african henna", "sudanese henna", "somali henna"],
  },
  {
    slug: "turkish",
    title: "Turkish Henna Designs",
    metaTitle: "100+ Turkish Henna Designs — Ottoman-Inspired Mehndi Patterns",
    metaDescription: "Browse beautiful Turkish henna designs blending Ottoman-inspired motifs with modern aesthetics. Popular for Turkish henna night ceremonies and celebrations.",
    region: "turkey",
    keywords: ["turkish henna designs", "turkish mehndi", "turkish henna ceremony", "turkish mehndi for bride"],
  },
  {
    slug: "rajasthani",
    title: "Rajasthani Mehndi Designs",
    metaTitle: "150+ Rajasthani Mehndi Designs — Royal Marwari Henna Patterns",
    metaDescription: "Discover exquisite Rajasthani mehndi designs known for mirror-image symmetry, peacock motifs, and the densest coverage in Indian henna art traditions.",
    region: "india",
    keywords: ["rajasthani mehndi designs", "marwari mehndi", "rajasthani bridal mehndi"],
  },
  {
    slug: "indonesian",
    title: "Indonesian Henna Designs",
    metaTitle: "50+ Indonesian Henna Designs — Batik-Inspired Mehndi Patterns",
    metaDescription: "Explore unique Indonesian henna designs featuring batik-inspired motifs, bold lines, and nature elements popular in Javanese and Malay wedding traditions.",
    region: "indonesia",
    keywords: ["indonesian henna designs", "indonesian mehndi", "batik henna"],
  },

  // Style-based categories
  {
    slug: "bridal",
    title: "Bridal Mehndi Designs",
    metaTitle: "300+ Bridal Mehndi Designs — Wedding Henna for Brides (2026)",
    metaDescription: "Explore the most stunning bridal mehndi designs for your wedding day. From full-hand coverage to minimalist bridal henna, find the perfect design for every bride.",
    keywords: ["bridal mehndi designs", "wedding mehndi", "bridal henna", "dulhan mehndi", "unique bridal mehndi"],
  },
  {
    slug: "simple",
    title: "Simple Mehndi Designs",
    metaTitle: "300+ Simple Mehndi Designs — Easy Henna Patterns for Beginners",
    metaDescription: "Browse beautiful simple mehndi designs perfect for beginners. Easy-to-apply henna patterns for everyday occasions, casual events, and quick festive looks.",
    keywords: ["simple mehndi designs", "easy mehndi", "simple henna", "mehndi designs easy"],
  },
  {
    slug: "modern",
    title: "Modern Mehndi Designs",
    metaTitle: "150+ Modern Mehndi Designs — Contemporary Fusion Henna Patterns",
    metaDescription: "Discover modern mehndi designs blending traditional henna art with contemporary aesthetics. Features fusion styles, minimalism, and innovative pattern techniques.",
    keywords: ["modern mehndi designs", "contemporary henna", "fusion mehndi", "new style mehndi"],
  },
  {
    slug: "traditional",
    title: "Traditional Mehndi Designs",
    metaTitle: "200+ Traditional Mehndi Designs — Classic Henna Patterns",
    metaDescription: "Explore authentic traditional mehndi designs preserving classic henna motifs from across cultures. Timeless patterns featuring paisleys, florals, and mandala art.",
    keywords: ["traditional mehndi designs", "classic henna", "traditional henna patterns"],
  },
  {
    slug: "minimal",
    title: "Minimal Mehndi Designs",
    metaTitle: "200+ Minimal Mehndi Designs — Elegant Understated Henna Patterns",
    metaDescription: "Browse elegant minimal mehndi designs for a subtle, sophisticated look. Delicate lines, small motifs, and negative space create stunning understated henna art.",
    keywords: ["minimal mehndi designs", "minimalist henna", "subtle mehndi", "dainty henna"],
  },
  {
    slug: "floral",
    title: "Floral Mehndi Designs",
    metaTitle: "200+ Floral Mehndi Designs — Flower Henna Patterns & Rose Motifs",
    metaDescription: "Discover gorgeous floral mehndi designs featuring roses, lotuses, sunflowers, and vine patterns. The most popular motif style in modern henna art worldwide.",
    keywords: ["floral mehndi designs", "flower henna", "rose mehndi", "lotus mehndi"],
  },
  {
    slug: "mandala",
    title: "Mandala Mehndi Designs",
    metaTitle: "150+ Mandala Mehndi Designs — Circular Henna Patterns & Motifs",
    metaDescription: "Explore stunning mandala mehndi designs featuring intricate circular patterns, geometric symmetry, and meditative motifs. Perfect for back hand and palm henna.",
    keywords: ["mandala mehndi designs", "mandala henna", "circular mehndi", "round mehndi"],
  },
  {
    slug: "geometric",
    title: "Geometric Mehndi Designs",
    metaTitle: "100+ Geometric Mehndi Designs — Angular & Symmetric Henna Patterns",
    metaDescription: "Browse striking geometric mehndi designs featuring clean lines, triangles, hexagons, and mathematical precision for a bold, contemporary henna look.",
    keywords: ["geometric mehndi designs", "geometric henna", "angular mehndi"],
  },
  {
    slug: "jewelry",
    title: "Jewelry Style Mehndi Designs",
    metaTitle: "100+ Jewelry Style Mehndi Designs — Hathphool & Ornamental Henna",
    metaDescription: "Discover jewelry-inspired mehndi designs mimicking rings, bracelets, and hathphool ornaments. Elegant chain patterns and ornamental henna art for a royal look.",
    keywords: ["jewelry mehndi designs", "jewellery henna", "hathphool mehndi", "ornamental mehndi"],
  },
  {
    slug: "royal",
    title: "Royal Mehndi Designs",
    metaTitle: "100+ Royal Mehndi Designs — Mughal & Regal Henna Patterns",
    metaDescription: "Explore majestic royal mehndi designs inspired by Mughal art, palace motifs, elephants, and peacocks. Grand henna patterns fit for queens and brides.",
    keywords: ["royal mehndi designs", "mughal mehndi", "regal henna", "palace mehndi"],
  },

  // Body-part categories (also searchable as standalone)
  {
    slug: "full-hand",
    title: "Full Hand Mehndi Designs",
    metaTitle: "200+ Full Hand Mehndi Designs — Complete Front & Back Henna Patterns",
    metaDescription: "Browse breathtaking full hand mehndi designs with complete coverage from fingertips to wrist. Stunning bridal and festive henna patterns for maximum impact.",
    keywords: ["full hand mehndi designs", "full hand henna", "complete hand mehndi"],
  },
  {
    slug: "back-hand",
    title: "Back Hand Mehndi Designs",
    metaTitle: "200+ Back Hand Mehndi Designs — Stylish Dorsal Henna Patterns",
    metaDescription: "Discover stunning back hand mehndi designs from simple trails to elaborate coverage. The most visible and photographed placement for henna art.",
    keywords: ["back hand mehndi designs", "backhand henna", "stylish back hand mehndi"],
  },
  {
    slug: "front-hand",
    title: "Front Hand Mehndi Designs",
    metaTitle: "200+ Front Hand Mehndi Designs — Palm & Inner Hand Henna Patterns",
    metaDescription: "Explore beautiful front hand mehndi designs for palms and inner hands. Traditional placement known for the darkest henna stain and intricate detailed work.",
    keywords: ["front hand mehndi designs", "palm mehndi", "front hand henna"],
  },
  {
    slug: "finger",
    title: "Finger Mehndi Designs",
    metaTitle: "200+ Finger Mehndi Designs — Stylish Ring & Trail Henna Patterns",
    metaDescription: "Browse elegant finger mehndi designs from simple ring patterns to detailed trail work. Perfect for minimalist henna lovers and everyday occasions.",
    keywords: ["finger mehndi designs", "finger henna", "ring mehndi", "finger trail mehndi"],
  },
  {
    slug: "foot",
    title: "Foot Mehndi Designs",
    metaTitle: "150+ Foot Mehndi Designs — Bridal & Festive Feet Henna Patterns",
    metaDescription: "Discover beautiful foot mehndi designs from anklet-style henna to full foot coverage. Essential for bridal mehndi and traditional celebrations.",
    keywords: ["foot mehndi designs", "feet henna", "leg mehndi", "payal mehndi", "bridal foot mehndi"],
  },

  // Occasion-based (also function as categories due to high search volume)
  {
    slug: "eid",
    title: "Eid Mehndi Designs",
    metaTitle: "200+ Eid Mehndi Designs (2026) — Latest Festive Henna Patterns",
    metaDescription: "Browse the latest Eid mehndi designs for 2026. From simple Eid henna to elaborate festive patterns, find the perfect mehndi for Eid ul-Fitr and Eid ul-Adha.",
    keywords: ["eid mehndi designs", "eid henna", "eid mehndi 2026", "eid special mehndi"],
  },
  {
    slug: "kids",
    title: "Kids Mehndi Designs",
    metaTitle: "100+ Kids Mehndi Designs — Easy & Safe Henna Patterns for Children",
    metaDescription: "Find adorable kids mehndi designs that are simple, quick to apply, and safe for children. Fun henna patterns for Eid, festivals, and celebrations.",
    keywords: ["kids mehndi designs", "children henna", "easy mehndi for kids", "mehndi for girls"],
  },
];

// --- Occasions ---
export const occasions: OccasionDef[] = [
  {
    slug: "wedding",
    title: "Wedding Mehndi Designs",
    metaTitle: "300+ Wedding Mehndi Designs — Henna for Brides, Grooms & Guests",
    metaDescription: "Explore wedding mehndi designs for brides, bridesmaids, and guests. From elaborate bridal henna to simple guest patterns for your special day.",
  },
  {
    slug: "eid",
    title: "Eid Mehndi Designs",
    metaTitle: "200+ Eid Mehndi Designs (2026) — Festive Henna for Eid ul-Fitr & Eid ul-Adha",
    metaDescription: "Discover the latest Eid mehndi designs for 2026. Simple, Arabic, and trendy henna patterns to celebrate Eid in style.",
  },
  {
    slug: "karva-chauth",
    title: "Karva Chauth Mehndi Designs",
    metaTitle: "100+ Karva Chauth Mehndi Designs — Traditional Festival Henna Patterns",
    metaDescription: "Find beautiful Karva Chauth mehndi designs featuring moon motifs, couple portraits, and traditional patterns for this special Indian festival.",
  },
  {
    slug: "diwali",
    title: "Diwali Mehndi Designs",
    metaTitle: "100+ Diwali Mehndi Designs — Festival of Lights Henna Patterns",
    metaDescription: "Browse stunning Diwali mehndi designs featuring diyas, rangoli motifs, and festive patterns perfect for the Festival of Lights celebrations.",
  },
  {
    slug: "teej",
    title: "Teej Mehndi Designs",
    metaTitle: "50+ Teej Mehndi Designs — Monsoon Festival Henna Patterns",
    metaDescription: "Explore traditional Teej mehndi designs with swing motifs and monsoon-inspired patterns for Hariyali Teej and Kajari Teej celebrations.",
  },
  {
    slug: "engagement",
    title: "Engagement Mehndi Designs",
    metaTitle: "100+ Engagement Mehndi Designs — Ring Ceremony Henna Patterns",
    metaDescription: "Discover elegant engagement mehndi designs for your ring ceremony. From subtle finger henna to statement hand patterns for the bride-to-be.",
  },
  {
    slug: "party",
    title: "Party Mehndi Designs",
    metaTitle: "100+ Party Mehndi Designs — Trendy Henna for Events & Celebrations",
    metaDescription: "Browse trendy party mehndi designs for casual events, birthday celebrations, and social gatherings. Quick-to-apply henna that makes a statement.",
  },
  {
    slug: "raksha-bandhan",
    title: "Raksha Bandhan Mehndi Designs",
    metaTitle: "50+ Raksha Bandhan Mehndi Designs — Festive Henna for Sisters",
    metaDescription: "Find beautiful Raksha Bandhan mehndi designs featuring rakhi motifs and festive patterns. Quick and easy henna designs for the bond of siblings.",
  },
];

// --- Body Parts ---
export const bodyParts: BodyPartDef[] = [
  {
    slug: "front-hand",
    title: "Front Hand Mehndi Designs",
    metaTitle: "200+ Front Hand Mehndi Designs — Palm Henna Patterns",
    metaDescription: "Explore front hand mehndi designs for palms. Traditional placement for the darkest stain with intricate detailed henna work.",
  },
  {
    slug: "back-hand",
    title: "Back Hand Mehndi Designs",
    metaTitle: "200+ Back Hand Mehndi Designs — Dorsal Hand Henna Patterns",
    metaDescription: "Discover back hand mehndi designs from simple trails to elaborate coverage. The most visible placement for showcasing henna art.",
  },
  {
    slug: "full-hand",
    title: "Full Hand Mehndi Designs",
    metaTitle: "200+ Full Hand Mehndi Designs — Complete Hand Coverage Henna",
    metaDescription: "Browse full hand mehndi designs with complete front and back coverage from fingertips to wrist for maximum impact.",
  },
  {
    slug: "finger",
    title: "Finger Mehndi Designs",
    metaTitle: "200+ Finger Mehndi Designs — Ring & Trail Henna Patterns",
    metaDescription: "Browse finger mehndi designs including ring patterns, trail work, and minimalist finger henna.",
  },
  {
    slug: "foot",
    title: "Foot & Leg Mehndi Designs",
    metaTitle: "150+ Foot & Leg Mehndi Designs — Feet Henna Patterns",
    metaDescription: "Discover foot and leg mehndi designs from anklet-style to full leg coverage henna patterns.",
  },
  {
    slug: "arm",
    title: "Arm & Wrist Mehndi Designs",
    metaTitle: "100+ Arm & Wrist Mehndi Designs — Extended Henna Patterns",
    metaDescription: "Explore arm and wrist mehndi designs extending beyond the hand. Popular for bridal henna and bold statement looks.",
  },
];

// --- Valid combo pages (category × facet) ---
// Only create these if they have real search volume AND enough designs
export const validCombos: ComboDef[] = [
  // Arabic combos
  { category: "arabic", facet: "back-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Arabic Back Hand Mehndi Designs", metaDescription: "Stunning Arabic mehndi designs for back hand featuring bold florals and flowing patterns." },
  { category: "arabic", facet: "front-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Arabic Front Hand Mehndi Designs", metaDescription: "Beautiful Arabic mehndi designs for front hand with signature free-flowing vine patterns." },
  { category: "arabic", facet: "simple", facetType: "occasion", minDesigns: 12, metaTitle: "Simple Arabic Mehndi Designs", metaDescription: "Easy and simple Arabic mehndi designs for beginners. Elegant patterns that are quick to apply." },
  { category: "arabic", facet: "finger", facetType: "bodyPart", minDesigns: 12, metaTitle: "Arabic Finger Mehndi Designs", metaDescription: "Delicate Arabic finger mehndi designs with trail patterns and leaf motifs." },

  // Pakistani combos
  { category: "pakistani", facet: "front-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Pakistani Front Hand Mehndi Designs", metaDescription: "Gorgeous Pakistani mehndi designs for front hand with intricate full-coverage patterns." },
  { category: "pakistani", facet: "back-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Pakistani Back Hand Mehndi Designs", metaDescription: "Beautiful Pakistani back hand mehndi designs blending Indian and Arabic elements." },
  { category: "pakistani", facet: "eid", facetType: "occasion", minDesigns: 12, metaTitle: "Pakistani Eid Mehndi Designs", metaDescription: "Latest Pakistani mehndi designs for Eid celebrations. Festive henna patterns for Eid ul-Fitr and Eid ul-Adha." },

  // Indian combos
  { category: "indian", facet: "front-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Indian Front Hand Mehndi Designs", metaDescription: "Classic Indian mehndi designs for front hand featuring paisleys, peacocks, and dense coverage." },
  { category: "indian", facet: "back-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Indian Back Hand Mehndi Designs", metaDescription: "Intricate Indian back hand mehndi designs with traditional motifs and full coverage." },
  { category: "indian", facet: "simple", facetType: "occasion", minDesigns: 12, metaTitle: "Simple Indian Mehndi Designs", metaDescription: "Easy and simple Indian mehndi designs perfect for beginners and everyday occasions." },

  // Bridal combos
  { category: "bridal", facet: "full-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Bridal Full Hand Mehndi Designs", metaDescription: "Elaborate bridal full hand mehndi designs with complete coverage for the perfect wedding look." },
  { category: "bridal", facet: "foot", facetType: "bodyPart", minDesigns: 12, metaTitle: "Bridal Foot Mehndi Designs", metaDescription: "Beautiful bridal foot mehndi designs from anklet patterns to full leg bridal henna." },
  { category: "bridal", facet: "back-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Bridal Back Hand Mehndi Designs", metaDescription: "Stunning bridal back hand mehndi designs to showcase on your wedding day photos." },

  // Eid combos
  { category: "eid", facet: "simple", facetType: "occasion", minDesigns: 12, metaTitle: "Simple Eid Mehndi Designs", metaDescription: "Easy and simple Eid mehndi designs that are quick to apply for last-minute festive henna." },
  { category: "eid", facet: "front-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Eid Front Hand Mehndi Designs", metaDescription: "Beautiful front hand mehndi designs for Eid celebrations. Latest festive henna patterns." },
  { category: "eid", facet: "back-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Eid Back Hand Mehndi Designs", metaDescription: "Stylish Eid back hand mehndi designs for a festive yet elegant look." },

  // Mandala combos
  { category: "mandala", facet: "back-hand", facetType: "bodyPart", minDesigns: 12, metaTitle: "Mandala Back Hand Mehndi Designs", metaDescription: "Stunning mandala mehndi designs perfectly centered on the back of the hand." },

  // Minimal combos
  { category: "minimal", facet: "finger", facetType: "bodyPart", minDesigns: 12, metaTitle: "Minimal Finger Mehndi Designs", metaDescription: "Delicate minimal finger mehndi designs for a subtle, elegant henna look." },

  // Moroccan combos
  { category: "moroccan", facet: "simple", facetType: "occasion", minDesigns: 12, metaTitle: "Simple Moroccan Henna Designs", metaDescription: "Easy Moroccan henna designs with geometric patterns and tribal motifs for beginners." },
];

// --- Legacy slug mapping (old route → new redirect target) ---
export const legacySlugMap: Record<string, string> = {
  // Legacy hardcoded page routes → new category/occasion routes
  "arabic-mehndi": "/mehndi-designs/arabic",
  "pakistani-mehndi": "/mehndi-designs/pakistani",
  "bridalhennaz": "/mehndi-designs/bridal",
  "eidhennaz": "/mehndi-designs/eid",
  "mandala-mehndi": "/mehndi-designs/mandala",
  "kids-mehndi": "/mehndi-designs/kids",
  "rajasthani-mehndi": "/mehndi-designs/rajasthani",
  "simple-designs": "/mehndi-designs/simple",

  // Old designCategories slugs → new short slugs
  "bridal-mehndi-designs": "/mehndi-designs/bridal",
  "arabic-mehndi-designs": "/mehndi-designs/arabic",
  "indian-mehndi-designs": "/mehndi-designs/indian",
  "pakistani-mehndi-designs": "/mehndi-designs/pakistani",
  "simple-mehndi-designs": "/mehndi-designs/simple",
  "back-hand-mehndi-designs": "/mehndi-designs/back-hand",
  "front-hand-mehndi-designs": "/mehndi-designs/front-hand",
  "finger-mehndi-designs": "/mehndi-designs/finger",
  "mandala-mehndi-designs": "/mehndi-designs/mandala",
  "minimalist-mehndi-designs": "/mehndi-designs/minimal",
  "kids-mehndi-designs": "/mehndi-designs/kids",
  "moroccan-mehndi-designs": "/mehndi-designs/moroccan",
  "leg-mehndi-designs": "/mehndi-designs/foot",
  "floral-mehndi-designs": "/mehndi-designs/floral",
  "geometric-mehndi-designs": "/mehndi-designs/geometric",
};
