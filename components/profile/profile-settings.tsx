"use client"

import { useState } from "react"
import { Save, Bell, Shield, Globe, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { UserProfile } from "@/lib/user-data"

interface ProfileSettingsProps {
  profile: UserProfile
  onSave: (updatedProfile: Partial<UserProfile>) => void
}

export function ProfileSettings({ profile, onSave }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio || "",
    location: profile.location || "",
    language: profile.preferences.language,
    notifications: { ...profile.preferences.notifications },
    privacy: { ...profile.preferences.privacy },
  })

  const handleSave = () => {
    onSave({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      location: formData.location,
      preferences: {
        ...profile.preferences,
        language: formData.language,
        notifications: formData.notifications,
        privacy: formData.privacy,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself and your camping interests..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language Preference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value as "en" | "ar" | "fr" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="fr">Français (French)</option>
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive updates about your trips and bookings</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, email: checked },
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Get notified about weather alerts and safety updates</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, push: checked },
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="community-notifications">Community Updates</Label>
                  <p className="text-sm text-gray-600">Notifications about reviews, comments, and discussions</p>
                </div>
                <Switch
                  id="community-notifications"
                  checked={formData.notifications.community}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, community: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email">Show Email</Label>
                <p className="text-sm text-gray-600">Make your email visible to other users</p>
              </div>
              <Switch
                id="show-email"
                checked={formData.privacy.showEmail}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showEmail: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-location">Show Location</Label>
                <p className="text-sm text-gray-600">Display your location on your profile</p>
              </div>
              <Switch
                id="show-location"
                checked={formData.privacy.showLocation}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showLocation: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-trips">Show Trips</Label>
                <p className="text-sm text-gray-600">Make your trip history visible to others</p>
              </div>
              <Switch
                id="show-trips"
                checked={formData.privacy.showTrips}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showTrips: checked },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
