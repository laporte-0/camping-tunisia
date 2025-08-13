"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SimpleMap } from "@/components/map/simple-map"

export default function ExplorePage() {
  const [selectedSpot, setSelectedSpot] = useState<any>(null)

  const handleSpotSelect = (spot: any) => {
    setSelectedSpot(spot)
    // Simple alert for now - can be enhanced later
    alert(`Selected: ${spot.name} - ${spot.description}`)
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-4xl mb-4">Explore Camping Spots</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover authentic camping experiences across Tunisia's diverse landscapes. From the vast Sahara desert to
            the Mediterranean coastline, find your perfect adventure.
          </p>
        </div>

        <div className="min-h-[600px]">
          <SimpleMap onSpotSelect={handleSpotSelect} />
        </div>
      </div>
    </main>
  )
}
