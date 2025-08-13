"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Sun, Cloud, CloudRain } from "lucide-react"

const destinations = [
  { id: "sahara", name: "Sahara Desert", weather: "sunny" },
  { id: "chaambi", name: "Mount Chaambi", weather: "cool" },
  { id: "kroumirie", name: "Kroumirie Forest", weather: "mild" },
  { id: "coast", name: "Mediterranean Coast", weather: "breezy" },
]

const weatherIcons = {
  sunny: Sun,
  cool: Cloud,
  mild: CloudRain,
  breezy: Sun,
}

export function SimpleTripForm() {
  const [tripData, setTripData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    groupSize: "1",
    notes: "",
  })
  const [showPlan, setShowPlan] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPlan(true)
  }

  const selectedDestination = destinations.find((d) => d.id === tripData.destination)
  const WeatherIcon = selectedDestination ? weatherIcons[selectedDestination.weather as keyof typeof weatherIcons] : Sun

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Plan Your Trip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Select
                value={tripData.destination}
                onValueChange={(value) => setTripData({ ...tripData, destination: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>
                      {dest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={tripData.startDate}
                  onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={tripData.endDate}
                  onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="groupSize">Group Size</Label>
              <Select
                value={tripData.groupSize}
                onValueChange={(value) => setTripData({ ...tripData, groupSize: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size === 1 ? "person" : "people"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or preferences..."
                value={tripData.notes}
                onChange={(e) => setTripData({ ...tripData, notes: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Trip Plan
            </Button>
          </form>
        </CardContent>
      </Card>

      {showPlan && selectedDestination && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WeatherIcon className="h-5 w-5" />
                Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold">Today</div>
                  <Sun className="h-6 w-6 mx-auto my-2 text-yellow-500" />
                  <div>25°C</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold">Tomorrow</div>
                  <Cloud className="h-6 w-6 mx-auto my-2 text-gray-500" />
                  <div>22°C</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold">Day 3</div>
                  <Sun className="h-6 w-6 mx-auto my-2 text-yellow-500" />
                  <div>27°C</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Packing List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Essential Items</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Tent and sleeping bag</li>
                    <li>• Water bottles (3L per person)</li>
                    <li>• First aid kit</li>
                    <li>• Flashlight and batteries</li>
                    <li>• Sunscreen and hat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Clothing</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Lightweight hiking boots</li>
                    <li>• Breathable clothing</li>
                    <li>• Warm layer for evenings</li>
                    <li>• Rain jacket</li>
                    <li>• Extra socks and underwear</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
