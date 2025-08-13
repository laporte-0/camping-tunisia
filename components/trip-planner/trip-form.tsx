"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Users, Clock } from "lucide-react"
import { format } from "date-fns"
import { campingSpots, type CampingSpot } from "@/lib/camping-spots"

export interface TripPlan {
  destination: CampingSpot | null
  startDate: Date | null
  endDate: Date | null
  groupSize: number
  tripName: string
  notes: string
}

interface TripFormProps {
  onSubmit: (tripPlan: TripPlan) => void
  isLoading?: boolean
}

export function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [tripPlan, setTripPlan] = useState<TripPlan>({
    destination: null,
    startDate: null,
    endDate: null,
    groupSize: 1,
    tripName: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tripPlan.destination && tripPlan.startDate && tripPlan.endDate) {
      onSubmit(tripPlan)
    }
  }

  const handleDestinationChange = (spotId: string) => {
    const spot = campingSpots.find((s) => s.id === spotId)
    setTripPlan((prev) => ({ ...prev, destination: spot || null }))
  }

  const getDuration = () => {
    if (tripPlan.startDate && tripPlan.endDate) {
      const diffTime = Math.abs(tripPlan.endDate.getTime() - tripPlan.startDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-bold text-2xl">Plan Your Trip</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Name */}
          <div className="space-y-2">
            <Label htmlFor="trip-name">Trip Name</Label>
            <Input
              id="trip-name"
              placeholder="My Tunisia Adventure"
              value={tripPlan.tripName}
              onChange={(e) => setTripPlan((prev) => ({ ...prev, tripName: e.target.value }))}
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label>Destination</Label>
            <Select onValueChange={handleDestinationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a camping spot">
                  {tripPlan.destination && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {tripPlan.destination.name.en}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {campingSpots.map((spot) => (
                  <SelectItem key={spot.id} value={spot.id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{spot.name.en}</div>
                        <div className="text-sm text-gray-500">
                          {spot.region} • {spot.category}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tripPlan.startDate ? format(tripPlan.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tripPlan.startDate || undefined}
                    onSelect={(date) => setTripPlan((prev) => ({ ...prev, startDate: date || null }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tripPlan.endDate ? format(tripPlan.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tripPlan.endDate || undefined}
                    onSelect={(date) => setTripPlan((prev) => ({ ...prev, endDate: date || null }))}
                    disabled={(date) => date < (tripPlan.startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Group Size and Duration Display */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group-size">Group Size</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <Input
                  id="group-size"
                  type="number"
                  min="1"
                  max="20"
                  value={tripPlan.groupSize}
                  onChange={(e) =>
                    setTripPlan((prev) => ({ ...prev, groupSize: Number.parseInt(e.target.value) || 1 }))
                  }
                />
              </div>
            </div>

            {getDuration() > 0 && (
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{getDuration()} days</span>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Special requirements, dietary restrictions, etc."
              value={tripPlan.notes}
              onChange={(e) => setTripPlan((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!tripPlan.destination || !tripPlan.startDate || !tripPlan.endDate || isLoading}
          >
            {isLoading ? "Creating Trip Plan..." : "Create Trip Plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
