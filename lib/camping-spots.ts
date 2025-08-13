export interface CampingSpot {
  id: string
  name: {
    en: string
    fr: string
    ar: string
  }
  description: {
    en: string
    fr: string
    ar: string
  }
  coordinates: [number, number] // [longitude, latitude]
  category: "desert" | "mountain" | "forest" | "beach"
  difficulty: "easy" | "moderate" | "challenging"
  amenities: string[]
  images: string[]
  rating: number
  reviewCount: number
  region: string
  elevation?: number
  bestSeason: string[]
}

export const campingSpots: CampingSpot[] = [
  {
    id: "sahara-douz",
    name: {
      en: "Sahara Desert Camp - Douz",
      fr: "Camp du Désert du Sahara - Douz",
      ar: "مخيم الصحراء الكبرى - دوز",
    },
    description: {
      en: "Experience the magic of the Sahara with traditional Berber tents and camel treks. Watch stunning sunrises and sunsets over endless dunes.",
      fr: "Découvrez la magie du Sahara avec des tentes berbères traditionnelles et des randonnées à dos de chameau. Admirez les levers et couchers de soleil sur les dunes infinies.",
      ar: "اختبر سحر الصحراء الكبرى مع الخيام البربرية التقليدية ورحلات الجمال. شاهد شروق وغروب الشمس المذهل فوق الكثبان اللانهائية.",
    },
    coordinates: [9.0203, 33.4667],
    category: "desert",
    difficulty: "moderate",
    amenities: ["Traditional tents", "Camel rides", "Guided tours", "Campfire", "Local cuisine"],
    images: ["/sahara-douz-camp.png", "/sahara-sunset.jpg", "/camel-trek.jpg"],
    rating: 4.8,
    reviewCount: 127,
    region: "Kebili",
    bestSeason: ["October", "November", "December", "January", "February", "March"],
  },
  {
    id: "kroumirie-mountains",
    name: {
      en: "Kroumirie Mountains Forest Camp",
      fr: "Camp Forestier des Monts Kroumirie",
      ar: "مخيم غابات جبال الكرومير",
    },
    description: {
      en: "Nestled in Tunisia's lush northern forests, this spot offers hiking trails, wildlife watching, and cool mountain air.",
      fr: "Niché dans les forêts luxuriantes du nord de la Tunisie, cet endroit offre des sentiers de randonnée, l'observation de la faune et l'air frais de la montagne.",
      ar: "يقع في غابات تونس الخضراء الشمالية، يوفر هذا المكان مسارات المشي ومراقبة الحياة البرية والهواء الجبلي المنعش.",
    },
    coordinates: [8.75, 36.5],
    category: "forest",
    difficulty: "easy",
    amenities: ["Hiking trails", "Wildlife watching", "Fresh water", "Shade", "Cool climate"],
    images: ["/kroumirie-forest.png", "/mountain-trail.jpg", "/forest-wildlife.jpg"],
    rating: 4.6,
    reviewCount: 89,
    region: "Jendouba",
    elevation: 800,
    bestSeason: ["April", "May", "June", "September", "October"],
  },
  {
    id: "sidi-bou-said-beach",
    name: {
      en: "Mediterranean Beach Camp - Sidi Bou Said",
      fr: "Camp de Plage Méditerranéenne - Sidi Bou Saïd",
      ar: "مخيم الشاطئ المتوسطي - سيدي بو سعيد",
    },
    description: {
      en: "Coastal camping with stunning Mediterranean views, near the famous blue and white village. Perfect for water sports and beach activities.",
      fr: "Camping côtier avec des vues magnifiques sur la Méditerranée, près du célèbre village bleu et blanc. Parfait pour les sports nautiques et les activités de plage.",
      ar: "التخييم الساحلي مع إطلالات خلابة على البحر الأبيض المتوسط، بالقرب من القرية الزرقاء والبيضاء الشهيرة. مثالي للرياضات المائية وأنشطة الشاطئ.",
    },
    coordinates: [10.3467, 36.87],
    category: "beach",
    difficulty: "easy",
    amenities: ["Beach access", "Water sports", "Restaurants nearby", "Historic sites", "Swimming"],
    images: ["/sidi-bou-said-beach.png", "/mediterranean-view.jpg", "/blue-white-village.jpg"],
    rating: 4.7,
    reviewCount: 156,
    region: "Tunis",
    bestSeason: ["May", "June", "July", "August", "September"],
  },
  {
    id: "chaambi-peak",
    name: {
      en: "Mount Chaambi Peak Camp",
      fr: "Camp du Pic du Mont Chaambi",
      ar: "مخيم قمة جبل الشعانبي",
    },
    description: {
      en: "Tunisia's highest peak offers challenging hiking and spectacular panoramic views. Perfect for experienced campers seeking adventure.",
      fr: "Le plus haut sommet de Tunisie offre une randonnée difficile et des vues panoramiques spectaculaires. Parfait pour les campeurs expérimentés en quête d'aventure.",
      ar: "أعلى قمة في تونس تقدم مشي صعب ومناظر بانورامية رائعة. مثالي للمخيمين ذوي الخبرة الباحثين عن المغامرة.",
    },
    coordinates: [8.6667, 35.2],
    category: "mountain",
    difficulty: "challenging",
    amenities: ["Mountain trails", "Panoramic views", "Wildlife", "Rock climbing", "Stargazing"],
    images: ["/chaambi-peak.png", "/mountain-panorama.jpg", "/stargazing.jpg"],
    rating: 4.9,
    reviewCount: 73,
    region: "Kasserine",
    elevation: 1544,
    bestSeason: ["March", "April", "May", "September", "October", "November"],
  },
  {
    id: "tozeur-oasis",
    name: {
      en: "Tozeur Oasis Desert Camp",
      fr: "Camp Désertique de l'Oasis de Tozeur",
      ar: "مخيم واحة توزر الصحراوي",
    },
    description: {
      en: "Camp among palm groves and natural springs in this stunning desert oasis. Experience traditional Tunisian hospitality and desert culture.",
      fr: "Campez parmi les palmeraies et les sources naturelles dans cette magnifique oasis du désert. Découvrez l'hospitalité tunisienne traditionnelle et la culture du désert.",
      ar: "خيم بين بساتين النخيل والينابيع الطبيعية في هذه الواحة الصحراوية المذهلة. اختبر الضيافة التونسية التقليدية وثقافة الصحراء.",
    },
    coordinates: [8.1333, 33.9167],
    category: "desert",
    difficulty: "easy",
    amenities: ["Palm groves", "Natural springs", "Traditional architecture", "Local guides", "Desert tours"],
    images: ["/tozeur-oasis.png", "/palm-groves.jpg", "/desert-springs.jpg"],
    rating: 4.5,
    reviewCount: 94,
    region: "Tozeur",
    bestSeason: ["October", "November", "December", "January", "February", "March"],
  },
  {
    id: "hammamet-beach",
    name: {
      en: "Hammamet Beach Camping",
      fr: "Camping de la Plage d'Hammamet",
      ar: "تخييم شاطئ الحمامات",
    },
    description: {
      en: "Popular beach destination with golden sand beaches, clear waters, and vibrant nightlife. Great for families and water enthusiasts.",
      fr: "Destination balnéaire populaire avec des plages de sable doré, des eaux claires et une vie nocturne animée. Idéal pour les familles et les amateurs d'eau.",
      ar: "وجهة شاطئية شعبية مع شواطئ الرمال الذهبية والمياه الصافية والحياة الليلية النابضة بالحياة. رائع للعائلات وعشاق الماء.",
    },
    coordinates: [10.6167, 36.4],
    category: "beach",
    difficulty: "easy",
    amenities: ["Golden beaches", "Water sports", "Restaurants", "Shopping", "Entertainment"],
    images: ["/hammamet-beach.png", "/golden-sand.jpg", "/water-activities.jpg"],
    rating: 4.4,
    reviewCount: 203,
    region: "Nabeul",
    bestSeason: ["May", "June", "July", "August", "September"],
  },
]

export const getCampingSpotsByCategory = (category: CampingSpot["category"]) => {
  return campingSpots.filter((spot) => spot.category === category)
}

export const getCampingSpotById = (id: string) => {
  return campingSpots.find((spot) => spot.id === id)
}
