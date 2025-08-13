"use client"

import { useState } from "react"
import { AlertTriangle, Mountain, Trees, Waves, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { safetyTips, type SafetyTip } from "@/lib/safety-data"

const categoryIcons = {
  desert: Shield,
  mountain: Mountain,
  forest: Trees,
  beach: Waves,
  general: AlertTriangle,
}

const categoryColors = {
  desert: "bg-yellow-100 text-yellow-800",
  mountain: "bg-gray-100 text-gray-800",
  forest: "bg-green-100 text-green-800",
  beach: "bg-blue-100 text-blue-800",
  general: "bg-orange-100 text-orange-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function SafetyTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [language, setLanguage] = useState<"en" | "ar" | "fr">("en")

  const categories = ["all", "general", "desert", "mountain", "forest", "beach"]

  const filteredTips =
    selectedCategory === "all" ? safetyTips : safetyTips.filter((tip) => tip.category === selectedCategory)

  const getTitle = (tip: SafetyTip) => {
    switch (language) {
      case "ar":
        return tip.titleAr
      case "fr":
        return tip.titleFr
      default:
        return tip.title
    }
  }

  const getDescription = (tip: SafetyTip) => {
    switch (language) {
      case "ar":
        return tip.descriptionAr
      case "fr":
        return tip.descriptionFr
      default:
        return tip.description
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Safety Tips</h2>
          <p className="text-gray-600">Essential safety guidelines for different environments</p>
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
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
        {filteredTips.map((tip) => {
          const IconComponent = categoryIcons[tip.category]
          return (
            <Card key={tip.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${categoryColors[tip.category]}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{getTitle(tip)}</CardTitle>
                  </div>
                  <Badge className={priorityColors[tip.priority]}>{tip.priority.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{getDescription(tip)}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
