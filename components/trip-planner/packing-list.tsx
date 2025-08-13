"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Download, CheckCircle } from "lucide-react"
import { getPackingListByCategory, type PackingItem } from "@/lib/packing-lists"
import type { CampingSpot } from "@/lib/camping-spots"
import type { WeatherForecast } from "@/lib/weather"

interface PackingListProps {
  destination: CampingSpot | null
  weather: WeatherForecast | null
  groupSize: number
}

export function PackingList({ destination, weather, groupSize }: PackingListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [packingItems, setPackingItems] = useState<PackingItem[]>([])

  useEffect(() => {
    if (destination) {
      const list = getPackingListByCategory(destination.category)
      if (list) {
        const items = [...list.items]

        // Filter items based on weather conditions
        if (weather) {
          const maxTemp = Math.max(...weather.forecast.map((d) => d.temperature.max))
          const minTemp = Math.min(...weather.forecast.map((d) => d.temperature.min))
          const hasRain = weather.forecast.some((d) => d.precipitation > 0)

          // Add weather-specific items
          if (maxTemp > 35) {
            items.push({
              name: "Extra water bottles",
              category: "gear",
              essential: true,
              weatherDependent: true,
            })
          }

          if (minTemp < 10) {
            items.push({
              name: "Extra warm layers",
              category: "clothing",
              essential: true,
              weatherDependent: true,
            })
          }

          if (hasRain) {
            items.push({
              name: "Waterproof bags",
              category: "gear",
              essential: true,
              weatherDependent: true,
            })
          }
        }

        setPackingItems(items)
      }
    }
  }, [destination, weather])

  const handleItemCheck = (itemName: string) => {
    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(itemName)) {
      newCheckedItems.delete(itemName)
    } else {
      newCheckedItems.add(itemName)
    }
    setCheckedItems(newCheckedItems)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "clothing":
        return "👕"
      case "gear":
        return "🎒"
      case "food":
        return "🍽️"
      case "safety":
        return "🚨"
      case "personal":
        return "🧴"
      default:
        return "📦"
    }
  }

  const groupedItems = packingItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, PackingItem[]>,
  )

  const completionRate = packingItems.length > 0 ? Math.round((checkedItems.size / packingItems.length) * 100) : 0

  if (!destination) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-xl flex items-center gap-2">
            <Package className="h-5 w-5" />
            Packing List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Select a destination to generate your packing list</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-bold text-xl flex items-center gap-2">
          <Package className="h-5 w-5" />
          Packing List
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            For {destination.name.en} • {groupSize} {groupSize === 1 ? "person" : "people"}
          </p>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">
              {checkedItems.size}/{packingItems.length} packed
            </div>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 capitalize">
              <span className="text-xl">{getCategoryIcon(category)}</span>
              {category}
            </h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={`${category}-${index}`}
                    checked={checkedItems.has(item.name)}
                    onCheckedChange={() => handleItemCheck(item.name)}
                  />
                  <label
                    htmlFor={`${category}-${index}`}
                    className={`flex-1 text-sm cursor-pointer ${
                      checkedItems.has(item.name) ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.name}
                    {groupSize > 1 && <span className="text-gray-400 ml-1">(×{groupSize})</span>}
                  </label>
                  <div className="flex gap-1">
                    {item.essential && (
                      <Badge variant="destructive" className="text-xs">
                        Essential
                      </Badge>
                    )}
                    {item.weatherDependent && (
                      <Badge variant="outline" className="text-xs">
                        Weather
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {category !== Object.keys(groupedItems)[Object.keys(groupedItems).length - 1] && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}

        {completionRate === 100 && (
          <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">All packed! You're ready to go!</span>
          </div>
        )}

        <Button variant="outline" className="w-full bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export Packing List
        </Button>
      </CardContent>
    </Card>
  )
}
