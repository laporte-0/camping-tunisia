import { Navigation } from "@/components/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Phone, AlertTriangle, FileText } from "lucide-react"

const emergencyContacts = [
  { service: "Police", number: "197", description: "General police emergency" },
  { service: "Medical Emergency", number: "190", description: "Ambulance and medical assistance" },
  { service: "Fire Department", number: "198", description: "Fire and rescue services" },
  { service: "Tourist Police", number: "71 341 077", description: "Tourist assistance in Tunis" },
]

const safetyTips = [
  {
    category: "Desert Camping",
    icon: "🏜️",
    tips: [
      "Bring at least 4L of water per person per day",
      "Inform someone of your planned route and return time",
      "Camp away from flash flood areas (wadis)",
      "Use GPS devices as backup navigation",
      "Protect yourself from sandstorms",
    ],
  },
  {
    category: "Mountain Camping",
    icon: "⛰️",
    tips: [
      "Check weather conditions before departure",
      "Bring warm clothing for temperature drops",
      "Use proper hiking boots and equipment",
      "Be aware of altitude sickness symptoms",
      "Stay on marked trails",
    ],
  },
  {
    category: "Beach Camping",
    icon: "🏖️",
    tips: [
      "Check tide schedules and camp above high tide line",
      "Protect gear from sand and salt water",
      "Be aware of strong currents when swimming",
      "Use reef-safe sunscreen",
      "Respect marine protected areas",
    ],
  },
]

const regulations = [
  {
    title: "Camping Permits",
    icon: FileText,
    content: "Required for camping in national parks and protected areas. Obtain permits from local authorities.",
    fine: "50-200 TND",
  },
  {
    title: "Fire Restrictions",
    icon: AlertTriangle,
    content: "Open fires prohibited in many areas during dry season (June-September). Use designated fire pits only.",
    fine: "100-500 TND",
  },
  {
    title: "Waste Management",
    icon: Shield,
    content: "Pack out all trash. Littering in natural areas is strictly prohibited.",
    fine: "20-100 TND",
  },
]

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="font-serif font-black text-4xl text-gray-900">Safety Information</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety is our priority. Find emergency contacts, essential safety tips, and important regulations for
            camping safely in Tunisia.
          </p>
        </div>

        {/* Safety Tabs */}
        <Tabs defaultValue="emergency" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Safety Tips
            </TabsTrigger>
            <TabsTrigger value="regulations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Regulations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-red-100 text-red-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{contact.service}</h3>
                        <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {safetyTips.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regulations" className="space-y-8">
            <div className="space-y-6">
              {regulations.map((regulation, index) => {
                const IconComponent = regulation.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{regulation.title}</h3>
                            <Badge variant="destructive">Fine: {regulation.fine}</Badge>
                          </div>
                          <p className="text-gray-600">{regulation.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Emergency Banner */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Emergency Numbers</h3>
              <p className="text-red-700">
                Police: <strong>197</strong> | Medical: <strong>190</strong> | Fire: <strong>198</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
