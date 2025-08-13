"use client"

import { useState } from "react"
import { Camera, MapPin, Calendar, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import type { UserProfile } from "@/lib/user-data"

interface ProfileHeaderProps {
  profile: UserProfile
  onEditProfile: () => void
}

export function ProfileHeader({ profile, onEditProfile }: ProfileHeaderProps) {
  const [language, setLanguage] = useState<"en" | "ar" | "fr">("en")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-violet-500 to-purple-600"></div>
      <CardContent className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="text-2xl">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(profile.joinedDate)}</span>
                  </div>
                </div>
                {profile.bio && <p className="mt-3 text-gray-700 max-w-2xl">{profile.bio}</p>}
              </div>

              <Button onClick={onEditProfile} className="shrink-0">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">{profile.stats.tripsCompleted}</div>
            <div className="text-sm text-gray-600">Trips Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">{profile.stats.spotsVisited}</div>
            <div className="text-sm text-gray-600">Spots Visited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">{profile.stats.reviewsWritten}</div>
            <div className="text-sm text-gray-600">Reviews Written</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">{profile.stats.photosShared}</div>
            <div className="text-sm text-gray-600">Photos Shared</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
