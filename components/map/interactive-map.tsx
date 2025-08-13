"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Mountain, Trees, Waves, Sun, Filter } from "lucide-react"
import { campingSpots, type CampingSpot } from "@/lib/camping-spots"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface InteractiveMapProps {
  selectedSpot?: string
  onSpotSelect?: (spot: CampingSpot) => void
}

export function InteractiveMap({ selectedSpot, onSpotSelect }: InteractiveMapProps) {
  const [filteredSpots, setFilteredSpots] = useState<CampingSpot[]>(campingSpots)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en")
  const mapRef = useRef<HTMLDivElement>(null)

  const categoryIcons = {
    desert: Sun,
    mountain: Mountain,
    forest: Trees,
    beach: Waves,
  }

  const categoryColors = {
    desert: "bg-orange-500",
    mountain: "bg-gray-600",
    forest: "bg-green-600",
    beach: "bg-blue-500",
  }

  const filterSpots = (category: string) => {
    setActiveFilter(category)
    if (category === "all") {
      setFilteredSpots(campingSpots)
    } else {
      setFilteredSpots(campingSpots.filter((spot) => spot.category === category))
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "challenging":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full h-full">
      {/* Filter Controls */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter by Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => filterSpots("all")}>All Categories</DropdownMenuItem>
            <DropdownMenuItem onClick={() => filterSpots("desert")}>
              <Sun className="h-4 w-4 mr-2" />
              Desert
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => filterSpots("mountain")}>
              <Mountain className="h-4 w-4 mr-2" />
              Mountain
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => filterSpots("forest")}>
              <Trees className="h-4 w-4 mr-2" />
              Forest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => filterSpots("beach")}>
              <Waves className="h-4 w-4 mr-2" />
              Beach
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-2">
          <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
            EN
          </Button>
          <Button variant={language === "fr" ? "default" : "outline"} size="sm" onClick={() => setLanguage("fr")}>
            FR
          </Button>
          <Button variant={language === "ar" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ar")}>
            AR
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 h-full">
        {/* Map Placeholder - In a real app, this would be Mapbox */}
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-96 lg:h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden"
          >
            {/* Tunisia Map Outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-gray-300 font-bold">Tunisia Map</div>
            </div>

            {/* Camping Spot Markers */}
            {filteredSpots.map((spot, index) => {
              const IconComponent = categoryIcons[spot.category]
              const isSelected = selectedSpot === spot.id

              return (
                <div
                  key={spot.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                    isSelected ? "scale-125 z-10" : ""
                  }`}
                  style={{
                    left: `${20 + (index % 3) * 25}%`,
                    top: `${25 + Math.floor(index / 3) * 20}%`,
                  }}
                  onClick={() => onSpotSelect?.(spot)}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${categoryColors[spot.category]} flex items-center justify-center shadow-lg ${
                      isSelected ? "ring-4 ring-primary ring-opacity-50" : ""
                    }`}
                  >
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                    {spot.name[language]}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Spots List */}
        <div className="space-y-4 max-h-96 lg:max-h-full overflow-y-auto">
          <h3 className="font-serif font-bold text-xl mb-4">Camping Spots ({filteredSpots.length})</h3>

          {filteredSpots.map((spot) => (
            <Card
              key={spot.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedSpot === spot.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onSpotSelect?.(spot)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = categoryIcons[spot.category]
                      return <IconComponent className="h-5 w-5 text-primary" />
                    })()}
                    <h4 className="font-semibold text-lg">{spot.name[language]}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{spot.rating}</span>
                    <span className="text-sm text-gray-500">({spot.reviewCount})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{spot.description[language]}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="capitalize">
                    {spot.category}
                  </Badge>
                  <Badge className={getDifficultyColor(spot.difficulty)}>{spot.difficulty}</Badge>
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    {spot.region}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                  {spot.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {spot.amenities.length > 3 && (
                    <span className="bg-gray-100 px-2 py-1 rounded">+{spot.amenities.length - 3} more</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
