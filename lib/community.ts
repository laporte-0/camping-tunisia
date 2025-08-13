export interface Review {
  id: string
  spotId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  title: string
  content: string
  photos: string[]
  visitDate: string
  createdAt: string
  likes: number
  isLiked?: boolean
  helpful: number
  isHelpful?: boolean
}

export interface DiscussionThread {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  region: string
  category: "general" | "tips" | "meetup" | "gear" | "safety"
  createdAt: string
  replies: Reply[]
  views: number
  likes: number
  isLiked?: boolean
}

export interface Reply {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
  isLiked?: boolean
}

export interface PhotoPost {
  id: string
  userId: string
  userName: string
  userAvatar: string
  spotId?: string
  spotName?: string
  photos: string[]
  caption: string
  location: string
  createdAt: string
  likes: number
  isLiked?: boolean
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
}

// Mock data for reviews
export const mockReviews: Review[] = [
  {
    id: "review-1",
    spotId: "sahara-douz",
    userId: "user-1",
    userName: "Ahmed Ben Ali",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    rating: 5,
    title: "Unforgettable Sahara Experience",
    content:
      "This was absolutely magical! The sunset over the dunes was breathtaking. Our guide was knowledgeable and the traditional Berber tent was comfortable. The camel trek at sunrise was the highlight of our trip. Highly recommend staying for at least 2 nights to fully experience the desert.",
    photos: ["/review-sahara-1.jpg", "/review-sahara-2.jpg"],
    visitDate: "2024-01-15",
    createdAt: "2024-01-20",
    likes: 23,
    helpful: 18,
  },
  {
    id: "review-2",
    spotId: "kroumirie-mountains",
    userId: "user-2",
    userName: "Sarah Dubois",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 4,
    title: "Perfect for Nature Lovers",
    content:
      "Beautiful forest setting with great hiking trails. The wildlife watching opportunities were excellent - we saw wild boar and various bird species. The only downside was that it got quite cold at night, so bring warm clothing even in summer.",
    photos: ["/review-forest-1.jpg"],
    visitDate: "2024-02-10",
    createdAt: "2024-02-12",
    likes: 15,
    helpful: 12,
  },
  {
    id: "review-3",
    spotId: "sidi-bou-said-beach",
    userId: "user-3",
    userName: "Marco Rossi",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marco",
    rating: 4,
    title: "Great Beach Camping",
    content:
      "Lovely coastal location with easy access to the famous blue and white village. The beach is clean and perfect for swimming. Can get crowded during peak season, but the location makes up for it. Great restaurants nearby.",
    photos: ["/review-beach-1.jpg", "/review-beach-2.jpg", "/review-beach-3.jpg"],
    visitDate: "2024-01-28",
    createdAt: "2024-01-30",
    likes: 19,
    helpful: 14,
  },
]

// Mock data for discussion threads
export const mockDiscussions: DiscussionThread[] = [
  {
    id: "thread-1",
    title: "Best time to visit Sahara Desert?",
    content:
      "Planning my first desert camping trip. What months would you recommend for the best weather and experience?",
    author: {
      id: "user-4",
      name: "Lisa Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
    region: "Sahara",
    category: "tips",
    createdAt: "2024-02-01",
    views: 156,
    likes: 8,
    replies: [
      {
        id: "reply-1",
        content:
          "I'd recommend October to March. The temperatures are much more comfortable during these months, especially for sleeping outdoors.",
        author: {
          id: "user-5",
          name: "Karim Mansouri",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
        },
        createdAt: "2024-02-01",
        likes: 5,
      },
      {
        id: "reply-2",
        content:
          "Agree with Karim! I went in December and it was perfect. Days were warm but not too hot, and nights were cool but not freezing.",
        author: {
          id: "user-6",
          name: "Emma Thompson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
        },
        createdAt: "2024-02-02",
        likes: 3,
      },
    ],
  },
  {
    id: "thread-2",
    title: "Camping meetup in Kroumirie Mountains - March 15-17",
    content:
      "Organizing a group camping trip to the Kroumirie Mountains. Looking for 4-6 people to join. We'll be hiking, wildlife watching, and enjoying the forest. All skill levels welcome!",
    author: {
      id: "user-7",
      name: "Youssef Trabelsi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=youssef",
    },
    region: "North",
    category: "meetup",
    createdAt: "2024-02-05",
    views: 89,
    likes: 12,
    replies: [
      {
        id: "reply-3",
        content: "I'm interested! What gear should I bring?",
        author: {
          id: "user-8",
          name: "Fatima Zahra",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
        },
        createdAt: "2024-02-05",
        likes: 2,
      },
    ],
  },
]

// Mock data for photo posts
export const mockPhotoPosts: PhotoPost[] = [
  {
    id: "photo-1",
    userId: "user-9",
    userName: "David Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    spotId: "chaambi-peak",
    spotName: "Mount Chaambi Peak Camp",
    photos: ["/photo-post-1.jpg", "/photo-post-2.jpg"],
    caption:
      "Incredible sunrise from Tunisia's highest peak! The hike was challenging but so worth it. The view of the entire country from up here is breathtaking. 🏔️ #CampingTunisia #MountChaambi",
    location: "Mount Chaambi, Kasserine",
    createdAt: "2024-02-08",
    likes: 34,
    comments: [
      {
        id: "comment-1",
        content: "Wow! This looks amazing. How difficult was the hike?",
        author: {
          id: "user-10",
          name: "Amina Khelifi",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amina",
        },
        createdAt: "2024-02-08",
      },
    ],
  },
  {
    id: "photo-2",
    userId: "user-11",
    userName: "Nadia Bouaziz",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nadia",
    spotId: "tozeur-oasis",
    spotName: "Tozeur Oasis Desert Camp",
    photos: ["/photo-post-3.jpg"],
    caption:
      "Peaceful morning in the oasis. The palm trees and natural springs create such a serene atmosphere. Perfect place to disconnect and recharge.",
    location: "Tozeur Oasis",
    createdAt: "2024-02-10",
    likes: 28,
    comments: [],
  },
]

export const getReviewsBySpotId = (spotId: string) => {
  return mockReviews.filter((review) => review.spotId === spotId)
}

export const getDiscussionsByRegion = (region: string) => {
  return mockDiscussions.filter((discussion) => discussion.region === region)
}

export const getDiscussionsByCategory = (category: string) => {
  return mockDiscussions.filter((discussion) => discussion.category === category)
}
