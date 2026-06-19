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
    metaTitle: "Easy Arabic Mehndi Design — Simple Arabic Mehndi Patterns",
    metaDescription: "Browse easy arabic mehndi designs and simple arabic mehndi patterns with bold florals and free-flowing vines. Perfect arabic mehndi patterns for Eid and weddings.",
    region: "gulf",
    keywords: ["easy arabic mehndi design", "simple arabic mehndi design", "arabic mehndi patterns", "mehndi design of arabic", "arabic mehndi easy designs"],
  },
  {
    slug: "indian",
    title: "Indian Mehndi Designs",
    metaTitle: "Indian Mehndi Designs — Peacock Mehndi Design & Traditional Patterns",
    metaDescription: "Discover indian mehndi designs featuring peacock mehndi design motifs, paisleys, and dense traditional coverage. Ideal mehndi designs in indian style for weddings and festivals.",
    region: "india",
    keywords: ["indian mehndi designs", "mehndi designs in indian", "peacock mehndi design", "lotus mehndi design"],
  },
  {
    slug: "pakistani",
    title: "Pakistani Mehndi Designs",
    metaTitle: "Pakistani Mehndi Design — Elegant Bridal & Eid Patterns",
    metaDescription: "Browse pakistani mehndi design ideas blending Indian density with Arabic elegance. Popular for bridal functions, eid mehndi designs, and festive occasions.",
    region: "pakistan",
    keywords: ["pakistani mehndi design", "pakistani mehndi designs", "pakistani mehndi for eid"],
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
    metaTitle: "Simple Bridal Mehndi Designs — Mehndi Wedding Designs (2026)",
    metaDescription: "Explore simple bridal mehndi designs and mehndi wedding designs for your big day. Find the perfect mehndi design for marriage, plus bridal henna booking and mehndi dress tips.",
    keywords: ["simple bridal mehndi designs", "mehndi wedding designs", "mehndi design for marriage", "bridal henna near me", "mehndi dress for bride", "mehndi outfit", "clothes for mehndi", "mehndi decor"],
  },
  {
    slug: "simple",
    title: "Simple Mehndi Designs",
    metaTitle: "Easy Mehndi Designs — Simple Mehndi Designs for Hands",
    metaDescription: "Browse easy mehndi designs and simple mehndi designs for hands. Mehndi designs for beginners — easy and beautiful patterns for everyday and festive looks.",
    keywords: ["easy mehndi designs", "mehndi designs simple", "simple mehndi designs for hands", "mehndi design easy and beautiful", "simple easy mehndi design", "very very simple mehndi design", "mehndi designs for beginners"],
  },
  {
    slug: "modern",
    title: "Modern Mehndi Designs",
    metaTitle: "Modern Design of Mehndi — Contemporary Mehndi Design Ideas",
    metaDescription: "Discover the modern design of mehndi: contemporary mehndi designs blending traditional henna art with fusion styles, minimalism, and innovative patterns.",
    keywords: ["modern design of mehndi", "modern mehndi design", "contemporary mehndi design", "new style mehndi"],
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
    metaTitle: "Minimalist Mehndi Designs — Minimal Mehndi Design Ideas",
    metaDescription: "Browse minimalist mehndi designs and minimal mehndi design ideas for a subtle, sophisticated look. Delicate lines, small motifs, and elegant negative space.",
    keywords: ["minimalist mehndi designs", "minimal mehndi design", "minimal mehndi designs", "contemporary mehndi design"],
  },
  {
    slug: "floral",
    title: "Floral Mehndi Designs",
    metaTitle: "Floral Mehndi Design — Flower Designs for Henna",
    metaDescription: "Discover floral mehndi design ideas and flower designs for henna: henna flower designs, lotus mehndi designs, roses, and vine patterns loved worldwide.",
    keywords: ["floral mehndi design", "flower designs for henna", "henna flower designs", "lotus mehndi design", "floral design henna"],
  },
  {
    slug: "mandala",
    title: "Mandala Mehndi Designs",
    metaTitle: "Mandala Mehndi Design — Circle Mehndi Design & Round Patterns",
    metaDescription: "Explore mandala mehndi design ideas: circle mehndi designs, mehndi designs in circle layouts, and round design mehndi patterns for back hand and palm.",
    keywords: ["mandala mehndi design", "circle mehndi design", "mehndi designs in circle", "round design mehndi", "mehndi designs with circles"],
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
    metaTitle: "Back Hand Mehndi Design — Stylish Back Hand Mehndi Designs",
    metaDescription: "Discover back hand mehndi design ideas: stylish back hand mehndi designs, mehndi designs for back of hand, and back hand side mehndi designs.",
    keywords: ["back hand mehndi design", "stylish back hand mehndi designs", "mehndi designs for back of hand", "back hand side mehndi designs", "backside hand mehndi design"],
  },
  {
    slug: "front-hand",
    title: "Front Hand Mehndi Designs",
    metaTitle: "Front Hand Mehndi Design — Simple Front Hand Patterns",
    metaDescription: "Explore front hand mehndi design ideas: beginner cute simple mehndi designs for front hands and palm mehndi designs known for the darkest stain.",
    keywords: ["front hand mehndi design", "beginner cute simple mehndi designs for front hands", "simple mehndi design flower front hand", "palm mehndi design"],
  },
  {
    slug: "finger",
    title: "Finger Mehndi Designs",
    metaTitle: "Finger Mehndi Patterns — Mehndi Patterns for Fingers",
    metaDescription: "Browse finger mehndi patterns and mehndi patterns for fingers: easy simple finger mehndi designs, ring styles, and minimalist trail work.",
    keywords: ["finger mehndi patterns", "mehndi patterns for fingers", "easy simple finger mehndi design", "finger mehndi designs"],
  },
  {
    slug: "foot",
    title: "Foot Mehndi Designs",
    metaTitle: "Feet Mehndi Design — Foot Henna Patterns",
    metaDescription: "Discover feet mehndi design ideas and foot henna patterns: anklet-style feet mehndi patterns, bridal foot henna, and full foot coverage designs.",
    keywords: ["feet mehndi design", "foot henna patterns", "feet mehndi patterns", "foot mehndi designs", "bridal foot mehndi"],
  },

  // Occasion-based (also function as categories due to high search volume)
  {
    slug: "eid",
    title: "Eid Mehndi Designs",
    metaTitle: "Mehndi Designs for Eid — Eid Henna Patterns (2026)",
    metaDescription: "Browse mehndi designs for eid and eid henna patterns for 2026. Simple eid mehndi designs and mehndi patterns for eid ul-Fitr and Eid ul-Adha.",
    keywords: ["mehndi designs for eid", "eid henna patterns", "eid mehndi design", "mehndi patterns for eid", "mehndi eid designs"],
  },
  {
    slug: "kids",
    title: "Kids Mehndi Designs",
    metaTitle: "Childrens Mehndi Designs — Kids Mehndi Designs Made Easy",
    metaDescription: "Find adorable childrens mehndi designs and kids mehndi designs that are quick and safe. Simple mehndi designs for kids — perfect for Eid and festivals.",
    keywords: ["childrens mehndi designs", "mehndi designs for childrens", "kids mehndi designs", "simple mehndi designs for kids"],
  },
];

