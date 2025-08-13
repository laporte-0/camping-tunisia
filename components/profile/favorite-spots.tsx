"use client"

import { useState } from "react"
import { Heart, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FavoriteSpot } from "@/lib/user-data"

interface FavoriteSpotsProps {
  favorites: FavoriteSpot[]
}

const categoryColors = {
  desert: "bg-yellow-100 text-yellow-800",
  mountain: "bg-gray-100 text-gray-800",
  forest: "bg-green-100 text-green-800",
  beach: "bg-blue-100 text-blue-800",
}

export function FavoriteSpots({ favorites }: FavoriteSpotsProps) {
  const [language, setLanguage] = useState<"en" | "ar" | "fr">("en")

  const getSpotName = (spot: FavoriteSpot) => {
    switch (language) {
      case "ar":
        return spot.spotNameAr
      case "fr":
        return spot.spotNameFr
      default:
        return spot.spotName
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Favorite Spots</h2>
          <p className="text-gray-600">Your saved camping destinations</p>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "ar" | "fr")}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((spot) => (
          <Card key={spot.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={spot.image || "/placeholder.svg"}
                alt={getSpotName(spot)}
                className="h-48 w-full object-cover"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-3 right-3 h-8 w-8 rounded-full p-0 bg-white/90 hover:bg-white"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{getSpotName(spot)}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{spot.region}</span>
                  </div>
                </div>
                <Badge className={categoryColors[spot.category as keyof typeof categoryColors]}>{spot.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Added {formatDate(spot.addedDate)}</span>
                </div>
                <Button size="sm" variant="outline">
                  Plan Trip
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite spots yet</h3>
          <p className="text-gray-600">Start exploring and save your favorite camping destinations!</p>
          <Button className="mt-4">Explore Spots</Button>
        </div>
      )}
    </div>
  )
}
