"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, MapPin, Truck, CreditCard } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import type { GearItem } from "@/lib/gear-rental"

interface BookingModalProps {
  item: GearItem | null
  isOpen: boolean
  onClose: () => void
  onConfirm?: (bookingData: any) => void
}

export function BookingModal({ item, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup")
  const [pickupLocation, setPickupLocation] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  if (!item) return null

  const calculateCosts = () => {
    if (!startDate || !endDate) return { days: 0, subtotal: 0, deliveryFee: 0, deposit: 0, total: 0 }

    const days = differenceInDays(endDate, startDate) + 1
    const subtotal = days >= 7 ? Math.ceil(days / 7) * item.pricePerWeek : days * item.pricePerDay
    const deliveryFee = deliveryOption === "delivery" ? item.deliveryFee || 0 : 0
    const deposit = item.depositRequired
    const total = subtotal + deliveryFee + deposit

    return { days, subtotal, deliveryFee, deposit, total }
  }

  const costs = calculateCosts()

  const handleConfirm = () => {
    if (!startDate || !endDate || !agreeToTerms) return

    const bookingData = {
      itemId: item.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      deliveryOption,
      pickupLocation: deliveryOption === "pickup" ? pickupLocation : undefined,
      deliveryAddress: deliveryOption === "delivery" ? deliveryAddress : undefined,
      notes,
      costs,
    }

    onConfirm?.(bookingData)
    onClose()
  }

  const isValidBooking =
    startDate && endDate && agreeToTerms && (deliveryOption === "pickup" ? pickupLocation : deliveryAddress)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold text-2xl">Book: {item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rental Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate || undefined}
                    onSelect={(date) => setStartDate(date || null)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate || undefined}
                    onSelect={(date) => setEndDate(date || null)}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Pickup & Delivery</Label>

            <div className="grid md:grid-cols-2 gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  deliveryOption === "pickup" ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
                onClick={() => setDeliveryOption("pickup")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Pickup</span>
                </div>
                <p className="text-sm text-gray-600">Collect from provider location</p>
                <p className="text-sm font-medium text-green-600">Free</p>
              </div>

              {item.deliveryAvailable && (
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    deliveryOption === "delivery" ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                  onClick={() => setDeliveryOption("delivery")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">Delivered to your location</p>
                  <p className="text-sm font-medium text-primary">+{item.deliveryFee} TND</p>
                </div>
              )}
            </div>

            {/* Location Selection */}
            {deliveryOption === "pickup" ? (
              <div className="space-y-2">
                <Label>Pickup Location</Label>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {item.pickupLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Delivery Address</Label>
                <Textarea
                  placeholder="Enter your full delivery address..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              placeholder="Any special requirements or questions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Cost Breakdown */}
          {costs.days > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-lg mb-3">Cost Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rental ({costs.days} days)</span>
                  <span>{costs.subtotal} TND</span>
                </div>
                {costs.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{costs.deliveryFee} TND</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span>{costs.deposit} TND</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{costs.total} TND</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                * Security deposit will be refunded after equipment return and inspection
              </p>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              I agree to the rental terms and conditions, including the damage policy and late return fees. I understand
              that the security deposit will be charged and refunded upon successful return of the equipment.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!isValidBooking} className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
