"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Shield, Tent, Backpack, Utensils } from "lucide-react"

const sampleGearItems = [
  {
    id: "1",
    name: "Desert Camping Tent",
    category: "tents",
    price: 25,
    rating: 4.8,
    reviews: 42,
    provider: "Sahara Adventures",
    location: "Douz",
    image: "/camping-tent.png",
    description: "4-person tent perfect for desert camping with sand-resistant design",
  },
  {
    id: "2",
    name: "Mountain Sleeping Bag",
    category: "sleeping",
    price: 15,
    rating: 4.7,
    reviews: 38,
    provider: "Atlas Gear",
    location: "Kasserine",
    image: "/cozy-sleeping-bag.png",
    description: "Warm sleeping bag rated for mountain temperatures",
  },
  {
    id: "3",
    name: "Portable Camping Stove",
    category: "cooking",
    price: 12,
    rating: 4.6,
    reviews: 29,
    provider: "Camp Tunisia",
    location: "Tunis",
    image: "/camping-stove.png",
    description: "Lightweight gas stove perfect for outdoor cooking",
  },
]

const categories = [
  { value: "all", label: "All Categories", icon: null },
  { value: "tents", label: "Tents & Shelters", icon: Tent },
  { value: "sleeping", label: "Sleeping Gear", icon: null },
  { value: "cooking", label: "Cooking Equipment", icon: Utensils },
  { value: "hiking", label: "Hiking & Backpacks", icon: Backpack },
]

export default function GearRentalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredGear = sampleGearItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-4xl mb-4">Gear Rental</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Rent high-quality camping equipment from trusted Tunisian providers. From desert tents to mountain gear,
            find everything you need for your adventure.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="font-semibold">Verified Providers</div>
              <div className="text-sm text-gray-600">All providers are verified and insured</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="font-semibold">Quality Guaranteed</div>
              <div className="text-sm text-gray-600">High-quality, well-maintained equipment</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">Local Expertise</div>
              <div className="text-sm text-gray-600">Local providers with regional knowledge</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search gear..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{filteredGear.length} items available</h2>
        </div>

        {/* Gear Grid */}
        {filteredGear.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGear.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {item.rating} ({item.reviews})
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">{item.price} TND</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <Button size="sm" onClick={() => alert(`Booking request for ${item.name}`)}>
                      Book Now
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">by {item.provider}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏕️</div>
            <h3 className="text-lg font-semibold mb-2">No gear found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </main>
  )
}
