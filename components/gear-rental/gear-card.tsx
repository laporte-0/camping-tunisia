"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Truck, Calendar, Shield, Camera } from "lucide-react"
import type { GearItem } from "@/lib/gear-rental"

interface GearCardProps {
  item: GearItem
  onBook?: (itemId: string) => void
  onViewDetails?: (itemId: string) => void
}

export function GearCard({ item, onBook, onViewDetails }: GearCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tents":
        return "⛺"
      case "sleeping":
        return "🛏️"
      case "cooking":
        return "🍳"
      case "hiking":
        return "🎒"
      case "safety":
        return "🦺"
      case "electronics":
        return "🔋"
      default:
        return "🏕️"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {/* Image Gallery */}
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Gear Image</span>
          </div>

          {/* Image Navigation Dots */}
          {item.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={item.availability ? "default" : "secondary"}>
            {item.availability ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Category Icon */}
        <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md">
          <span className="text-lg">{getCategoryIcon(item.category)}</span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>

          {/* Provider Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-3 w-3" />
            <span>{item.providerName}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{item.providerRating}</span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            <Badge className={getConditionColor(item.condition)} variant="secondary">
              {item.condition}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Min {item.minRentalDays} days
            </Badge>
            {item.deliveryAvailable && (
              <Badge variant="outline" className="text-xs">
                <Truck className="h-3 w-3 mr-1" />
                Delivery
              </Badge>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="text-xs text-gray-600">
            {Object.entries(item.specifications)
              .slice(0, 2)
              .map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <span>{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{item.pricePerDay} TND</span>
            <span className="text-sm text-gray-600">per day</span>
          </div>
          <div className="text-sm text-gray-600">{item.pricePerWeek} TND per week</div>
          <div className="text-xs text-gray-500 mt-1">
            <Shield className="h-3 w-3 inline mr-1" />
            {item.depositRequired} TND deposit required
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={() => onViewDetails?.(item.id)}
          >
            View Details
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onBook?.(item.id)} disabled={!item.availability}>
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
