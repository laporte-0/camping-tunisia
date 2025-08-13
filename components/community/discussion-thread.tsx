"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Eye, Send } from "lucide-react"
import type { DiscussionThread } from "@/lib/community"

interface DiscussionThreadProps {
  thread: DiscussionThread
  onLike?: (threadId: string) => void
  onReply?: (threadId: string, content: string) => void
}

export function DiscussionThreadComponent({ thread, onLike, onReply }: DiscussionThreadProps) {
  const [isLiked, setIsLiked] = useState(thread.isLiked || false)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(thread.id)
  }

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(thread.id, replyContent)
      setReplyContent("")
      setShowReplyForm(false)
      setShowReplies(true)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tips":
        return "bg-blue-100 text-blue-800"
      case "meetup":
        return "bg-green-100 text-green-800"
      case "gear":
        return "bg-purple-100 text-purple-800"
      case "safety":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
              <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{thread.author.name}</h4>
              <div className="text-sm text-gray-600">
                {formatDate(thread.createdAt)} • {thread.region}
              </div>
            </div>
          </div>
          <Badge className={getCategoryColor(thread.category)}>{thread.category}</Badge>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">{thread.title}</h3>
          <p className="text-gray-700 leading-relaxed">{thread.content}</p>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {thread.views}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {thread.replies.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${isLiked ? "text-red-600" : "text-gray-600"}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {thread.likes + (isLiked && !thread.isLiked ? 1 : 0)}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowReplyForm(!showReplyForm)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </div>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 pt-4 border-t">
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowReplyForm(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleReply} disabled={!replyContent.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Reply
              </Button>
            </div>
          </div>
        )}

        {/* Replies */}
        {thread.replies.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" size="sm" onClick={() => setShowReplies(!showReplies)} className="mb-3">
              {showReplies ? "Hide" : "Show"} {thread.replies.length} replies
            </Button>

            {showReplies && (
              <div className="space-y-4">
                {thread.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-gray-100">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                      <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{reply.author.name}</span>
                        <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                        <Heart className="h-3 w-3 mr-1" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
