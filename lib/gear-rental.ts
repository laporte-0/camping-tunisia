export interface GearItem {
  id: string
  name: string
  description: string
  category: "tents" | "sleeping" | "cooking" | "hiking" | "safety" | "electronics"
  images: string[]
  pricePerDay: number
  pricePerWeek: number
  availability: boolean
  providerId: string
  providerName: string
  providerLocation: string
  providerRating: number
  condition: "excellent" | "good" | "fair"
  specifications: Record<string, string>
  includedItems: string[]
  depositRequired: number
  minRentalDays: number
  maxRentalDays: number
  deliveryAvailable: boolean
  deliveryFee?: number
  pickupLocations: string[]
}

export interface GearProvider {
  id: string
  name: string
  description: string
  location: string
  city: string
  region: string
  rating: number
  reviewCount: number
  avatar: string
  coverImage: string
  established: string
  specialties: string[]
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  policies: {
    cancellation: string
    damage: string
    lateFee: string
  }
  verified: boolean
}

export interface RentalBooking {
  id: string
  gearItemId: string
  userId: string
  startDate: string
  endDate: string
  totalDays: number
  totalCost: number
  depositPaid: number
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled"
  deliveryAddress?: string
  pickupLocation?: string
  notes: string
  createdAt: string
}

// Mock data for gear providers
export const mockProviders: GearProvider[] = [
  {
    id: "provider-1",
    name: "Desert Adventures Gear",
    description:
      "Specialized in desert camping equipment with over 10 years of experience. We provide high-quality gear perfect for Sahara expeditions.",
    location: "Douz, Kebili",
    city: "Douz",
    region: "Kebili",
    rating: 4.8,
    reviewCount: 127,
    avatar: "/provider-desert-adventures.jpg",
    coverImage: "/provider-desert-cover.jpg",
    established: "2014",
    specialties: ["Desert Camping", "Camel Trekking", "Traditional Tents"],
    contactInfo: {
      phone: "+216 75 123 456",
      email: "info@desertadventures.tn",
      website: "www.desertadventures.tn",
    },
    policies: {
      cancellation: "Free cancellation up to 48 hours before rental",
      damage: "Damage assessment fee applies for equipment damage",
      lateFee: "10 TND per day for late returns",
    },
    verified: true,
  },
  {
    id: "provider-2",
    name: "Mountain Gear Tunisia",
    description:
      "Your trusted partner for mountain and forest camping adventures. Quality equipment for all skill levels.",
    location: "Ain Draham, Jendouba",
    city: "Ain Draham",
    region: "Jendouba",
    rating: 4.6,
    reviewCount: 89,
    avatar: "/provider-mountain-gear.jpg",
    coverImage: "/provider-mountain-cover.jpg",
    established: "2016",
    specialties: ["Mountain Camping", "Hiking Gear", "Cold Weather Equipment"],
    contactInfo: {
      phone: "+216 78 987 654",
      email: "contact@mountaingear.tn",
    },
    policies: {
      cancellation: "24 hours notice required for cancellation",
      damage: "Full replacement cost for damaged items",
      lateFee: "15 TND per day for late returns",
    },
    verified: true,
  },
  {
    id: "provider-3",
    name: "Coastal Camping Co.",
    description:
      "Beach and coastal camping specialists. Perfect gear for Mediterranean adventures along Tunisia's beautiful coastline.",
    location: "Hammamet, Nabeul",
    city: "Hammamet",
    region: "Nabeul",
    rating: 4.7,
    reviewCount: 156,
    avatar: "/provider-coastal-camping.jpg",
    coverImage: "/provider-coastal-cover.jpg",
    established: "2018",
    specialties: ["Beach Camping", "Water Sports", "Family Gear"],
    contactInfo: {
      phone: "+216 72 456 789",
      email: "hello@coastalcamping.tn",
      website: "www.coastalcamping.tn",
    },
    policies: {
      cancellation: "Free cancellation up to 24 hours before rental",
      damage: "Damage deposit refunded after inspection",
      lateFee: "8 TND per day for late returns",
    },
    verified: true,
  },
]

