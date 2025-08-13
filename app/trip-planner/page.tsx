"use client"

import { Navigation } from "@/components/navigation"
import { SimpleTripForm } from "@/components/trip-planner/simple-trip-form"

export default function TripPlannerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-4xl mb-4">Trip Planner</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Plan your perfect camping adventure with weather forecasts and personalized packing lists. Get everything
            you need for an unforgettable experience in Tunisia.
          </p>
        </div>

        <SimpleTripForm />
      </div>
    </main>
  )
}
