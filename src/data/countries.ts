export interface CountryStyle {
  id: string;
  name: string;
  flag: string;
  description: string;
  styles: string[];
  designCount: number;
  heroImage: string;
  traditions: string;
  famousFor: string;
}

export const countries: CountryStyle[] = [
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    description:
      'India is the heartland of mehndi art, where henna has been an integral part of weddings, festivals, and daily adornment for over 5,000 years. From the intricate Rajasthani patterns of the Thar Desert to the elaborate Mughal-inspired motifs of the north and the bold temple designs of the south, Indian mehndi is unrivalled in its diversity and depth. Every region offers a distinct visual vocabulary rooted in local folklore, religion, and royal heritage.',
    styles: ['Rajasthani', 'Mughal', 'South Indian', 'Bridal', 'Peacock', 'Mandala', 'Trail', 'Finger'],
    designCount: 20,
    heroImage: '/images/countries/india-hero.jpg',
    traditions:
      'In Indian culture, mehndi is applied during weddings as a symbol of love and prosperity. The darkness of the bride\'s henna is believed to predict the strength of the marriage. Festivals like Karva Chauth, Teej, and Diwali also see widespread mehndi application.',
    famousFor: 'Full-hand bridal coverage with hidden groom motifs and mirror-image symmetry.',
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    flag: '🇵🇰',
    description:
      'Pakistani mehndi blends Mughal grandeur with contemporary flair, producing some of the most elaborate bridal designs in the world. Heavily influenced by both Indian and Arabic traditions, Pakistani henna artists are celebrated for their dense, full-coverage patterns that extend from fingertips to elbows and from toes to knees. The fusion of geometric precision with floral abundance sets Pakistani mehndi apart on the global stage.',
    styles: ['Bridal', 'Tikki', 'Geometric', 'Floral', 'Indo-Arabic Fusion'],
    designCount: 15,
    heroImage: '/images/countries/pakistan-hero.jpg',
    traditions:
      'The Mehndi Night (Raat ki Mehndi) is one of the most anticipated events in a Pakistani wedding, featuring folk songs, dholki beats, and communal henna application. Yellow and green are the signature colours of the celebration. Eid-ul-Fitr and Eid-ul-Adha also see widespread mehndi traditions across all ages.',
    famousFor: 'Dense full-arm bridal mehndi with tikki (circular medallion) centrepieces and intricate filling.',
  },
  {
    id: 'arabia',
    name: 'Arabia',
    flag: '🇸🇦',
    description:
      'Arabic mehndi from the Gulf region is distinguished by its bold, flowing lines, large floral motifs, and generous use of negative space. Unlike the dense coverage of South Asian styles, Arabic henna celebrates open skin, creating a striking contrast between the dark henna and bare hand. Khaleeji patterns from Saudi Arabia, UAE, Oman, and Bahrain have become globally influential due to their elegance and versatility.',
    styles: ['Gulf / Khaleeji', 'Arabic Bold Floral', 'Minimal Arabic', 'Vine & Leaf', 'Contemporary Arabic'],
    designCount: 15,
    heroImage: '/images/countries/arabia-hero.jpg',
    traditions:
      'Henna is deeply rooted in Gulf culture, applied before weddings, during Eid celebrations, and at social gatherings called "henna parties." In many Gulf countries, professional henna artists are invited to apply elaborate designs on the bride and her guests. The tradition of applying henna on Thursday evenings is still practised widely.',
    famousFor: 'Bold, free-flowing floral trails with dramatic negative space and thick outlines.',
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    description:
      'Moroccan henna carries the ancient geometric wisdom of the Berber (Amazigh) people, creating mesmerising patterns built from diamonds, triangles, and lattice grids. Unlike the curvilinear styles of Asia, Moroccan mehndi is architectural and angular, reflecting the tilework of Moroccan mosques and riads. The tradition runs through both urban centres like Fez and Marrakech and rural Amazigh communities of the Atlas Mountains.',
    styles: ['Berber Geometric', 'Tribal', 'Fassi (Fez)', 'Marrakech Contemporary', 'Lattice Grid'],
    designCount: 12,
    heroImage: '/images/countries/morocco-hero.jpg',
    traditions:
      'In Moroccan weddings, the "Henna Night" or "Laylat al-Henna" is a separate ceremony where the bride\'s hands and feet are decorated while guests celebrate with music and sweets. Berber women also use henna for protective purposes, believing it wards off the evil eye. Henna is applied during religious holidays, births, and circumcision ceremonies.',
    famousFor: 'Sharp geometric patterns inspired by Berber tribal symbols and Islamic tilework.',
  },
  {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    description:
      'Turkish henna tradition is centred around the beloved Kına Gecesi (Henna Night), a deeply emotional pre-wedding ceremony unique to Turkish culture. While Turkish henna designs tend to be simpler than their South Asian counterparts, the cultural ceremony surrounding their application is among the most elaborate in the world. Modern Turkish henna artists are now blending Ottoman-inspired florals with contemporary aesthetics.',
    styles: ['Ottoman Floral', 'Kına Gecesi Traditional', 'Turkish Contemporary', 'Tulip Motif', 'Anatolian Folk'],
    designCount: 10,
    heroImage: '/images/countries/turkey-hero.jpg',
    traditions:
      'The Kına Gecesi is held the night before the wedding, where the bride wears a velvet dress and veil while female relatives apply henna to her palms. The ceremony involves emotional songs that make the bride cry, and a gold coin is placed in the bride\'s closed, hennaed palm. It is a farewell celebration from the bride\'s family.',
    famousFor: 'The emotional Kına Gecesi ceremony and Ottoman tulip-inspired henna motifs.',
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    description:
      'Indonesian henna art reflects the rich cultural tapestry of the archipelago, blending Javanese, Balinese, and Malay influences with Islamic geometric traditions. Henna in Indonesia is closely associated with wedding rituals across various ethnic groups, particularly in Java and Sumatra. Indonesian designs often feature a harmonious mix of floral, paisley, and local batik-inspired motifs that create a uniquely Southeast Asian aesthetic.',
    styles: ['Javanese', 'Balinese', 'Malay-Indonesian', 'Batik-Inspired', 'Sumatran'],
    designCount: 10,
    heroImage: '/images/countries/indonesia-hero.jpg',
    traditions:
      'In Javanese weddings, henna is applied during the "Midodareni" ceremony the night before the wedding. Balinese Hindu traditions also incorporate henna as part of temple ceremonies and blessings. Across the Indonesian archipelago, henna is used to celebrate Maulid (Prophet\'s birthday) and Eid festivities.',
    famousFor: 'Batik-inspired henna patterns blending Javanese artistry with Islamic geometric motifs.',
  },
  {
    id: 'sudan-africa',
    name: 'Sudan & Africa',
    flag: '🇸🇩',
    description:
      'Sudanese and East African henna traditions are among the most distinctive in the world, characterised by bold, dark-black henna stains and striking graphic patterns. Sudanese brides are famous for their full-body henna application, often covering arms, legs, feet, and even the back. West African and Somali traditions also contribute rich henna customs, with geometric and tribal patterns unique to each community.',
    styles: ['Sudanese Bridal', 'Somali', 'Nigerian', 'East African Tribal', 'West African'],
    designCount: 8,
    heroImage: '/images/countries/sudan-africa-hero.jpg',
    traditions:
      'In Sudanese weddings, the "Jirtig" ceremony involves days of henna application and celebration with the bride\'s female relatives. Somali brides have henna applied during the "Shaash Saar" ceremony. Across East Africa, henna is a communal activity that strengthens bonds between women and marks important life transitions.',
    famousFor: 'Jet-black henna stains with bold geometric and tribal patterns covering large body areas.',
  },
  {
    id: 'western-fusion',
    name: 'Western & Fusion',
    flag: '🌍',
    description:
      'Western and fusion mehndi represents the modern evolution of henna art, embracing minimalist aesthetics, contemporary geometric designs, and cross-cultural blending. Popular at music festivals, bohemian gatherings, and modern weddings worldwide, this style prioritises clean lines, white-space, and often incorporates non-traditional elements like constellations, mandalas, and abstract art. It has made henna accessible to a global audience beyond traditional cultural boundaries.',
    styles: ['Minimalist', 'Geometric Modern', 'Indo-Western Fusion', 'Festival / Boho', 'Contemporary Art'],
    designCount: 10,
    heroImage: '/images/countries/western-fusion-hero.jpg',
    traditions:
      'Western henna culture has grown from music festivals like Coachella and bohemian lifestyle movements, evolving into a mainstream body-art form. Henna bars and pop-up studios are now common at weddings, corporate events, and street markets worldwide. The focus is on self-expression and personal style rather than adherence to any single cultural tradition.',
    famousFor: 'Minimalist finger designs, geometric cuffs, and festival-ready boho patterns.',
  },
];
