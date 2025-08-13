export interface PackingItem {
  name: string
  category: "clothing" | "gear" | "food" | "safety" | "personal"
  essential: boolean
  weatherDependent?: boolean
  seasonDependent?: boolean
}

export interface PackingList {
  region: string
  category: "desert" | "mountain" | "forest" | "beach"
  items: PackingItem[]
}

export const packingLists: PackingList[] = [
  {
    region: "Desert",
    category: "desert",
    items: [
      // Clothing
      { name: "Lightweight long-sleeve shirts", category: "clothing", essential: true, weatherDependent: true },
      { name: "Long pants (lightweight)", category: "clothing", essential: true },
      { name: "Wide-brimmed hat", category: "clothing", essential: true },
      { name: "Sunglasses", category: "clothing", essential: true },
      { name: "Warm jacket for nights", category: "clothing", essential: true, weatherDependent: true },
      { name: "Comfortable hiking boots", category: "clothing", essential: true },
      { name: "Moisture-wicking underwear", category: "clothing", essential: true },

      // Gear
      { name: "High SPF sunscreen", category: "gear", essential: true },
      { name: "Extra water containers", category: "gear", essential: true },
      { name: "Headlamp with extra batteries", category: "gear", essential: true },
      { name: "Sleeping bag (temperature rated)", category: "gear", essential: true, weatherDependent: true },
      { name: "Tent with sand stakes", category: "gear", essential: true },
      { name: "Portable shade/tarp", category: "gear", essential: false },

      // Safety
      { name: "First aid kit", category: "safety", essential: true },
      { name: "GPS device or compass", category: "safety", essential: true },
      { name: "Emergency whistle", category: "safety", essential: true },
      { name: "Water purification tablets", category: "safety", essential: false },

      // Personal
      { name: "Lip balm with SPF", category: "personal", essential: true },
      { name: "Moisturizer", category: "personal", essential: true },
      { name: "Personal medications", category: "personal", essential: true },
    ],
  },
  {
    region: "Mountain",
    category: "mountain",
    items: [
      // Clothing
      { name: "Layered clothing system", category: "clothing", essential: true, weatherDependent: true },
      { name: "Waterproof jacket", category: "clothing", essential: true, weatherDependent: true },
      { name: "Insulated jacket", category: "clothing", essential: true, seasonDependent: true },
      { name: "Hiking boots with ankle support", category: "clothing", essential: true },
      { name: "Warm hat and gloves", category: "clothing", essential: true, seasonDependent: true },
      { name: "Moisture-wicking base layers", category: "clothing", essential: true },

      // Gear
      { name: "Four-season tent", category: "gear", essential: true, seasonDependent: true },
      { name: "Sleeping bag (cold rated)", category: "gear", essential: true, weatherDependent: true },
      { name: "Trekking poles", category: "gear", essential: false },
      { name: "Headlamp with extra batteries", category: "gear", essential: true },
      { name: "Portable stove and fuel", category: "gear", essential: true },

      // Safety
      { name: "First aid kit", category: "safety", essential: true },
      { name: "Emergency shelter", category: "safety", essential: false },
      { name: "Avalanche safety gear", category: "safety", essential: false, seasonDependent: true },

      // Personal
      { name: "Sunscreen", category: "personal", essential: true },
      { name: "Personal medications", category: "personal", essential: true },
    ],
  },
  {
    region: "Forest",
    category: "forest",
    items: [
      // Clothing
      { name: "Long pants and long sleeves", category: "clothing", essential: true },
      { name: "Rain gear", category: "clothing", essential: true, weatherDependent: true },
      { name: "Hiking boots", category: "clothing", essential: true },
      { name: "Hat", category: "clothing", essential: false },

      // Gear
      { name: "Insect repellent", category: "gear", essential: true },
      { name: "Three-season tent", category: "gear", essential: true },
      { name: "Sleeping bag", category: "gear", essential: true },
      { name: "Water filter", category: "gear", essential: false },
      { name: "Rope/paracord", category: "gear", essential: false },

      // Safety
      { name: "First aid kit", category: "safety", essential: true },
      { name: "Emergency whistle", category: "safety", essential: true },
      { name: "Bear spray (if applicable)", category: "safety", essential: false },

      // Personal
      { name: "Personal medications", category: "personal", essential: true },
      { name: "Biodegradable soap", category: "personal", essential: false },
    ],
  },
  {
    region: "Beach/Coastal",
    category: "beach",
    items: [
      // Clothing
      { name: "Swimwear", category: "clothing", essential: true },
      { name: "Quick-dry shorts and shirts", category: "clothing", essential: true },
      { name: "Sun hat", category: "clothing", essential: true },
      { name: "Sandals and water shoes", category: "clothing", essential: true },
      { name: "Light jacket for evenings", category: "clothing", essential: false, weatherDependent: true },

      // Gear
      { name: "High SPF sunscreen", category: "gear", essential: true },
      { name: "Beach tent or umbrella", category: "gear", essential: false },
      { name: "Waterproof bags", category: "gear", essential: true },
      { name: "Snorkeling gear", category: "gear", essential: false },

      // Safety
      { name: "First aid kit", category: "safety", essential: true },
      { name: "Emergency whistle", category: "safety", essential: true },

      // Personal
      { name: "After-sun lotion", category: "personal", essential: true },
      { name: "Personal medications", category: "personal", essential: true },
    ],
  },
]

export const getPackingListByCategory = (category: "desert" | "mountain" | "forest" | "beach") => {
  return packingLists.find((list) => list.category === category)
}

export const getCustomPackingList = (categories: string[], weather: any) => {
  const allItems: PackingItem[] = []

  categories.forEach((category) => {
    const list = getPackingListByCategory(category as any)
    if (list) {
      allItems.push(...list.items)
    }
  })

  // Remove duplicates and filter based on weather if needed
  const uniqueItems = allItems.filter((item, index, self) => index === self.findIndex((i) => i.name === item.name))

  return uniqueItems
}
