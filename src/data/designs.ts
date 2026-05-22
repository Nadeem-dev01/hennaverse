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
    "imageUrl": "/images/designs/india-5.jpg",
    "tags": [
      "traditional",
      "modern"
    ]
  },
  {
    "id": 2,
    "title": "Tikki Mehndi Design 2",
    "description": "A stunning easy Tikki design perfect for Eid. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Eid",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/pakistan-4.jpg",
    "tags": [
      "light",
      "modern"
    ]
  },
  {
    "id": 3,
    "title": "Arabic bold Mehndi Design 3",
    "description": "A stunning easy Arabic bold design perfect for Wedding. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Wedding",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/arabia-5.jpg",
    "tags": [
      "bold",
      "light"
    ]
  },
  {
    "id": 4,
    "title": "tribal Mehndi Design 4",
    "description": "A stunning hard tribal design perfect for Engagement. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "tribal",
    "occasion": "Engagement",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/morocco-1.jpg",
    "tags": [
      "floral",
      "heavy"
    ]
  },
  {
    "id": 5,
    "title": "floral Turkish Mehndi Design 5",
    "description": "A stunning expert floral Turkish design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Party",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/turkey-4.jpg",
    "tags": [
      "traditional",
      "geometric"
    ]
  },
  {
    "id": 6,
    "title": "Balinese Mehndi Design 6",
    "description": "A stunning medium Balinese design perfect for Diwali. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/indonesia-4.jpg",
    "tags": [
      "modern",
      "traditional"
    ]
  },
  {
    "id": 7,
    "title": "Sudanese Mehndi Design 7",
    "description": "A stunning medium Sudanese design perfect for Casual. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Casual",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/sudan-4.jpg",
    "tags": [
      "light",
      "traditional"
    ]
  },
  {
    "id": 8,
    "title": "Indo-Western Mehndi Design 8",
    "description": "A stunning medium Indo-Western design perfect for Diwali. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/western-5.jpg",
    "tags": [
      "geometric",
      "elegant"
    ]
  },
  {
    "id": 9,
    "title": "South Indian Mehndi Design 9",
    "description": "A stunning hard South Indian design perfect for Party. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "South Indian",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/india-5.jpg",
    "tags": [
      "modern",
      "elegant"
    ]
  },
  {
    "id": 10,
    "title": "Tikki Mehndi Design 10",
    "description": "A stunning medium Tikki design perfect for Teej. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/pakistan-5.jpg",
    "tags": [
      "geometric",
      "heavy"
    ]
  },
  {
    "id": 11,
    "title": "Arabic bold Mehndi Design 11",
    "description": "A stunning expert Arabic bold design perfect for Engagement. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Engagement",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/arabia-5.jpg",
    "tags": [
      "light",
      "elegant"
    ]
  },
  {
    "id": 12,
    "title": "Berber Mehndi Design 12",
    "description": "A stunning medium Berber design perfect for Teej. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/morocco-2.jpg",
    "tags": [
      "light",
      "bold"
    ]
  },
  {
    "id": 13,
    "title": "floral Turkish Mehndi Design 13",
    "description": "A stunning hard floral Turkish design perfect for Eid. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Eid",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/turkey-1.jpg",
    "tags": [
      "elegant",
      "intricate"
    ]
  },
  {
    "id": 14,
    "title": "Javanese Mehndi Design 14",
    "description": "A stunning easy Javanese design perfect for Engagement. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Engagement",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/indonesia-5.jpg",
    "tags": [
      "heavy",
      "floral"
    ]
  },
  {
    "id": 15,
    "title": "Sudanese Mehndi Design 15",
    "description": "A stunning expert Sudanese design perfect for Engagement. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Engagement",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/sudan-2.jpg",
    "tags": [
      "modern",
      "traditional"
    ]
  },
  {
    "id": 16,
    "title": "Geometric modern Mehndi Design 16",
    "description": "A stunning expert Geometric modern design perfect for Casual. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Casual",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/western-2.jpg",
    "tags": [
      "traditional",
      "geometric"
    ]
  },
  {
    "id": 17,
    "title": "Mughal Mehndi Design 17",
    "description": "A stunning hard Mughal design perfect for Festival. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Festival",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/india-5.jpg",
    "tags": [
      "heavy",
      "intricate"
    ]
  },
  {
    "id": 18,
    "title": "Geometric Mehndi Design 18",
    "description": "A stunning easy Geometric design perfect for Festival. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Festival",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/pakistan-5.jpg",
    "tags": [
      "floral",
      "geometric"
    ]
  },
  {
    "id": 19,
    "title": "minimal Arabic Mehndi Design 19",
    "description": "A stunning expert minimal Arabic design perfect for Teej. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Teej",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/arabia-1.jpg",
    "tags": [
      "floral",
      "intricate"
    ]
  },
  {
    "id": 20,
    "title": "geometric Mehndi Design 20",
    "description": "A stunning easy geometric design perfect for Teej. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/morocco-3.jpg",
    "tags": [
      "heavy",
      "floral"
    ]
  },
  {
    "id": 21,
    "title": "floral Turkish Mehndi Design 21",
    "description": "A stunning medium floral Turkish design perfect for Eid. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Eid",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/turkey-2.jpg",
    "tags": [
      "traditional",
      "intricate"
    ]
  },
  {
    "id": 22,
    "title": "Balinese Mehndi Design 22",
    "description": "A stunning medium Balinese design perfect for Diwali. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/indonesia-2.jpg",
    "tags": [
      "heavy",
      "intricate"
    ]
  },
  {
    "id": 23,
    "title": "African tribal Mehndi Design 23",
    "description": "A stunning medium African tribal design perfect for Engagement. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "African tribal",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/sudan-5.jpg",
    "tags": [
      "elegant",
      "heavy"
    ]
  },
  {
    "id": 24,
    "title": "Geometric modern Mehndi Design 24",
    "description": "A stunning easy Geometric modern design perfect for Party. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Party",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/western-5.jpg",
    "tags": [
      "floral",
      "elegant"
    ]
  },
  {
    "id": 25,
    "title": "Bridal Mehndi Design 25",
    "description": "A stunning medium Bridal design perfect for Wedding. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Bridal",
    "occasion": "Wedding",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/india-1.jpg",
    "tags": [
      "modern",
      "bold"
    ]
  },
  {
    "id": 26,
    "title": "Geometric Mehndi Design 26",
    "description": "A stunning easy Geometric design perfect for Wedding. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Wedding",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/pakistan-5.jpg",
    "tags": [
      "traditional",
      "light"
    ]
  },
  {
    "id": 27,
    "title": "Arabic bold Mehndi Design 27",
    "description": "A stunning medium Arabic bold design perfect for Teej. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/arabia-5.jpg",
    "tags": [
      "modern",
      "geometric"
    ]
  },
  {
    "id": 28,
    "title": "geometric Mehndi Design 28",
    "description": "A stunning easy geometric design perfect for Diwali. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Diwali",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/morocco-3.jpg",
    "tags": [
      "traditional",
      "intricate"
    ]
  },
  {
    "id": 29,
    "title": "Ottoman Mehndi Design 29",
    "description": "A stunning medium Ottoman design perfect for Engagement. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/turkey-4.jpg",
    "tags": [
      "bold",
      "heavy"
    ]
  },
  {
    "id": 30,
    "title": "Javanese Mehndi Design 30",
    "description": "A stunning hard Javanese design perfect for Festival. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Festival",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/indonesia-3.jpg",
    "tags": [
      "geometric",
      "bold"
    ]
  },
  {
    "id": 31,
    "title": "Sudanese Mehndi Design 31",
    "description": "A stunning easy Sudanese design perfect for Casual. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Casual",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/sudan-5.jpg",
    "tags": [
      "intricate",
      "traditional"
    ]
  },
  {
    "id": 32,
    "title": "Minimalist Mehndi Design 32",
    "description": "A stunning medium Minimalist design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Minimalist",
    "occasion": "Mehendi Night",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/western-5.jpg",
    "tags": [
      "traditional",
      "elegant"
    ]
  },
  {
    "id": 33,
    "title": "South Indian Mehndi Design 33",
    "description": "A stunning hard South Indian design perfect for Party. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "South Indian",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/india-4.jpg",
    "tags": [
      "heavy",
      "light"
    ]
  },
  {
    "id": 34,
    "title": "Geometric Mehndi Design 34",
    "description": "A stunning easy Geometric design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Diwali",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/pakistan-3.jpg",
    "tags": [
      "elegant",
      "light"
    ]
  },
  {
    "id": 35,
    "title": "Arabic bold Mehndi Design 35",
    "description": "A stunning hard Arabic bold design perfect for Wedding. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Wedding",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/arabia-2.jpg",
    "tags": [
      "geometric",
      "elegant"
    ]
  },
  {
    "id": 36,
    "title": "geometric Mehndi Design 36",
    "description": "A stunning easy geometric design perfect for Engagement. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Engagement",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/morocco-4.jpg",
    "tags": [
      "modern",
      "traditional"
    ]
  },
  {
    "id": 37,
    "title": "floral Turkish Mehndi Design 37",
    "description": "A stunning easy floral Turkish design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Party",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/turkey-3.jpg",
    "tags": [
      "heavy",
      "bold"
    ]
  },
  {
    "id": 38,
    "title": "Balinese Mehndi Design 38",
    "description": "A stunning expert Balinese design perfect for Wedding. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Wedding",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/indonesia-3.jpg",
    "tags": [
      "heavy",
      "light"
    ]
  },
  {
    "id": 39,
    "title": "Sudanese Mehndi Design 39",
    "description": "A stunning medium Sudanese design perfect for Teej. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Teej",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/sudan-1.jpg",
    "tags": [
      "traditional",
      "intricate"
    ]
  },
  {
    "id": 40,
    "title": "Indo-Western Mehndi Design 40",
    "description": "A stunning expert Indo-Western design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/western-3.jpg",
    "tags": [
      "bold",
      "elegant"
    ]
  },
  {
    "id": 41,
    "title": "Bridal Mehndi Design 41",
    "description": "A stunning expert Bridal design perfect for Festival. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Bridal",
    "occasion": "Festival",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/india-3.jpg",
    "tags": [
      "light",
      "modern"
    ]
  },
  {
    "id": 42,
    "title": "Floral Mehndi Design 42",
    "description": "A stunning medium Floral design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Floral",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/pakistan-2.jpg",
    "tags": [
      "intricate",
      "traditional"
    ]
  },
  {
    "id": 43,
    "title": "Gulf/Khaleeji Mehndi Design 43",
    "description": "A stunning medium Gulf/Khaleeji design perfect for Engagement. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Gulf/Khaleeji",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/arabia-4.jpg",
    "tags": [
      "traditional",
      "light"
    ]
  },
  {
    "id": 44,
    "title": "tribal Mehndi Design 44",
    "description": "A stunning easy tribal design perfect for Eid. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "tribal",
    "occasion": "Eid",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/morocco-4.jpg",
    "tags": [
      "geometric",
      "bold"
    ]
  },
  {
    "id": 45,
    "title": "Ottoman Mehndi Design 45",
    "description": "A stunning hard Ottoman design perfect for Casual. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Casual",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/turkey-3.jpg",
    "tags": [
      "traditional",
      "light"
    ]
  },
  {
    "id": 46,
    "title": "Javanese Mehndi Design 46",
    "description": "A stunning hard Javanese design perfect for Casual. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Casual",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/indonesia-5.jpg",
    "tags": [
      "floral",
      "heavy"
    ]
  },
  {
    "id": 47,
    "title": "African tribal Mehndi Design 47",
    "description": "A stunning hard African tribal design perfect for Casual. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "African tribal",
    "occasion": "Casual",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/sudan-1.jpg",
    "tags": [
      "traditional",
      "modern"
    ]
  },
  {
    "id": 48,
    "title": "Indo-Western Mehndi Design 48",
    "description": "A stunning expert Indo-Western design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Karva Chauth",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/western-5.jpg",
    "tags": [
      "floral",
      "heavy"
    ]
  },
  {
    "id": 49,
    "title": "Mandala Mehndi Design 49",
    "description": "A stunning medium Mandala design perfect for Mehendi Night. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mandala",
    "occasion": "Mehendi Night",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/india-5.jpg",
    "tags": [
      "geometric",
      "elegant"
    ]
  },
  {
    "id": 50,
    "title": "Tikki Mehndi Design 50",
    "description": "A stunning medium Tikki design perfect for Festival. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Festival",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/pakistan-5.jpg",
    "tags": [
      "bold",
      "intricate"
    ]
  },
  {
    "id": 51,
    "title": "minimal Arabic Mehndi Design 51",
    "description": "A stunning medium minimal Arabic design perfect for Party. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Party",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/arabia-5.jpg",
    "tags": [
      "heavy",
      "geometric"
    ]
  },
  {
    "id": 52,
    "title": "Berber Mehndi Design 52",
    "description": "A stunning hard Berber design perfect for Party. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/morocco-3.jpg",
    "tags": [
      "traditional",
      "floral"
    ]
  },
  {
    "id": 53,
    "title": "floral Turkish Mehndi Design 53",
    "description": "A stunning hard floral Turkish design perfect for Teej. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Teej",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/turkey-5.jpg",
    "tags": [
      "intricate",
      "modern"
    ]
  },
  {
    "id": 54,
    "title": "Balinese Mehndi Design 54",
    "description": "A stunning hard Balinese design perfect for Diwali. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/indonesia-2.jpg",
    "tags": [
      "modern",
      "floral"
    ]
  },
  {
    "id": 55,
    "title": "Sudanese Mehndi Design 55",
    "description": "A stunning hard Sudanese design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/sudan-5.jpg",
    "tags": [
      "traditional",
      "geometric"
    ]
  },
  {
    "id": 56,
    "title": "Indo-Western Mehndi Design 56",
    "description": "A stunning easy Indo-Western design perfect for Teej. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/western-3.jpg",
    "tags": [
      "intricate",
      "heavy"
    ]
  },
  {
    "id": 57,
    "title": "Peacock Mehndi Design 57",
    "description": "A stunning easy Peacock design perfect for Karva Chauth. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Peacock",
    "occasion": "Karva Chauth",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/india-1.jpg",
    "tags": [
      "modern",
      "heavy"
    ]
  },
  {
    "id": 58,
    "title": "Geometric Mehndi Design 58",
    "description": "A stunning hard Geometric design perfect for Teej. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Teej",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/pakistan-1.jpg",
    "tags": [
      "floral",
      "heavy"
    ]
  },
  {
    "id": 59,
    "title": "Gulf/Khaleeji Mehndi Design 59",
    "description": "A stunning easy Gulf/Khaleeji design perfect for Engagement. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Gulf/Khaleeji",
    "occasion": "Engagement",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/arabia-4.jpg",
    "tags": [
      "traditional",
      "elegant"
    ]
  },
  {
    "id": 60,
    "title": "Berber Mehndi Design 60",
    "description": "A stunning hard Berber design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Mehendi Night",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/morocco-5.jpg",
    "tags": [
      "intricate",
      "floral"
    ]
  },
  {
    "id": 61,
    "title": "floral Turkish Mehndi Design 61",
    "description": "A stunning medium floral Turkish design perfect for Casual. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Casual",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/turkey-3.jpg",
    "tags": [
      "bold",
      "light"
    ]
  },
  {
    "id": 62,
    "title": "Balinese Mehndi Design 62",
    "description": "A stunning easy Balinese design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Karva Chauth",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/indonesia-5.jpg",
    "tags": [
      "geometric",
      "elegant"
    ]
  },
  {
    "id": 63,
    "title": "Sudanese Mehndi Design 63",
    "description": "A stunning hard Sudanese design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Mehendi Night",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/sudan-3.jpg",
    "tags": [
      "elegant",
      "traditional"
    ]
  },
  {
    "id": 64,
    "title": "Geometric modern Mehndi Design 64",
    "description": "A stunning hard Geometric modern design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/western-2.jpg",
    "tags": [
      "traditional",
      "heavy"
    ]
  },
  {
    "id": 65,
    "title": "Mughal Mehndi Design 65",
    "description": "A stunning hard Mughal design perfect for Karva Chauth. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/india-2.jpg",
    "tags": [
      "elegant",
      "bold"
    ]
  },
  {
    "id": 66,
    "title": "Floral Mehndi Design 66",
    "description": "A stunning expert Floral design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Floral",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/pakistan-4.jpg",
    "tags": [
      "floral",
      "elegant"
    ]
  },
  {
    "id": 67,
    "title": "Arabic bold Mehndi Design 67",
    "description": "A stunning expert Arabic bold design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Karva Chauth",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/arabia-5.jpg",
    "tags": [
      "heavy",
      "light"
    ]
  },
  {
    "id": 68,
    "title": "tribal Mehndi Design 68",
    "description": "A stunning hard tribal design perfect for Diwali. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "tribal",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/morocco-5.jpg",
    "tags": [
      "intricate",
      "modern"
    ]
  },
  {
    "id": 69,
    "title": "Ottoman Mehndi Design 69",
    "description": "A stunning expert Ottoman design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/turkey-3.jpg",
    "tags": [
      "floral",
      "light"
    ]
  },
  {
    "id": 70,
    "title": "Balinese Mehndi Design 70",
    "description": "A stunning easy Balinese design perfect for Casual. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Balinese",
    "occasion": "Casual",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/indonesia-2.jpg",
    "tags": [
      "modern",
      "bold"
    ]
  },
  {
    "id": 71,
    "title": "Sudanese Mehndi Design 71",
    "description": "A stunning hard Sudanese design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/sudan-3.jpg",
    "tags": [
      "modern",
      "geometric"
    ]
  },
  {
    "id": 72,
    "title": "Indo-Western Mehndi Design 72",
    "description": "A stunning medium Indo-Western design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Indo-Western",
    "occasion": "Mehendi Night",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/western-4.jpg",
    "tags": [
      "floral",
      "bold"
    ]
  },
  {
    "id": 73,
    "title": "Mughal Mehndi Design 73",
    "description": "A stunning hard Mughal design perfect for Party. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/india-1.jpg",
    "tags": [
      "floral",
      "light"
    ]
  },
  {
    "id": 74,
    "title": "Tikki Mehndi Design 74",
    "description": "A stunning expert Tikki design perfect for Festival. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Festival",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/pakistan-3.jpg",
    "tags": [
      "heavy",
      "bold"
    ]
  },
  {
    "id": 75,
    "title": "Arabic bold Mehndi Design 75",
    "description": "A stunning expert Arabic bold design perfect for Diwali. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Arabic bold",
    "occasion": "Diwali",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/arabia-2.jpg",
    "tags": [
      "geometric",
      "modern"
    ]
  },
  {
    "id": 76,
    "title": "Berber Mehndi Design 76",
    "description": "A stunning hard Berber design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/morocco-2.jpg",
    "tags": [
      "modern",
      "intricate"
    ]
  },
  {
    "id": 77,
    "title": "Ottoman Mehndi Design 77",
    "description": "A stunning easy Ottoman design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Party",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/turkey-3.jpg",
    "tags": [
      "modern",
      "heavy"
    ]
  },
  {
    "id": 78,
    "title": "Javanese Mehndi Design 78",
    "description": "A stunning medium Javanese design perfect for Party. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Party",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/indonesia-2.jpg",
    "tags": [
      "heavy",
      "bold"
    ]
  },
  {
    "id": 79,
    "title": "Sudanese Mehndi Design 79",
    "description": "A stunning hard Sudanese design perfect for Diwali. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/sudan-4.jpg",
    "tags": [
      "traditional",
      "intricate"
    ]
  },
  {
    "id": 80,
    "title": "Minimalist Mehndi Design 80",
    "description": "A stunning hard Minimalist design perfect for Diwali. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Minimalist",
    "occasion": "Diwali",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/western-1.jpg",
    "tags": [
      "floral",
      "traditional"
    ]
  },
  {
    "id": 81,
    "title": "Mughal Mehndi Design 81",
    "description": "A stunning hard Mughal design perfect for Engagement. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Mughal",
    "occasion": "Engagement",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/india-2.jpg",
    "tags": [
      "intricate",
      "floral"
    ]
  },
  {
    "id": 82,
    "title": "Floral Mehndi Design 82",
    "description": "A stunning medium Floral design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Floral",
    "occasion": "Diwali",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/pakistan-5.jpg",
    "tags": [
      "intricate",
      "heavy"
    ]
  },
  {
    "id": 83,
    "title": "minimal Arabic Mehndi Design 83",
    "description": "A stunning easy minimal Arabic design perfect for Casual. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Casual",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/arabia-4.jpg",
    "tags": [
      "heavy",
      "bold"
    ]
  },
  {
    "id": 84,
    "title": "geometric Mehndi Design 84",
    "description": "A stunning easy geometric design perfect for Teej. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/morocco-4.jpg",
    "tags": [
      "bold",
      "intricate"
    ]
  },
  {
    "id": 85,
    "title": "Ottoman Mehndi Design 85",
    "description": "A stunning expert Ottoman design perfect for Party. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "Ottoman",
    "occasion": "Party",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/turkey-5.jpg",
    "tags": [
      "floral",
      "bold"
    ]
  },
  {
    "id": 86,
    "title": "Javanese Mehndi Design 86",
    "description": "A stunning expert Javanese design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/indonesia-3.jpg",
    "tags": [
      "floral",
      "elegant"
    ]
  },
  {
    "id": 87,
    "title": "Sudanese Mehndi Design 87",
    "description": "A stunning easy Sudanese design perfect for Festival. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Festival",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/sudan-5.jpg",
    "tags": [
      "elegant",
      "intricate"
    ]
  },
  {
    "id": 88,
    "title": "Geometric modern Mehndi Design 88",
    "description": "A stunning hard Geometric modern design perfect for Party. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Party",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/western-1.jpg",
    "tags": [
      "traditional",
      "light"
    ]
  },
  {
    "id": 89,
    "title": "South Indian Mehndi Design 89",
    "description": "A stunning medium South Indian design perfect for Engagement. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "South Indian",
    "occasion": "Engagement",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/india-2.jpg",
    "tags": [
      "heavy",
      "modern"
    ]
  },
  {
    "id": 90,
    "title": "Tikki Mehndi Design 90",
    "description": "A stunning expert Tikki design perfect for Diwali. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Tikki",
    "occasion": "Diwali",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/pakistan-1.jpg",
    "tags": [
      "floral",
      "elegant"
    ]
  },
  {
    "id": 91,
    "title": "Gulf/Khaleeji Mehndi Design 91",
    "description": "A stunning easy Gulf/Khaleeji design perfect for Teej. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "Gulf/Khaleeji",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/arabia-5.jpg",
    "tags": [
      "intricate",
      "floral"
    ]
  },
  {
    "id": 92,
    "title": "Berber Mehndi Design 92",
    "description": "A stunning expert Berber design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "Berber",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/morocco-4.jpg",
    "tags": [
      "geometric",
      "heavy"
    ]
  },
  {
    "id": 93,
    "title": "floral Turkish Mehndi Design 93",
    "description": "A stunning expert floral Turkish design perfect for Teej. This beautiful henna pattern features unique elements from Turkey traditions.",
    "country": "Turkey",
    "style": "floral Turkish",
    "occasion": "Teej",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/turkey-4.jpg",
    "tags": [
      "heavy",
      "floral"
    ]
  },
  {
    "id": 94,
    "title": "Javanese Mehndi Design 94",
    "description": "A stunning easy Javanese design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Indonesia traditions.",
    "country": "Indonesia",
    "style": "Javanese",
    "occasion": "Mehendi Night",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/indonesia-3.jpg",
    "tags": [
      "modern",
      "bold"
    ]
  },
  {
    "id": 95,
    "title": "Sudanese Mehndi Design 95",
    "description": "A stunning easy Sudanese design perfect for Teej. This beautiful henna pattern features unique elements from Sudan traditions.",
    "country": "Sudan",
    "style": "Sudanese",
    "occasion": "Teej",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/sudan-3.jpg",
    "tags": [
      "elegant",
      "heavy"
    ]
  },
  {
    "id": 96,
    "title": "Geometric modern Mehndi Design 96",
    "description": "A stunning hard Geometric modern design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Western traditions.",
    "country": "Western",
    "style": "Geometric modern",
    "occasion": "Karva Chauth",
    "difficulty": "Hard",
    "imageUrl": "/images/designs/western-3.jpg",
    "tags": [
      "geometric",
      "light"
    ]
  },
  {
    "id": 97,
    "title": "Peacock Mehndi Design 97",
    "description": "A stunning easy Peacock design perfect for Wedding. This beautiful henna pattern features unique elements from India traditions.",
    "country": "India",
    "style": "Peacock",
    "occasion": "Wedding",
    "difficulty": "Easy",
    "imageUrl": "/images/designs/india-2.jpg",
    "tags": [
      "intricate",
      "modern"
    ]
  },
  {
    "id": 98,
    "title": "Geometric Mehndi Design 98",
    "description": "A stunning expert Geometric design perfect for Mehendi Night. This beautiful henna pattern features unique elements from Pakistan traditions.",
    "country": "Pakistan",
    "style": "Geometric",
    "occasion": "Mehendi Night",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/pakistan-4.jpg",
    "tags": [
      "floral",
      "intricate"
    ]
  },
  {
    "id": 99,
    "title": "minimal Arabic Mehndi Design 99",
    "description": "A stunning medium minimal Arabic design perfect for Party. This beautiful henna pattern features unique elements from Arabia traditions.",
    "country": "Arabia",
    "style": "minimal Arabic",
    "occasion": "Party",
    "difficulty": "Medium",
    "imageUrl": "/images/designs/arabia-4.jpg",
    "tags": [
      "heavy",
      "bold"
    ]
  },
  {
    "id": 100,
    "title": "geometric Mehndi Design 100",
    "description": "A stunning expert geometric design perfect for Karva Chauth. This beautiful henna pattern features unique elements from Morocco traditions.",
    "country": "Morocco",
    "style": "geometric",
    "occasion": "Karva Chauth",
    "difficulty": "Expert",
    "imageUrl": "/images/designs/morocco-3.jpg",
    "tags": [
      "heavy",
      "geometric"
    ]
  }
];
