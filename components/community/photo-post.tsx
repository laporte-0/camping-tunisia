"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, MapPin, Camera, Send } from "lucide-react"
import type { PhotoPost } from "@/lib/community"

interface PhotoPostProps {
  post: PhotoPost
  onLike?: (postId: string) => void
  onComment?: (postId: string, content: string) => void
}

export function PhotoPostComponent({ post, onLike, onComment }: PhotoPostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [showComments, setShowComments] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [commentContent, setCommentContent] = useState("")

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(post.id)
  }

  const handleComment = () => {
    if (commentContent.trim()) {
      onComment?.(post.id, commentContent)
      setCommentContent("")
      setShowCommentForm(false)
      setShowComments(true)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 pb-0">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
              <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">{post.userName}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-3 w-3" />
                {post.location}
                <span>•</span>
                {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {post.photos.map((photo, index) => (
            <div key={index} className="aspect-square bg-gray-200 flex items-center justify-center relative">
              <Camera className="h-12 w-12 text-gray-400" />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white font-medium">Photo {index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 mb-3">{post.caption}</p>

          {post.spotName && (
            <div className="mb-3">
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <MapPin className="h-3 w-3 mr-1" />
                {post.spotName}
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-2 ${isLiked ? "text-red-600" : "text-gray-600"}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {post.likes + (isLiked && !post.isLiked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowCommentForm(!showCommentForm)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments.length}
              </Button>
            </div>
          </div>

          {/* Comment Form */}
          {showCommentForm && (
            <div className="mt-4 pt-4 border-t">
              <Textarea
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="mb-3"
                rows={2}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowCommentForm(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleComment} disabled={!commentContent.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          )}

          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="mb-3">
                {showComments ? "Hide" : "Show"} {post.comments.length} comments
              </Button>

              {showComments && (
                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
