"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Truck, Shield, Calendar, Camera, Phone, Mail, Globe } from "lucide-react"
import type { GearItem } from "@/lib/gear-rental"
import { getProviderById } from "@/lib/gear-rental"

interface GearDetailsModalProps {
  item: GearItem | null
  isOpen: boolean
  onClose: () => void
  onBook?: (itemId: string) => void
}

export function GearDetailsModal({ item, isOpen, onClose, onBook }: GearDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!item) return null

  const provider = getProviderById(item.providerId)

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold text-2xl">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Images and Basic Info */}
          <div className="space-y-4">
            {/* Image Gallery */}
            <div className="aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-16 w-16 text-gray-400" />
                <span className="ml-2 text-gray-500">Gear Image {currentImageIndex + 1}</span>
              </div>

              {item.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {item.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-primary">{item.pricePerDay} TND</span>
                <span className="text-gray-600">per day</span>
              </div>
              <div className="text-lg text-gray-700 mb-2">{item.pricePerWeek} TND per week</div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Shield className="h-4 w-4" />
                {item.depositRequired} TND deposit required
              </div>
            </div>

            {/* Availability and Conditions */}
            <div className="flex flex-wrap gap-2">
              <Badge variant={item.availability ? "default" : "secondary"}>
                {item.availability ? "Available" : "Unavailable"}
              </Badge>
              <Badge className={getConditionColor(item.condition)}>{item.condition} condition</Badge>
              <Badge variant="outline">
                {item.minRentalDays}-{item.maxRentalDays} days rental
              </Badge>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="provider">Provider</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                <Separator />

                {/* Specifications */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Included Items */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {item.includedItems.map((includedItem, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{includedItem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Delivery Options */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Pickup & Delivery</h3>
                  {item.deliveryAvailable && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Delivery Available</span>
                      </div>
                      <p className="text-sm text-blue-700">Delivery fee: {item.deliveryFee} TND</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Pickup Locations:</h4>
                    <div className="space-y-1">
                      {item.pickupLocations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {location}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="provider" className="space-y-4">
                {provider && (
                  <>
                    {/* Provider Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {provider.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{provider.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {provider.location}
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>
                              {provider.rating} ({provider.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Provider Description */}
                    <div>
                      <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {provider.contactInfo.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {provider.contactInfo.email}
                        </div>
                        {provider.contactInfo.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            {provider.contactInfo.website}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="policies" className="space-y-4">
                {provider && (
                  <>
                    <div>
                      <h4 className="font-medium mb-2">Cancellation Policy</h4>
                      <p className="text-sm text-gray-700">{provider.policies.cancellation}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Damage Policy</h4>
                      <p className="text-sm text-gray-700">{provider.policies.damage}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Late Return Policy</h4>
                      <p className="text-sm text-gray-700">{provider.policies.lateFee}</p>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Close
          </Button>
          <Button onClick={() => onBook?.(item.id)} disabled={!item.availability} className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Book This Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
