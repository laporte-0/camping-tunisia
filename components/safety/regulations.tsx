"use client"

import { useState } from "react"
import { FileText, AlertCircle, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { regulations, ecoTips } from "@/lib/safety-data"

export function Regulations() {
  const [language, setLanguage] = useState<"en" | "ar" | "fr">("en")

  const getTitle = (item: any) => {
    switch (language) {
      case "ar":
        return item.titleAr
      case "fr":
        return item.titleFr
      default:
        return item.title
    }
  }

  const getDescription = (item: any) => {
    switch (language) {
      case "ar":
        return item.descriptionAr
      case "fr":
        return item.descriptionFr
      default:
        return item.description
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Camping Regulations</h2>
          <p className="text-gray-600">Important rules and eco-friendly guidelines</p>
        </div>

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

      {/* Regulations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Legal Requirements</h3>
        <div className="grid grid-cols-1 gap-4">
          {regulations.map((regulation) => (
            <Card key={regulation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                      <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{getTitle(regulation)}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {regulation.permitRequired && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Permit Required
                      </Badge>
                    )}
                    {regulation.fine && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Fine: {regulation.fine}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{getDescription(regulation)}</p>
                {regulation.region && <p className="text-sm text-gray-500 mt-2">Applies to: {regulation.region}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Eco-Friendly Tips */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Eco-Friendly Camping</h3>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Help preserve Tunisia's natural beauty for future generations by following these eco-friendly practices.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecoTips.map((tip) => (
            <Card key={tip.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">{getTitle(tip)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{getDescription(tip)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
