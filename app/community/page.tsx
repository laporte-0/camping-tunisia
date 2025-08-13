"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users, MessageSquare, Camera, Star, Heart, MessageCircle } from "lucide-react"

const samplePosts = [
  {
    id: "1",
    type: "discussion",
    title: "Best time to visit Sahara Desert?",
    content: "Planning my first desert camping trip. When is the ideal time to go?",
    author: "Ahmed Ben Ali",
    avatar: "/diverse-group.png",
    timestamp: "2 hours ago",
    likes: 12,
    replies: 8,
    category: "tips",
  },
  {
    id: "2",
    type: "review",
    title: "Amazing experience at Mount Chaambi",
    content: "Just returned from a 3-day camping trip. The views were incredible!",
    author: "Sarah Dubois",
    avatar: "/diverse-woman-portrait.png",
    timestamp: "1 day ago",
    rating: 5,
    likes: 24,
    replies: 15,
    image: "/mountain-camping.png",
  },
  {
    id: "3",
    type: "photo",
    title: "Sunset over the dunes",
    content: "Captured this magical moment during our desert expedition",
    author: "Mohamed Triki",
    avatar: "/thoughtful-man.png",
    timestamp: "3 days ago",
    likes: 45,
    replies: 12,
    image: "/desert-sunset.png",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = samplePosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-4xl mb-4">Community</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with fellow adventurers, share your experiences, and discover insider tips from the Tunisia camping
            community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-gray-600">Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">856</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <MessageSquare className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">342</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Camera className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">1,923</div>
              <div className="text-sm text-gray-600">Photos</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                        <Badge variant="secondary" className="text-xs">
                          {post.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.content}</p>

                      {post.image && (
                        <div className="mb-4">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            className="rounded-lg w-full max-w-md h-48 object-cover"
                          />
                        </div>
                      )}

                      {post.rating && (
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < post.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-red-500">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          {post.replies}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Desert Camping Tips</span>
                    <span className="text-gray-500">23 posts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Gear Recommendations</span>
                    <span className="text-gray-500">18 posts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Safety Guidelines</span>
                    <span className="text-gray-500">15 posts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Ahmed Ben Ali</div>
                      <div className="text-xs text-gray-500">Desert Expert</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Sarah Dubois</div>
                      <div className="text-xs text-gray-500">Mountain Guide</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
