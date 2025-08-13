export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  joinedDate: string
  preferences: {
    language: "en" | "ar" | "fr"
    notifications: {
      email: boolean
      push: boolean
      community: boolean
    }
    privacy: {
      showEmail: boolean
      showLocation: boolean
      showTrips: boolean
    }
  }
  stats: {
    tripsCompleted: number
    spotsVisited: number
    reviewsWritten: number
    photosShared: number
  }
}

export interface UserTrip {
  id: string
  spotId: string
  spotName: string
  spotNameAr: string
  spotNameFr: string
  startDate: string
  endDate: string
  status: "completed" | "upcoming" | "cancelled"
  groupSize: number
  notes?: string
  photos: string[]
  rating?: number
  review?: string
}

export interface FavoriteSpot {
  id: string
  spotId: string
  spotName: string
  spotNameAr: string
  spotNameFr: string
  category: string
  region: string
  image: string
  addedDate: string
}

// Mock user data
export const mockUserProfile: UserProfile = {
  id: "1",
  name: "Ahmed Ben Salem",
  email: "ahmed@example.com",
  avatar: "/diverse-profile-avatars.png",
  bio: "Passionate about exploring Tunisia's natural beauty. Desert camping enthusiast and nature photographer.",
  location: "Tunis, Tunisia",
  joinedDate: "2023-06-15",
  preferences: {
    language: "en",
    notifications: {
      email: true,
      push: true,
      community: false,
    },
    privacy: {
      showEmail: false,
      showLocation: true,
      showTrips: true,
    },
  },
  stats: {
    tripsCompleted: 12,
    spotsVisited: 8,
    reviewsWritten: 15,
    photosShared: 47,
  },
}

export const mockUserTrips: UserTrip[] = [
  {
    id: "1",
    spotId: "1",
    spotName: "Sahara Desert Camp - Douz",
    spotNameAr: "مخيم الصحراء - دوز",
    spotNameFr: "Camp du Sahara - Douz",
    startDate: "2024-03-15",
    endDate: "2024-03-18",
    status: "completed",
    groupSize: 4,
    notes: "Amazing stargazing experience. Camel trekking was unforgettable!",
    photos: ["/sahara-douz-camp.png", "/desert-sunset.png"],
    rating: 5,
    review: "Absolutely magical experience in the Sahara. The silence and vastness of the desert is humbling.",
  },
  {
    id: "2",
    spotId: "4",
    spotName: "Chaambi Peak Base Camp",
    spotNameAr: "معسكر قاعدة جبل الشعانبي",
    spotNameFr: "Camp de base du Djebel Chambi",
    startDate: "2024-05-20",
    endDate: "2024-05-22",
    status: "completed",
    groupSize: 2,
    notes: "Challenging hike but worth it for the sunrise views.",
    photos: ["/chaambi-peak.png"],
    rating: 4,
  },
  {
    id: "3",
    spotId: "2",
    spotName: "Kroumirie Forest Retreat",
    spotNameAr: "خلوة غابة الكروميرية",
    spotNameFr: "Retraite forêt Kroumirie",
    startDate: "2024-08-10",
    endDate: "2024-08-12",
    status: "upcoming",
    groupSize: 6,
    notes: "Planning a family camping trip with kids.",
    photos: [],
  },
]

export const mockFavoriteSpots: FavoriteSpot[] = [
  {
    id: "1",
    spotId: "1",
    spotName: "Sahara Desert Camp - Douz",
    spotNameAr: "مخيم الصحراء - دوز",
    spotNameFr: "Camp du Sahara - Douz",
    category: "desert",
    region: "Kebili",
    image: "/sahara-douz-camp.png",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    spotId: "3",
    spotName: "Sidi Bou Said Coastal Camp",
    spotNameAr: "مخيم ساحل سيدي بو سعيد",
    spotNameFr: "Camp côtier Sidi Bou Said",
    category: "beach",
    region: "Tunis",
    image: "/sidi-bou-said-beach.png",
    addedDate: "2024-02-20",
  },
  {
    id: "3",
    spotId: "2",
    spotName: "Kroumirie Forest Retreat",
    spotNameAr: "خلوة غابة الكروميرية",
    spotNameFr: "Retraite forêt Kroumirie",
    category: "forest",
    region: "Jendouba",
    image: "/kroumirie-forest.png",
    addedDate: "2024-03-10",
  },
]
