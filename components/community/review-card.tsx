"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ThumbsUp, Calendar, Camera } from "lucide-react"
import type { Review } from "@/lib/community"

interface ReviewCardProps {
  review: Review
  onLike?: (reviewId: string) => void
  onHelpful?: (reviewId: string) => void
}

export function ReviewCard({ review, onLike, onHelpful }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(review.isLiked || false)
  const [isHelpful, setIsHelpful] = useState(review.isHelpful || false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(review.id)
  }

  const handleHelpful = () => {
    setIsHelpful(!isHelpful)
    onHelpful?.(review.id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{review.userName}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-3 w-3" />
                Visited {formatDate(review.visitDate)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">{renderStars(review.rating)}</div>
            <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
          <p className="text-gray-700 leading-relaxed">{review.content}</p>
        </div>

        {/* Photos */}
        {review.photos.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {review.photos.slice(0, showAllPhotos ? review.photos.length : 3).map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  <Camera className="h-8 w-8 text-gray-400" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-white text-xs">Photo {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            {review.photos.length > 3 && !showAllPhotos && (
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowAllPhotos(true)}>
                <Camera className="h-4 w-4 mr-2" />
                Show {review.photos.length - 3} more photos
              </Button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${isLiked ? "text-red-600" : "text-gray-600"}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {review.likes + (isLiked && !review.isLiked ? 1 : 0)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHelpful}
              className={`flex items-center gap-2 ${isHelpful ? "text-blue-600" : "text-gray-600"}`}
            >
              <ThumbsUp className={`h-4 w-4 ${isHelpful ? "fill-current" : ""}`} />
              Helpful ({review.helpful + (isHelpful && !review.isHelpful ? 1 : 0)})
            </Button>
          </div>
          <Badge variant="outline" className="text-xs">
            Verified Visit
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
