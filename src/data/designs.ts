export interface Design {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl: string;
  tags: string[];
  views?: number;
  likes?: number;
  photographer?: string | null;
  pixabay_id?: number | null;
  pexels_id?: number | null;
  source?: string;
}

export const designs: Design[] = [
  {
    "id": 1,
    "title": "Mandala Mehndi Design 1",
    "description": "A stunning hard Mandala design perfect for Engagement. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mandala",
    "occasion": "Engagement",
    "difficulty": "Hard",
    "imageUrl": "/b02e17fbd25d259f56c2d4275f15d406.avif",
    "tags": [
      "traditional",
      "modern"
    ],
    "views": 5147,
    "likes": 693,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5482292,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 2,
    "title": "Tikki Mehndi Design 2",
    "description": "A stunning easy Tikki design perfect for Eid. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Eid",
    "difficulty": "Easy",
    "imageUrl": "/chakra-bridal-front-hand-mehndi-820x1024.avif",
    "tags": [
      "light",
      "modern"
    ],
    "views": 2587,
    "likes": 152,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5661103,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 3,
    "title": "Arabic bold Mehndi Design 3",
    "description": "A stunning easy Arabic bold design perfect for Wedding. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Wedding",
    "difficulty": "Easy",
    "imageUrl": "/328978478_228082722895910_7671478419807944337_n.avif",
    "tags": [
      "bold",
      "light"
    ],
    "views": 6319,
    "likes": 1227,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5661107,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 4,
    "title": "tribal Mehndi Design 4",
    "description": "A stunning hard tribal design perfect for Engagement. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "tribal",
    "occasion": "Engagement",
    "difficulty": "Hard",
    "imageUrl": "/non_henna_by_divyaaa.avif",
    "tags": [
      "floral",
      "heavy"
    ],
    "views": 7982,
    "likes": 1495,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4416944,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 5,
    "title": "floral Turkish Mehndi Design 5",
    "description": "A stunning expert floral Turkish design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Party",
    "difficulty": "Expert",
    "imageUrl": "/Snapinsta.app_75272080_549807429192424_8548226213132767972_n_1080.jpg",
    "tags": [
      "traditional",
      "geometric"
    ],
    "views": 7987,
    "likes": 1223,
    "photographer": "Pixabay Creator",
    "pixabay_id": 1370136,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 6,
    "title": "Balinese Mehndi Design 6",
    "description": "A stunning medium Balinese design perfect for Diwali. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/wedding_salad.avif",
    "tags": [
      "modern",
      "traditional"
    ],
    "views": 7206,
    "likes": 1438,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5876752,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 7,
    "title": "Sudanese Mehndi Design 7",
    "description": "A stunning medium Sudanese design perfect for Casual. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Casual",
    "difficulty": "Medium",
    "imageUrl": "/Snapinsta.app_354788581_580258730890538_975214172231979515_n_1080.avif",
    "tags": [
      "light",
      "traditional"
    ],
    "views": 7184,
    "likes": 855,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5876757,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 8,
    "title": "Indo-Western Mehndi Design 8",
    "description": "A stunning medium Indo-Western design perfect for Diwali. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/345956115_190860273864053_8182753276442096218_n.jfif",
    "tags": [
      "geometric",
      "elegant"
    ],
    "views": 3050,
    "likes": 211,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5711381,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 9,
    "title": "South Indian Mehndi Design 9",
    "description": "A stunning hard South Indian design perfect for Party. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "South Indian",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/samiras.jpg",
    "tags": [
      "modern",
      "elegant"
    ],
    "views": 4874,
    "likes": 536,
    "photographer": "Pixabay Creator",
    "pixabay_id": 2849864,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 10,
    "title": "Tikki Mehndi Design 10",
    "description": "A stunning medium Tikki design perfect for Teej. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/360034206_972751270446070_4099761826674818325_n.jfif",
    "tags": [
      "geometric",
      "heavy"
    ],
    "views": 7261,
    "likes": 567,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5472963,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 11,
    "title": "Arabic bold Mehndi Design 11",
    "description": "A stunning expert Arabic bold design perfect for Engagement. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Engagement",
    "difficulty": "Expert",
    "imageUrl": "/Vows_and_tales.avif",
    "tags": [
      "light",
      "elegant"
    ],
    "views": 8213,
    "likes": 504,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5571333,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 12,
    "title": "Berber Mehndi Design 12",
    "description": "A stunning medium Berber design perfect for Teej. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/379288675_1023897062286434_1523391240408966938_n.jpg",
    "tags": [
      "light",
      "bold"
    ],
    "views": 7158,
    "likes": 626,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5467524,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 13,
    "title": "floral Turkish Mehndi Design 13",
    "description": "A stunning hard floral Turkish design perfect for Eid. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Eid",
    "difficulty": "Hard",
    "imageUrl": "/Snapinsta.app_119664771_171131687927465_5489743928879459640_n_1080.avif",
    "tags": [
      "elegant",
      "intricate"
    ],
    "views": 6044,
    "likes": 377,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4651552,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 14,
    "title": "Javanese Mehndi Design 14",
    "description": "A stunning easy Javanese design perfect for Engagement. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Engagement",
    "difficulty": "Easy",
    "imageUrl": "/anjali_henna_(8).avif",
    "tags": [
      "heavy",
      "floral"
    ],
    "views": 7420,
    "likes": 1296,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5857379,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 15,
    "title": "Sudanese Mehndi Design 15",
    "description": "A stunning expert Sudanese design perfect for Engagement. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Engagement",
    "difficulty": "Expert",
    "imageUrl": "/qwqwasasasassdddfff.avif",
    "tags": [
      "modern",
      "traditional"
    ],
    "views": 5235,
    "likes": 963,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5667629,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 16,
    "title": "Geometric modern Mehndi Design 16",
    "description": "A stunning expert Geometric modern design perfect for Casual. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Casual",
    "difficulty": "Expert",
    "imageUrl": "/parrot-motifs-for-front-hand-bridal-mehndi-1024x841.avif",
    "tags": [
      "traditional",
      "geometric"
    ],
    "views": 4959,
    "likes": 396,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4626471,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 17,
    "title": "Mughal Mehndi Design 17",
    "description": "A stunning hard Mughal design perfect for Festival. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Festival",
    "difficulty": "Hard",
    "imageUrl": "/front-hand-intricate-half-and-half-mehendi-1024x1024.avif",
    "tags": [
      "heavy",
      "intricate"
    ],
    "views": 4621,
    "likes": 380,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5519259,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 18,
    "title": "Geometric Mehndi Design 18",
    "description": "A stunning easy Geometric design perfect for Festival. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Festival",
    "difficulty": "Easy",
    "imageUrl": "/Snapinsta.app_293334462_803557777300433_1780926414613850463_n_1080.avif",
    "tags": [
      "floral",
      "geometric"
    ],
    "views": 2282,
    "likes": 201,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7807978,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 19,
    "title": "minimal Arabic Mehndi Design 19",
    "description": "A stunning expert minimal Arabic design perfect for Teej. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Teej",
    "difficulty": "Expert",
    "imageUrl": "/320851229_3241788612779301_5931930448531612572_n.jfif",
    "tags": [
      "floral",
      "intricate"
    ],
    "views": 5817,
    "likes": 698,
    "photographer": "Pexels Photographer",
    "pixabay_id": null,
    "pexels_id": 16550865,
    "source": "pexels"
  },
  {
    "id": 20,
    "title": "geometric Mehndi Design 20",
    "description": "A stunning easy geometric design perfect for Teej. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/Snapinsta.app_276984494_1121195125340368_881341424541864188_n_1080.avif",
    "tags": [
      "heavy",
      "floral"
    ],
    "views": 5543,
    "likes": 296,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8325033,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 21,
    "title": "floral Turkish Mehndi Design 21",
    "description": "A stunning medium floral Turkish design perfect for Eid. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Eid",
    "difficulty": "Medium",
    "imageUrl": "/sunflower-back-hand-mehendi-819x1024.avif",
    "tags": [
      "traditional",
      "intricate"
    ],
    "views": 6186,
    "likes": 1033,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7755275,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 22,
    "title": "Balinese Mehndi Design 22",
    "description": "A stunning medium Balinese design perfect for Diwali. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/16230071_241347312975869_1934039183731458048_n.avif",
    "tags": [
      "heavy",
      "intricate"
    ],
    "views": 7320,
    "likes": 1321,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8582615,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 23,
    "title": "African tribal Mehndi Design 23",
    "description": "A stunning medium African tribal design perfect for Engagement. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "African tribal",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/_hennabydevakysdharan.jpg",
    "tags": [
      "elegant",
      "heavy"
    ],
    "views": 3752,
    "likes": 474,
    "photographer": "Pixabay Creator",
    "pixabay_id": 1283963,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 24,
    "title": "Geometric modern Mehndi Design 24",
    "description": "A stunning easy Geometric modern design perfect for Party. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Party",
    "difficulty": "Easy",
    "imageUrl": "/51a553620a851d5b012a96b54f6634b9.avif",
    "tags": [
      "floral",
      "elegant"
    ],
    "views": 4802,
    "likes": 849,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 25,
    "title": "Bridal Mehndi Design 25",
    "description": "A stunning medium Bridal design perfect for Wedding. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Bridal",
    "occasion": "Wedding",
    "difficulty": "Medium",
    "imageUrl": "/365086079_245979131602145_6342154400046918624_n.avif",
    "tags": [
      "modern",
      "bold"
    ],
    "views": 8109,
    "likes": 673,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 26,
    "title": "Geometric Mehndi Design 26",
    "description": "A stunning easy Geometric design perfect for Wedding. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Wedding",
    "difficulty": "Easy",
    "imageUrl": "/337864951_196585219743768_5030452438526200238_n.avif",
    "tags": [
      "traditional",
      "light"
    ],
    "views": 5613,
    "likes": 511,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8378634,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 27,
    "title": "Arabic bold Mehndi Design 27",
    "description": "A stunning medium Arabic bold design perfect for Teej. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/divya_2.jpg",
    "tags": [
      "modern",
      "geometric"
    ],
    "views": 4661,
    "likes": 360,
    "photographer": "Pixabay Creator",
    "pixabay_id": 506,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 28,
    "title": "geometric Mehndi Design 28",
    "description": "A stunning easy geometric design perfect for Diwali. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Diwali",
    "difficulty": "Easy",
    "imageUrl": "/mehndi_by_sofia_haque.avif",
    "tags": [
      "traditional",
      "intricate"
    ],
    "views": 5889,
    "likes": 756,
    "photographer": "Pixabay Creator",
    "pixabay_id": 181786,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 29,
    "title": "Ottoman Mehndi Design 29",
    "description": "A stunning medium Ottoman design perfect for Engagement. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/028a55c2409155d7d41fbce8487f4983.jpg",
    "tags": [
      "bold",
      "heavy"
    ],
    "views": 1511,
    "likes": 86,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 30,
    "title": "Javanese Mehndi Design 30",
    "description": "A stunning hard Javanese design perfect for Festival. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Festival",
    "difficulty": "Hard",
    "imageUrl": "/eefj.avif",
    "tags": [
      "geometric",
      "bold"
    ],
    "views": 5140,
    "likes": 551,
    "photographer": "Pixabay Creator",
    "pixabay_id": 805,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 31,
    "title": "Sudanese Mehndi Design 31",
    "description": "A stunning easy Sudanese design perfect for Casual. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Casual",
    "difficulty": "Easy",
    "imageUrl": "/Minimalistic-Chakra-Design-819x1024.jpg",
    "tags": [
      "intricate",
      "traditional"
    ],
    "views": 6959,
    "likes": 572,
    "photographer": "Pixabay Creator",
    "pixabay_id": 3605022,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 32,
    "title": "Minimalist Mehndi Design 32",
    "description": "A stunning medium Minimalist design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Minimalist",
    "occasion": "Mehendi Night",
    "difficulty": "Medium",
    "imageUrl": "/W4WYWW4W5YRERH.avif",
    "tags": [
      "traditional",
      "elegant"
    ],
    "views": 1336,
    "likes": 212,
    "photographer": "Pixabay Creator",
    "pixabay_id": 576,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 33,
    "title": "South Indian Mehndi Design 33",
    "description": "A stunning hard South Indian design perfect for Party. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "South Indian",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/divyaa.avif",
    "tags": [
      "heavy",
      "light"
    ],
    "views": 6315,
    "likes": 880,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 34,
    "title": "Geometric Mehndi Design 34",
    "description": "A stunning easy Geometric design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Diwali",
    "difficulty": "Easy",
    "imageUrl": "/flowers-with-meshwork-front-hand-mehndi-1024x683.avif",
    "tags": [
      "elegant",
      "light"
    ],
    "views": 4494,
    "likes": 725,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7347494,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 35,
    "title": "Arabic bold Mehndi Design 35",
    "description": "A stunning hard Arabic bold design perfect for Wedding. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Wedding",
    "difficulty": "Hard",
    "imageUrl": "/9..avif",
    "tags": [
      "geometric",
      "elegant"
    ],
    "views": 6061,
    "likes": 1124,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8835808,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 36,
    "title": "geometric Mehndi Design 36",
    "description": "A stunning easy geometric design perfect for Engagement. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Engagement",
    "difficulty": "Easy",
    "imageUrl": "/Chakra-front-hand-mehndi-design-819x1024.avif",
    "tags": [
      "modern",
      "traditional"
    ],
    "views": 6533,
    "likes": 544,
    "photographer": "Pixabay Creator",
    "pixabay_id": 181795,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 37,
    "title": "floral Turkish Mehndi Design 37",
    "description": "A stunning easy floral Turkish design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Party",
    "difficulty": "Easy",
    "imageUrl": "/362994868_270225565650314_4450455011723621872_n.avif",
    "tags": [
      "heavy",
      "bold"
    ],
    "views": 3362,
    "likes": 179,
    "photographer": "Pixabay Creator",
    "pixabay_id": 3386477,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 38,
    "title": "Balinese Mehndi Design 38",
    "description": "A stunning expert Balinese design perfect for Wedding. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Wedding",
    "difficulty": "Expert",
    "imageUrl": "/elephant-grid-back-hand-mehendi-819x1024.avif",
    "tags": [
      "heavy",
      "light"
    ],
    "views": 7072,
    "likes": 546,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 39,
    "title": "Sudanese Mehndi Design 39",
    "description": "A stunning medium Sudanese design perfect for Teej. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/370034030_18199582642302002_9199000020486484550_n.avif",
    "tags": [
      "traditional",
      "intricate"
    ],
    "views": 2513,
    "likes": 136,
    "photographer": "Pixabay Creator",
    "pixabay_id": 125,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 40,
    "title": "Indo-Western Mehndi Design 40",
    "description": "A stunning expert Indo-Western design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/happy_flashbacks.jpg",
    "tags": [
      "bold",
      "elegant"
    ],
    "views": 3650,
    "likes": 312,
    "photographer": "Pixabay Creator",
    "pixabay_id": 360,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 41,
    "title": "Bridal Mehndi Design 41",
    "description": "A stunning expert Bridal design perfect for Festival. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Bridal",
    "occasion": "Festival",
    "difficulty": "Expert",
    "imageUrl": "/340680629_1168190557141921_7497450264020054635_n.jfif",
    "tags": [
      "light",
      "modern"
    ],
    "views": 8384,
    "likes": 1623,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 42,
    "title": "Floral Mehndi Design 42",
    "description": "A stunning medium Floral design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Floral",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/candid_wedding_stories.jpg",
    "tags": [
      "intricate",
      "traditional"
    ],
    "views": 6634,
    "likes": 925,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5505598,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 43,
    "title": "Gulf/Khaleeji Mehndi Design 43",
    "description": "A stunning medium Gulf/Khaleeji design perfect for Engagement. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Gulf/Khaleeji",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/non_anjali_henna.avif",
    "tags": [
      "traditional",
      "light"
    ],
    "views": 3503,
    "likes": 498,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8775948,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 44,
    "title": "tribal Mehndi Design 44",
    "description": "A stunning easy tribal design perfect for Eid. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "tribal",
    "occasion": "Eid",
    "difficulty": "Easy",
    "imageUrl": "/186880279_109560234551449_8706702133746067147_n.avif",
    "tags": [
      "geometric",
      "bold"
    ],
    "views": 5851,
    "likes": 1085,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 45,
    "title": "Ottoman Mehndi Design 45",
    "description": "A stunning hard Ottoman design perfect for Casual. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Casual",
    "difficulty": "Hard",
    "imageUrl": "/henna_by_shamsa_(6).avif",
    "tags": [
      "traditional",
      "light"
    ],
    "views": 2697,
    "likes": 471,
    "photographer": "Pixabay Creator",
    "pixabay_id": 2542252,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 46,
    "title": "Javanese Mehndi Design 46",
    "description": "A stunning hard Javanese design perfect for Casual. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Casual",
    "difficulty": "Hard",
    "imageUrl": "/mini_magick20231014-18559-d9k360.avif",
    "tags": [
      "floral",
      "heavy"
    ],
    "views": 6174,
    "likes": 1135,
    "photographer": "Pixabay Creator",
    "pixabay_id": 480,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 47,
    "title": "African tribal Mehndi Design 47",
    "description": "A stunning hard African tribal design perfect for Casual. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "African tribal",
    "occasion": "Casual",
    "difficulty": "Hard",
    "imageUrl": "/521980859716c8d801dce4c58250c9e7.jpg",
    "tags": [
      "traditional",
      "modern"
    ],
    "views": 8812,
    "likes": 749,
    "photographer": "Pixabay Creator",
    "pixabay_id": 614,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 48,
    "title": "Indo-Western Mehndi Design 48",
    "description": "A stunning expert Indo-Western design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Karva Chauth",
    "difficulty": "Expert",
    "imageUrl": "/361_degree_productions.avif",
    "tags": [
      "floral",
      "heavy"
    ],
    "views": 2558,
    "likes": 174,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 49,
    "title": "Mandala Mehndi Design 49",
    "description": "A stunning medium Mandala design perfect for Mehendi Night. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mandala",
    "occasion": "Mehendi Night",
    "difficulty": "Medium",
    "imageUrl": "/359255363_18058938619425017_2980609639300639243_n.avif",
    "tags": [
      "geometric",
      "elegant"
    ],
    "views": 7700,
    "likes": 1468,
    "photographer": "Pixabay Creator",
    "pixabay_id": 614,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 50,
    "title": "Tikki Mehndi Design 50",
    "description": "A stunning medium Tikki design perfect for Festival. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Festival",
    "difficulty": "Medium",
    "imageUrl": "/277592948_1066844400533747_5596981114046555_n.avif",
    "tags": [
      "bold",
      "intricate"
    ],
    "views": 4516,
    "likes": 463,
    "photographer": "Pixabay Creator",
    "pixabay_id": 6622701,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 51,
    "title": "minimal Arabic Mehndi Design 51",
    "description": "A stunning medium minimal Arabic design perfect for Party. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Party",
    "difficulty": "Medium",
    "imageUrl": "/Snapinsta.app_355148640_2089582684740789_8491820625466169110_n_1080.avif",
    "tags": [
      "heavy",
      "geometric"
    ],
    "views": 6699,
    "likes": 862,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 52,
    "title": "Berber Mehndi Design 52",
    "description": "A stunning hard Berber design perfect for Party. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/anjali_henna_(14).jpg",
    "tags": [
      "traditional",
      "floral"
    ],
    "views": 4694,
    "likes": 691,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 53,
    "title": "floral Turkish Mehndi Design 53",
    "description": "A stunning hard floral Turkish design perfect for Teej. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Teej",
    "difficulty": "Hard",
    "imageUrl": "/henna_by_divya_(8).avif",
    "tags": [
      "intricate",
      "modern"
    ],
    "views": 2300,
    "likes": 170,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8325022,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 54,
    "title": "Balinese Mehndi Design 54",
    "description": "A stunning hard Balinese design perfect for Diwali. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/_hennabymaziah.avif",
    "tags": [
      "modern",
      "floral"
    ],
    "views": 6068,
    "likes": 651,
    "photographer": "Pixabay Creator",
    "pixabay_id": 9127450,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 55,
    "title": "Sudanese Mehndi Design 55",
    "description": "A stunning hard Sudanese design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/358715288_18058938601425017_7096240074605130185_n.avif",
    "tags": [
      "traditional",
      "geometric"
    ],
    "views": 7690,
    "likes": 1314,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 56,
    "title": "Indo-Western Mehndi Design 56",
    "description": "A stunning easy Indo-Western design perfect for Teej. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/Snapinsta.app_360146176_18297944026104080_1483667979503638697_n_1080.avif",
    "tags": [
      "intricate",
      "heavy"
    ],
    "views": 4221,
    "likes": 440,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 57,
    "title": "Peacock Mehndi Design 57",
    "description": "A stunning easy Peacock design perfect for Karva Chauth. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Peacock",
    "occasion": "Karva Chauth",
    "difficulty": "Easy",
    "imageUrl": "/Mansi_Siddhapura.avif",
    "tags": [
      "modern",
      "heavy"
    ],
    "views": 6221,
    "likes": 1050,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4053081,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 58,
    "title": "Geometric Mehndi Design 58",
    "description": "A stunning hard Geometric design perfect for Teej. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Teej",
    "difficulty": "Hard",
    "imageUrl": "/124239582_139477791280649_7516324932121243411_n.avif",
    "tags": [
      "floral",
      "heavy"
    ],
    "views": 8189,
    "likes": 777,
    "photographer": "Pixabay Creator",
    "pixabay_id": 9007027,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 59,
    "title": "Gulf/Khaleeji Mehndi Design 59",
    "description": "A stunning easy Gulf/Khaleeji design perfect for Engagement. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Gulf/Khaleeji",
    "occasion": "Engagement",
    "difficulty": "Easy",
    "imageUrl": "/Snapinsta.app_321822369_223661390002933_3544312425646401498_n_1080.jpg",
    "tags": [
      "traditional",
      "elegant"
    ],
    "views": 4744,
    "likes": 591,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 60,
    "title": "Berber Mehndi Design 60",
    "description": "A stunning hard Berber design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Mehendi Night",
    "difficulty": "Hard",
    "imageUrl": "/Snapinsta.app_101442012_288322382290494_5329724816677708205_n_1080.avif",
    "tags": [
      "intricate",
      "floral"
    ],
    "views": 1778,
    "likes": 202,
    "photographer": "Pixabay Creator",
    "pixabay_id": 6098070,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 61,
    "title": "floral Turkish Mehndi Design 61",
    "description": "A stunning medium floral Turkish design perfect for Casual. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Casual",
    "difficulty": "Medium",
    "imageUrl": "/adsadadfa.avif",
    "tags": [
      "bold",
      "light"
    ],
    "views": 4126,
    "likes": 437,
    "photographer": "Pixabay Creator",
    "pixabay_id": 324,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 62,
    "title": "Balinese Mehndi Design 62",
    "description": "A stunning easy Balinese design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Karva Chauth",
    "difficulty": "Easy",
    "imageUrl": "/Snapinsta.app_120905684_167346931654911_3435251164984002391_n_1080.avif",
    "tags": [
      "geometric",
      "elegant"
    ],
    "views": 8931,
    "likes": 1414,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 63,
    "title": "Sudanese Mehndi Design 63",
    "description": "A stunning hard Sudanese design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Mehendi Night",
    "difficulty": "Hard",
    "imageUrl": "/176615861_887141298531201_4788140400645202544_n.avif",
    "tags": [
      "elegant",
      "traditional"
    ],
    "views": 3117,
    "likes": 513,
    "photographer": "Pixabay Creator",
    "pixabay_id": 2058088,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 64,
    "title": "Geometric modern Mehndi Design 64",
    "description": "A stunning hard Geometric modern design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/henna_by_divya.avif",
    "tags": [
      "traditional",
      "heavy"
    ],
    "views": 8854,
    "likes": 1408,
    "photographer": "Pixabay Creator",
    "pixabay_id": 80,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 65,
    "title": "Mughal Mehndi Design 65",
    "description": "A stunning hard Mughal design perfect for Karva Chauth. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/amrita_henna.jpg",
    "tags": [
      "elegant",
      "bold"
    ],
    "views": 8963,
    "likes": 805,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 66,
    "title": "Floral Mehndi Design 66",
    "description": "A stunning expert Floral design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Floral",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/375658402_975475350409711_3507580074053013633_n.jfif",
    "tags": [
      "floral",
      "elegant"
    ],
    "views": 3633,
    "likes": 261,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8726163,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 67,
    "title": "Arabic bold Mehndi Design 67",
    "description": "A stunning expert Arabic bold design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Karva Chauth",
    "difficulty": "Expert",
    "imageUrl": "/henna_by_divya_(7).avif",
    "tags": [
      "heavy",
      "light"
    ],
    "views": 8237,
    "likes": 468,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4082787,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 68,
    "title": "tribal Mehndi Design 68",
    "description": "A stunning hard tribal design perfect for Diwali. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "tribal",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/Amrita_Henna_(4).jpg",
    "tags": [
      "intricate",
      "modern"
    ],
    "views": 7823,
    "likes": 936,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 69,
    "title": "Ottoman Mehndi Design 69",
    "description": "A stunning expert Ottoman design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/minal_beauty_(8).jpg",
    "tags": [
      "floral",
      "light"
    ],
    "views": 8832,
    "likes": 1198,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8306605,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 70,
    "title": "Balinese Mehndi Design 70",
    "description": "A stunning easy Balinese design perfect for Casual. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Casual",
    "difficulty": "Easy",
    "imageUrl": "/anjj.avif",
    "tags": [
      "modern",
      "bold"
    ],
    "views": 8521,
    "likes": 970,
    "photographer": "Pixabay Creator",
    "pixabay_id": 2798326,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 71,
    "title": "Sudanese Mehndi Design 71",
    "description": "A stunning hard Sudanese design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/henna_6.avif",
    "tags": [
      "modern",
      "geometric"
    ],
    "views": 5306,
    "likes": 384,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 72,
    "title": "Indo-Western Mehndi Design 72",
    "description": "A stunning medium Indo-Western design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Mehendi Night",
    "difficulty": "Medium",
    "imageUrl": "/alankrita_by_rashi_(7).avif",
    "tags": [
      "floral",
      "bold"
    ],
    "views": 7281,
    "likes": 1098,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 73,
    "title": "Mughal Mehndi Design 73",
    "description": "A stunning hard Mughal design perfect for Party. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/358556412_580706557593153_7538074724656005252_n.avif",
    "tags": [
      "floral",
      "light"
    ],
    "views": 3605,
    "likes": 713,
    "photographer": "Pixabay Creator",
    "pixabay_id": 9724867,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 74,
    "title": "Tikki Mehndi Design 74",
    "description": "A stunning expert Tikki design perfect for Festival. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Festival",
    "difficulty": "Expert",
    "imageUrl": "/hennabyaz_(4).avif",
    "tags": [
      "heavy",
      "bold"
    ],
    "views": 7815,
    "likes": 468,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8301792,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 75,
    "title": "Arabic bold Mehndi Design 75",
    "description": "A stunning expert Arabic bold design perfect for Diwali. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Diwali",
    "difficulty": "Expert",
    "imageUrl": "/Snapinsta.app_354421838_826069441785120_2849743104236246373_n_1080.avif",
    "tags": [
      "geometric",
      "modern"
    ],
    "views": 5675,
    "likes": 741,
    "photographer": "Pixabay Creator",
    "pixabay_id": 2826391,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 76,
    "title": "Berber Mehndi Design 76",
    "description": "A stunning hard Berber design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/329379225_606354211047668_56710652147884024_n.avif",
    "tags": [
      "modern",
      "intricate"
    ],
    "views": 7182,
    "likes": 403,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 77,
    "title": "Ottoman Mehndi Design 77",
    "description": "A stunning easy Ottoman design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Party",
    "difficulty": "Easy",
    "imageUrl": "/hayat.avif",
    "tags": [
      "modern",
      "heavy"
    ],
    "views": 8826,
    "likes": 695,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7437705,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 78,
    "title": "Javanese Mehndi Design 78",
    "description": "A stunning medium Javanese design perfect for Party. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Party",
    "difficulty": "Medium",
    "imageUrl": "/PicsArt_04-09-10.14.24.avif",
    "tags": [
      "heavy",
      "bold"
    ],
    "views": 7390,
    "likes": 738,
    "photographer": "Pixabay Creator",
    "pixabay_id": 1321504,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 79,
    "title": "Sudanese Mehndi Design 79",
    "description": "A stunning hard Sudanese design perfect for Diwali. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/375288515_18200712892302002_935923178137333924_n.avif",
    "tags": [
      "traditional",
      "intricate"
    ],
    "views": 3517,
    "likes": 247,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8738173,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 80,
    "title": "Minimalist Mehndi Design 80",
    "description": "A stunning hard Minimalist design perfect for Diwali. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Minimalist",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/3426d9e9069b7bb4456a9c68ed9849c2.jpg",
    "tags": [
      "floral",
      "traditional"
    ],
    "views": 3597,
    "likes": 363,
    "photographer": "Pixabay Creator",
    "pixabay_id": 35893,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 81,
    "title": "Mughal Mehndi Design 81",
    "description": "A stunning hard Mughal design perfect for Engagement. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Engagement",
    "difficulty": "Hard",
    "imageUrl": "/333155814_486528953514552_1943120532658796596_n.avif",
    "tags": [
      "intricate",
      "floral"
    ],
    "views": 1430,
    "likes": 260,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 82,
    "title": "Floral Mehndi Design 82",
    "description": "A stunning medium Floral design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Floral",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/Snapinsta.app_240315638_1201763823659936_764299298912109232_n_1080.avif",
    "tags": [
      "intricate",
      "heavy"
    ],
    "views": 8434,
    "likes": 444,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4023937,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 83,
    "title": "minimal Arabic Mehndi Design 83",
    "description": "A stunning easy minimal Arabic design perfect for Casual. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Casual",
    "difficulty": "Easy",
    "imageUrl": "/unnamed.avif",
    "tags": [
      "heavy",
      "bold"
    ],
    "views": 4907,
    "likes": 912,
    "photographer": "Pixabay Creator",
    "pixabay_id": 718445,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 84,
    "title": "geometric Mehndi Design 84",
    "description": "A stunning easy geometric design perfect for Teej. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/344464257_642077003923589_9125182905211196400_n.avif",
    "tags": [
      "bold",
      "intricate"
    ],
    "views": 4461,
    "likes": 543,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 85,
    "title": "Ottoman Mehndi Design 85",
    "description": "A stunning expert Ottoman design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Party",
    "difficulty": "Expert",
    "imageUrl": "/Snapinsta.app_242517882_382307166890737_7386207358374737613_n_1080.avif",
    "tags": [
      "floral",
      "bold"
    ],
    "views": 1362,
    "likes": 217,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4505999,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 86,
    "title": "Javanese Mehndi Design 86",
    "description": "A stunning expert Javanese design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/346423398_937550154117603_7116329827553741891_n.avif",
    "tags": [
      "floral",
      "elegant"
    ],
    "views": 2440,
    "likes": 152,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7011010,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 87,
    "title": "Sudanese Mehndi Design 87",
    "description": "A stunning easy Sudanese design perfect for Festival. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Festival",
    "difficulty": "Easy",
    "imageUrl": "/ABCD.avif",
    "tags": [
      "elegant",
      "intricate"
    ],
    "views": 8804,
    "likes": 825,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7419841,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 88,
    "title": "Geometric modern Mehndi Design 88",
    "description": "A stunning hard Geometric modern design perfect for Party. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/355419759_1227554437927690_7428575999984366409_n.jpg",
    "tags": [
      "traditional",
      "light"
    ],
    "views": 1693,
    "likes": 167,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 89,
    "title": "South Indian Mehndi Design 89",
    "description": "A stunning medium South Indian design perfect for Engagement. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "South Indian",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/337172410_180233828133936_8252768828852222895_n.jfif",
    "tags": [
      "heavy",
      "modern"
    ],
    "views": 3017,
    "likes": 153,
    "photographer": "Pixabay Creator",
    "pixabay_id": 1309206,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 90,
    "title": "Tikki Mehndi Design 90",
    "description": "A stunning expert Tikki design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Diwali",
    "difficulty": "Expert",
    "imageUrl": "/b7c6278301a4514d4f7916402e3c1139.avif",
    "tags": [
      "floral",
      "elegant"
    ],
    "views": 5808,
    "likes": 368,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7688749,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 91,
    "title": "Gulf/Khaleeji Mehndi Design 91",
    "description": "A stunning easy Gulf/Khaleeji design perfect for Teej. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Gulf/Khaleeji",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/Snapinsta.app_120905684_167346931654911_3435251164984002391_n_1080.jpg",
    "tags": [
      "intricate",
      "floral"
    ],
    "views": 8788,
    "likes": 1229,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 92,
    "title": "Berber Mehndi Design 92",
    "description": "A stunning expert Berber design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/Snapinsta.app_307884443_777567116868171_1162855896794549843_n_1080.jpg",
    "tags": [
      "geometric",
      "heavy"
    ],
    "views": 6739,
    "likes": 957,
    "photographer": "Pixabay Creator",
    "pixabay_id": 147035,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 93,
    "title": "floral Turkish Mehndi Design 93",
    "description": "A stunning expert floral Turkish design perfect for Teej. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Teej",
    "difficulty": "Expert",
    "imageUrl": "/amrita_henna.avif",
    "tags": [
      "heavy",
      "floral"
    ],
    "views": 5436,
    "likes": 730,
    "photographer": "Pixabay Creator",
    "pixabay_id": 5442598,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 94,
    "title": "Javanese Mehndi Design 94",
    "description": "A stunning easy Javanese design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Mehendi Night",
    "difficulty": "Easy",
    "imageUrl": "/363502805_833318421495315_5577863500440832143_n.avif",
    "tags": [
      "modern",
      "bold"
    ],
    "views": 5653,
    "likes": 1031,
    "photographer": "Pixabay Creator",
    "pixabay_id": 3821296,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 95,
    "title": "Sudanese Mehndi Design 95",
    "description": "A stunning easy Sudanese design perfect for Teej. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/331134392_6163570930369677_5241764034404393003_n.avif",
    "tags": [
      "elegant",
      "heavy"
    ],
    "views": 5843,
    "likes": 446,
    "photographer": "Pixabay Creator",
    "pixabay_id": 4213487,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 96,
    "title": "Geometric modern Mehndi Design 96",
    "description": "A stunning hard Geometric modern design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/317196994_860615678411997_7902818446797822306_n.jfif",
    "tags": [
      "geometric",
      "light"
    ],
    "views": 1400,
    "likes": 276,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 97,
    "title": "Peacock Mehndi Design 97",
    "description": "A stunning easy Peacock design perfect for Wedding. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Peacock",
    "occasion": "Wedding",
    "difficulty": "Easy",
    "imageUrl": "/13702998_316859012037113_144333033_n.jpg",
    "tags": [
      "intricate",
      "modern"
    ],
    "views": 8141,
    "likes": 1302,
    "photographer": "Pixabay Creator",
    "pixabay_id": null,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 98,
    "title": "Geometric Mehndi Design 98",
    "description": "A stunning expert Geometric design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/candid_wedding_stories.avif",
    "tags": [
      "floral",
      "intricate"
    ],
    "views": 3355,
    "likes": 246,
    "photographer": "Pixabay Creator",
    "pixabay_id": 8539958,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 99,
    "title": "minimal Arabic Mehndi Design 99",
    "description": "A stunning medium minimal Arabic design perfect for Party. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Party",
    "difficulty": "Medium",
    "imageUrl": "/359459706_18058938610425017_2437887919008177950_n.avif",
    "tags": [
      "heavy",
      "bold"
    ],
    "views": 3916,
    "likes": 402,
    "photographer": "Pixabay Creator",
    "pixabay_id": 7735504,
    "pexels_id": null,
    "source": "pixabay"
  },
  {
    "id": 100,
    "title": "geometric Mehndi Design 100",
    "description": "A stunning expert geometric design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Karva Chauth",
    "difficulty": "Expert",
    "imageUrl": "/ennaforallny.jfif",
    "tags": [
      "heavy",
      "geometric"
    ],
    "views": 7480,
    "likes": 730,
    "photographer": "Pixabay Creator",
    "pixabay_id": 3006816,
    "pexels_id": null,
    "source": "pixabay"
  }
];
