"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Calendar, Users, Camera } from "lucide-react"
import type { CampingSpot } from "@/lib/camping-spots"

interface SpotDetailsModalProps {
  spot: CampingSpot | null
  isOpen: boolean
  onClose: () => void
  language?: "en" | "fr" | "ar"
}

export function SpotDetailsModal({ spot, isOpen, onClose, language = "en" }: SpotDetailsModalProps) {
  if (!spot) return null

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold text-2xl">{spot.name[language]}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spot.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500 text-sm">Image {index + 1}</span>
              </div>
            ))}
          </div>

          {/* Rating and Basic Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{spot.rating}</span>
                <span className="text-gray-500">({spot.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {spot.category}
              </Badge>
              <Badge className={getDifficultyColor(spot.difficulty)}>{spot.difficulty}</Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{spot.description[language]}</p>
          </div>

          <Separator />

          {/* Location Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Region:</span>
                  <span className="font-medium">{spot.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coordinates:</span>
                  <span className="font-medium">
                    {spot.coordinates[1].toFixed(4)}, {spot.coordinates[0].toFixed(4)}
                  </span>
                </div>
                {spot.elevation && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Elevation:</span>
                    <span className="font-medium">{spot.elevation}m</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Best Season
              </h3>
              <div className="flex flex-wrap gap-2">
                {spot.bestSeason.map((season) => (
                  <Badge key={season} variant="outline">
                    {season}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Amenities & Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {spot.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              View Reviews
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Plan Trip
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