// Mock data for gear items
export const mockGearItems: GearItem[] = [
  {
    id: "gear-1",
    name: "Traditional Berber Tent (4-Person)",
    description:
      "Authentic Berber-style tent perfect for desert camping. Made with traditional materials and designed to withstand desert conditions.",
    category: "tents",
    images: ["/gear-berber-tent-1.jpg", "/gear-berber-tent-2.jpg"],
    pricePerDay: 45,
    pricePerWeek: 280,
    availability: true,
    providerId: "provider-1",
    providerName: "Desert Adventures Gear",
    providerLocation: "Douz, Kebili",
    providerRating: 4.8,
    condition: "excellent",
    specifications: {
      Capacity: "4 people",
      Material: "Traditional wool and cotton",
      Weight: "8 kg",
      "Setup Time": "15 minutes",
    },
    includedItems: ["Tent", "Ground tarp", "Setup instructions", "Repair kit"],
    depositRequired: 200,
    minRentalDays: 2,
    maxRentalDays: 14,
    deliveryAvailable: true,
    deliveryFee: 25,
    pickupLocations: ["Douz Center", "Tozeur Airport"],
  },
  {
    id: "gear-2",
    name: "4-Season Mountain Tent",
    description:
      "Professional-grade 4-season tent suitable for mountain camping in all weather conditions. Waterproof and wind-resistant.",
    category: "tents",
    images: ["/gear-mountain-tent-1.jpg", "/gear-mountain-tent-2.jpg"],
    pricePerDay: 35,
    pricePerWeek: 210,
    availability: true,
    providerId: "provider-2",
    providerName: "Mountain Gear Tunisia",
    providerLocation: "Ain Draham, Jendouba",
    providerRating: 4.6,
    condition: "excellent",
    specifications: {
      Capacity: "2 people",
      Material: "Ripstop nylon with PU coating",
      Weight: "3.2 kg",
      "Waterproof Rating": "3000mm",
    },
    includedItems: ["Tent", "Footprint", "Guy lines", "Stakes", "Stuff sack"],
    depositRequired: 150,
    minRentalDays: 1,
    maxRentalDays: 21,
    deliveryAvailable: true,
    deliveryFee: 30,
    pickupLocations: ["Ain Draham", "Tabarka", "Jendouba"],
  },
  {
    id: "gear-3",
    name: "Beach Camping Shelter",
    description:
      "Lightweight beach shelter with UV protection. Perfect for coastal camping with easy setup and sand-resistant design.",
    category: "tents",
    images: ["/gear-beach-shelter-1.jpg", "/gear-beach-shelter-2.jpg"],
    pricePerDay: 25,
    pricePerWeek: 150,
    availability: true,
    providerId: "provider-3",
    providerName: "Coastal Camping Co.",
    providerLocation: "Hammamet, Nabeul",
    providerRating: 4.7,
    condition: "good",
    specifications: {
      Capacity: "3 people",
      Material: "UV-resistant polyester",
      Weight: "2.1 kg",
      "UV Protection": "UPF 50+",
    },
    includedItems: ["Shelter", "Sand stakes", "Guy lines", "Carry bag"],
    depositRequired: 100,
    minRentalDays: 1,
    maxRentalDays: 10,
    deliveryAvailable: true,
    deliveryFee: 20,
    pickupLocations: ["Hammamet", "Nabeul", "Sousse"],
  },
  {
    id: "gear-4",
    name: "Desert Sleeping System",
    description:
      "Complete sleeping system designed for desert conditions. Includes sleeping bag rated for desert nights and insulated pad.",
    category: "sleeping",
    images: ["/gear-desert-sleeping-1.jpg", "/gear-desert-sleeping-2.jpg"],
    pricePerDay: 20,
    pricePerWeek: 120,
    availability: true,
    providerId: "provider-1",
    providerName: "Desert Adventures Gear",
    providerLocation: "Douz, Kebili",
    providerRating: 4.8,
    condition: "excellent",
    specifications: {
      "Temperature Rating": "5°C to 25°C",
      Material: "Down fill with cotton liner",
      Weight: "1.8 kg",
      "Packed Size": "35cm x 20cm",
    },
    includedItems: ["Sleeping bag", "Insulated pad", "Pillow", "Stuff sack"],
    depositRequired: 80,
    minRentalDays: 2,
    maxRentalDays: 14,
    deliveryAvailable: true,
    deliveryFee: 15,
    pickupLocations: ["Douz Center", "Tozeur Airport"],
  },
  {
    id: "gear-5",
    name: "Portable Camping Kitchen",
    description:
      "Complete cooking setup for group camping. Includes gas stove, cookware, and utensils for up to 6 people.",
    category: "cooking",
    images: ["/gear-camping-kitchen-1.jpg", "/gear-camping-kitchen-2.jpg"],
    pricePerDay: 30,
    pricePerWeek: 180,
    availability: true,
    providerId: "provider-2",
    providerName: "Mountain Gear Tunisia",
    providerLocation: "Ain Draham, Jendouba",
    providerRating: 4.6,
    condition: "good",
    specifications: {
      "Stove Type": "2-burner gas stove",
      Fuel: "Butane/Propane mix",
      Cookware: "Aluminum non-stick",
      Serves: "Up to 6 people",
    },
    includedItems: ["Gas stove", "2 pots", "1 pan", "Plates", "Cups", "Utensils", "Gas canister"],
    depositRequired: 120,
    minRentalDays: 1,
    maxRentalDays: 14,
    deliveryAvailable: true,
    deliveryFee: 25,
    pickupLocations: ["Ain Draham", "Tabarka", "Jendouba"],
  },
  {
    id: "gear-6",
    name: "Professional Hiking Backpack",
    description:
      "65L hiking backpack with advanced suspension system. Perfect for multi-day camping trips with excellent weight distribution.",
    category: "hiking",
    images: ["/gear-hiking-backpack-1.jpg", "/gear-hiking-backpack-2.jpg"],
    pricePerDay: 15,
    pricePerWeek: 90,
    availability: true,
    providerId: "provider-2",
    providerName: "Mountain Gear Tunisia",
    providerLocation: "Ain Draham, Jendouba",
    providerRating: 4.6,
    condition: "excellent",
    specifications: {
      Capacity: "65 liters",
      Material: "Ripstop nylon",
      Weight: "2.3 kg",
      Frame: "Internal aluminum frame",
    },
    includedItems: ["Backpack", "Rain cover", "Hydration reservoir", "Compression straps"],
    depositRequired: 60,
    minRentalDays: 1,
    maxRentalDays: 21,
    deliveryAvailable: true,
    deliveryFee: 20,
    pickupLocations: ["Ain Draham", "Tabarka", "Jendouba"],
  },
]

export const getGearByCategory = (category: string) => {
  return mockGearItems.filter((item) => item.category === category)
}

export const getGearByProvider = (providerId: string) => {
  return mockGearItems.filter((item) => item.providerId === providerId)
}

export const getProviderById = (providerId: string) => {
  return mockProviders.find((provider) => provider.id === providerId)
}

export const searchGear = (query: string, filters: any = {}) => {
  let results = mockGearItems

  if (query) {
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  if (filters.category && filters.category !== "all") {
    results = results.filter((item) => item.category === filters.category)
  }

  if (filters.region && filters.region !== "all") {
    results = results.filter((item) => {
      const provider = getProviderById(item.providerId)
      return provider?.region === filters.region
    })
  }

  if (filters.maxPrice) {
    results = results.filter((item) => item.pricePerDay <= filters.maxPrice)
  }

  return results
}
