"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Settings, MapPin, Star, Camera, Edit } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"

const sampleTrips = [
  {
    id: "1",
    destination: "Sahara Desert",
    dates: "March 15-18, 2024",
    status: "completed",
    rating: 5,
    photos: 24,
    image: "/desert-sunset.png",
  },
  {
    id: "2",
    destination: "Mount Chaambi",
    dates: "April 5-7, 2024",
    status: "completed",
    rating: 4,
    photos: 18,
    image: "/mountain-camping.png",
  },
]

const favoriteSpots = [
  {
    id: "1",
    name: "Sahara Desert Camp",
    location: "Douz",
    rating: 4.8,
    image: "/placeholder-kxsjj.png",
  },
  {
    id: "2",
    name: "Mount Chaambi Peak",
    location: "Kasserine",
    rating: 4.7,
    image: "/placeholder-kxsjj.png",
  },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Camping Enthusiast",
    email: user?.email || "user@example.com",
    bio: "Love exploring Tunisia's beautiful landscapes",
    location: "Tunis, Tunisia",
  })

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-gray-600">You need to be signed in to view your profile.</p>
          </div>
        </div>
      </main>
    )
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <p className="text-gray-600 mb-2">{profileData.bio}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </div>
                  <div>Member since March 2024</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-gray-600">Trips</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-sm text-gray-600">Photos</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="trips" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="trips" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Trips</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {sampleTrips.map((trip) => (
                <Card key={trip.id}>
                  <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-lg">
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.destination}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{trip.destination}</h3>
                      <Badge variant={trip.status === "completed" ? "default" : "secondary"}>{trip.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{trip.dates}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < trip.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">{trip.photos} photos</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteSpots.map((spot) => (
                <Card key={spot.id}>
                  <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-lg">
                    <img
                      src={spot.image || "/placeholder.svg"}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{spot.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {spot.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{spot.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <div className="text-sm text-gray-600">{profileData.name}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div className="text-sm text-gray-600">{profileData.email}</div>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <div className="text-sm text-gray-600">{profileData.bio}</div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <div className="text-sm text-gray-600">{profileData.location}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
