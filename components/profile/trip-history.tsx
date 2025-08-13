"use client"

import { useState } from "react"
import { Calendar, Users, Star, MapPin, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { UserTrip } from "@/lib/user-data"

interface TripHistoryProps {
  trips: UserTrip[]
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  upcoming: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
}

export function TripHistory({ trips }: TripHistoryProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all")
  const [language, setLanguage] = useState<"en" | "ar" | "fr">("en")

  const filteredTrips = filter === "all" ? trips : trips.filter((trip) => trip.status === filter)

  const getSpotName = (trip: UserTrip) => {
    switch (language) {
      case "ar":
        return trip.spotNameAr
      case "fr":
        return trip.spotNameFr
      default:
        return trip.spotName
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trip History</h2>
          <p className="text-gray-600">Your camping adventures in Tunisia</p>
        </div>

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "completed" | "upcoming")}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            <option value="all">All Trips</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{getSpotName(trip)}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{trip.groupSize} people</span>
                    </div>
                  </div>
                </div>
                <Badge className={statusColors[trip.status]}>{trip.status.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {trip.notes && <p className="text-gray-700">{trip.notes}</p>}

              {trip.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(trip.rating)}</div>
                  <span className="text-sm text-gray-600">({trip.rating}/5)</span>
                </div>
              )}

              {trip.review && <p className="text-gray-700 italic">"{trip.review}"</p>}

              {trip.photos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Camera className="h-4 w-4" />
                    <span>{trip.photos.length} photos</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {trip.photos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo || "/placeholder.svg"}
                        alt={`Trip photo ${index + 1}`}
                        className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ))}
                    {trip.photos.length > 3 && (
                      <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-600 flex-shrink-0">
                        +{trip.photos.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-600">
            {filter === "all" ? "Start planning your first camping adventure!" : `No ${filter} trips to show.`}
          </p>
          <Button className="mt-4">Plan Your First Trip</Button>
        </div>
      )}
    </div>
  )
}