// --- Occasions ---
export const occasions: OccasionDef[] = [
  {
    slug: "wedding",
    title: "Wedding Mehndi Designs",
    metaTitle: "Mehndi Wedding Designs — Mehndi Design for Marriage, Outfits & Decor",
    metaDescription: "Explore mehndi wedding designs and mehndi design for marriage ideas: simple bridal mehndi designs, guest patterns, plus mehndi outfit, mehndi dress for bride, and mehndi decor tips.",
  },
  {
    slug: "eid",
    title: "Eid Mehndi Designs",
    metaTitle: "Mehndi Designs for Eid (2026) — Eid Henna Patterns",
    metaDescription: "Discover mehndi designs for eid and eid henna patterns for 2026. Simple eid mehndi designs, arabic styles, and trendy mehndi patterns for eid.",
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
    metaTitle: "Front Hand Mehndi Design — Palm Mehndi Patterns",
    metaDescription: "Explore front hand mehndi design ideas and palm mehndi designs, including beginner cute simple mehndi designs for front hands for the darkest stain.",
  },
  {
    slug: "back-hand",
    title: "Back Hand Mehndi Designs",
    metaTitle: "Back Hand Mehndi Design — Mehndi Designs for Back of Hand",
    metaDescription: "Discover back hand mehndi design ideas and mehndi designs for back of hand: stylish back hand mehndi designs from simple trails to full coverage.",
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
    metaTitle: "Finger Mehndi Patterns — Mehndi Patterns for Fingers",
    metaDescription: "Browse finger mehndi patterns and mehndi patterns for fingers, including easy simple finger mehndi designs and minimalist ring styles.",
  },
  {
    slug: "foot",
    title: "Foot & Leg Mehndi Designs",
    metaTitle: "Feet Mehndi Design — Foot Henna Patterns",
    metaDescription: "Discover feet mehndi design ideas and foot henna patterns, from anklet-style feet mehndi patterns to full leg coverage.",
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
