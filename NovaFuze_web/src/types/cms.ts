export interface ContentBlock {
  id: string
  type: 'text' | 'richText' | 'image' | 'video' | 'button' | 'list' | 'card' | 'hero' | 'section'
  content: string | Record<string, unknown>
  metadata?: {
    className?: string
    alt?: string
    href?: string
    target?: string
  }
}

export interface PageContent {
  id: string
  slug: string
  title: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  blocks: ContentBlock[]
  published: boolean
  lastModified: Date
  lastModifiedBy: string
}

export interface ComponentContent {
  id: string
  name: string
  description?: string
  blocks: ContentBlock[]
  lastModified: Date
  lastModifiedBy: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  primaryColor: string
  secondaryColor: string
  logo?: string
  favicon?: string
  contactEmail: string
  contactPhone: string
  address: {
    street: string
    city: string
    state: string
    country: string
    pincode: string
  }
  socialLinks: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
  analytics?: {
    googleAnalyticsId?: string
    facebookPixelId?: string
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  tags: string[]
  category: string
  author: string
  published: boolean
  publishDate: Date
  lastModified: Date
  seoTitle?: string
  seoDescription?: string
  readTime?: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  currency: string
  featuredImage?: string
  gallery: string[]
  features: string[]
  category: string
  tags: string[]
  specifications: Record<string, string>
  published: boolean
  inStock: boolean
  lastModified: Date
  seoTitle?: string
  seoDescription?: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  featuredImage?: string
  gallery: string[]
  features: string[]
  benefits: string[]
  process: Array<{
    title: string
    description: string
    icon?: string
  }>
  pricing: {
    startingPrice?: number
    currency: string
    priceText?: string
  }
  category: string
  tags: string[]
  published: boolean
  lastModified: Date
  seoTitle?: string
  seoDescription?: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image?: string
  email?: string
  phone?: string
  linkedin?: string
  twitter?: string
  github?: string
  skills: string[]
  experience: string
  education: string[]
  active: boolean
  lastModified: Date
}

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  image?: string
  published: boolean
  featured: boolean
  lastModified: Date
}

export interface Portfolio {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  featuredImage?: string
  gallery: string[]
  client: string
  category: string
  tags: string[]
  technologies: string[]
  duration: string
  projectUrl?: string
  githubUrl?: string
  results: string[]
  challenges: string[]
  published: boolean
  featured: boolean
  completedDate: Date
  lastModified: Date
  seoTitle?: string
  seoDescription?: string
}

export interface VideoContent {
  id: string
  title: string
  slug: string
  description: string
  videoUrl: string
  thumbnailUrl?: string
  duration?: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
  publishDate: Date
  lastModified: Date
  seoTitle?: string
  seoDescription?: string
}

export interface CMSUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  lastLogin: Date
  createdAt: Date
}

export interface ContentHistory {
  id: string
  contentId: string
  contentType: string
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish'
  changes: Record<string, unknown>
  userId: string
  timestamp: Date
}