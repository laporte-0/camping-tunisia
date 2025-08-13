"use client"

import { useState } from "react"
import { Phone, Clock, MapPin, Shield, Heart, Flame, Mountain, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { emergencyContacts, type EmergencyContact } from "@/lib/safety-data"

const typeIcons = {
  police: Shield,
  medical: Heart,
  fire: Flame,
  rescue: Mountain,
  tourism: Users,
}

const typeColors = {
  police: "bg-blue-100 text-blue-800",
  medical: "bg-red-100 text-red-800",
  fire: "bg-orange-100 text-orange-800",
  rescue: "bg-green-100 text-green-800",
  tourism: "bg-purple-100 text-purple-800",
}

export function EmergencyContacts() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [language, setLanguage] = useState<"en" | "ar" | "fr">("en")

  const regions = ["all", ...Array.from(new Set(emergencyContacts.map((contact) => contact.region)))]

  const filteredContacts =
    selectedRegion === "all"
      ? emergencyContacts
      : emergencyContacts.filter((contact) => contact.region === selectedRegion)

  const getName = (contact: EmergencyContact) => {
    switch (language) {
      case "ar":
        return contact.nameAr
      case "fr":
        return contact.nameFr
      default:
        return contact.name
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
          <p className="text-gray-600">Important numbers for camping emergencies</p>
        </div>

        <div className="flex gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region === "all" ? "All Regions" : region}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => {
          const IconComponent = typeIcons[contact.type]
          return (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${typeColors[contact.type]}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{getName(contact)}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{contact.region}</span>
                      </div>
                    </div>
                  </div>
                  {contact.available24h && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Clock className="h-3 w-3 mr-1" />
                      24/7
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-violet-600" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-lg font-semibold text-violet-600 hover:text-violet-700"
                  >
                    {contact.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
