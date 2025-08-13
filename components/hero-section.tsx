import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/tunisian-desert-sunset-tents.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
          Discover Tunisia's Hidden Camping Gems
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Plan your next adventure with authentic experiences across Tunisia's diverse landscapes
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
            Start Planning Your Trip
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent"
          >
            Join the Community
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Interactive Maps</h3>
            <p className="text-sm text-gray-300">Discover camping spots across all regions</p>
          </div>
          <div className="text-center">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Trip Planning</h3>
            <p className="text-sm text-gray-300">Weather forecasts and packing lists</p>
          </div>
          <div className="text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-300">Connect with fellow adventurers</p>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">Safety First</h3>
            <p className="text-sm text-gray-300">Emergency contacts and regulations</p>
          </div>
        </div>
      </div>
    </section>
  )
}
