"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mountain, Trees, Waves, Sun } from "lucide-react"

const campingSpots = [
  {
    id: "1",
    name: "Sahara Desert Camp",
    category: "desert",
    region: "Douz",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder-lz1h5.png",
    description: "Experience the magic of the Sahara with traditional Berber camps",
  },
  {
    id: "2",
    name: "Mount Chaambi Peak",
    category: "mountain",
    region: "Kasserine",
    rating: 4.7,
    reviews: 89,
    image: "/placeholder-xpnzx.png",
    description: "Tunisia's highest peak offers stunning mountain camping",
  },
  {
    id: "3",
    name: "Kroumirie Forest",
    category: "forest",
    region: "Ain Draham",
    rating: 4.6,
    reviews: 67,
    image: "/placeholder-xrhhp.png",
    description: "Lush cork oak forests perfect for nature lovers",
  },
  {
    id: "4",
    name: "Sidi Bou Said Beach",
    category: "beach",
    region: "Tunis",
    rating: 4.5,
    reviews: 156,
    image: "/beach-camping-tunisia.png",
    description: "Coastal camping with Mediterranean views",
  },
]

const categoryIcons = {
  desert: Sun,
  mountain: Mountain,
  forest: Trees,
  beach: Waves,
}

interface SimpleMapProps {
  onSpotSelect?: (spot: any) => void
}

export function SimpleMap({ onSpotSelect }: SimpleMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredSpots =
    selectedCategory === "all" ? campingSpots : campingSpots.filter((spot) => spot.category === selectedCategory)

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6">
        <h3 className="font-serif font-bold text-xl mb-4">Camping Spots Across Tunisia</h3>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Spots
          </Button>
          <Button
            variant={selectedCategory === "desert" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("desert")}
          >
            <Sun className="h-4 w-4 mr-1" />
            Desert
          </Button>
          <Button
            variant={selectedCategory === "mountain" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("mountain")}
          >
            <Mountain className="h-4 w-4 mr-1" />
            Mountain
          </Button>
          <Button
            variant={selectedCategory === "forest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("forest")}
          >
            <Trees className="h-4 w-4 mr-1" />
            Forest
          </Button>
          <Button
            variant={selectedCategory === "beach" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("beach")}
          >
            <Waves className="h-4 w-4 mr-1" />
            Beach
          </Button>
        </div>
      </div>

      {/* Spots Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredSpots.map((spot) => {
          const IconComponent = categoryIcons[spot.category as keyof typeof categoryIcons]
          return (
            <div
              key={spot.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSpotSelect?.(spot)}
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{spot.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {spot.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {spot.region}
                    </div>
                    <div>
                      ★ {spot.rating} ({spot.reviews})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
