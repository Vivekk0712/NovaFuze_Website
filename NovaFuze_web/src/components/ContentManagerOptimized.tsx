import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react"
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { db, initializeFirebaseIfNeeded, shouldEnableFirebase } from '../firebase/config'
import { useAuth } from '../hooks/useAuth'
import { useNetworkStatus } from '../hooks/useNetworkStatus'

// Define the modular structure for all website content
export interface WebsiteContent {
  // Header & Navigation
  header: {
    logoUrl?: string
    companyName?: string
    tagline?: string
    navigationLinks?: string // JSON string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    // Backward compatibility
    logo?: { text: string; bgGradient: string }
    navigation?: Array<{ id: string; name: string; href: string; order: number }>
    buttons?: {
      contact: { text: string; href: string }
      cta: { text: string; href: string; bgColor: string; hoverColor: string }
    }
  }
  
  // Hero Section
  hero: {
    title?: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    secondaryCtaText?: string
    secondaryCtaUrl?: string
    secondaryCtaEnabled?: boolean
    enabled?: boolean
    // Backward compatibility
    badge?: { text: string; bgColor: string }
    headline?: string
    subheadline?: string
    buttons?: {
      primary: { text: string; href: string; bgColor: string; hoverColor: string }
      secondary: { text: string; href: string }
    }
    stats?: Array<{ id: string; number: string; label: string; order: number }>
  }
  
  // About Section
  about: {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    stats?: string // JSON string
    enabled?: boolean
  }
  
  // Services Section
  services: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    enabled?: boolean
    // Keep existing items structure for compatibility
    items?: Array<{
      id: string
      title: string
      description: string
      icon: string
      features: string[]
      price: string
      popular: boolean
      order: number
    }>
  }
  
  // Products Section
  products: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    enabled?: boolean
    // Keep existing items structure for compatibility
    items?: Array<{
      id: string
      title: string
      description: string
      price: string
      category: string
      features: string[]
      image: string
      popular: boolean
      order: number
    }>
  }
  
  // Portfolio Section
  portfolio: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    enabled?: boolean
    // Keep existing items structure for compatibility
    items?: Array<{
      id: string
      title: string
      description: string
      category: string
      image: string
      technologies: string[]
      client: string
      year: string
      featured: boolean
      order: number
    }>
  }
  
  // Team Section
  team: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    enabled?: boolean
  }
  
  // Blog Section
  blog: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    enabled?: boolean
    // Keep existing items structure for compatibility
    items?: Array<{
      id: string
      title: string
      excerpt: string
      content: string
      author: string
      date: string
      readTime: string
      category: string
      tags: string[]
      image: string
      featured: boolean
      published: boolean
      order: number
    }>
  }
  
  // Testimonials Section
  testimonials: {
    title?: string
    subtitle?: string
    description?: string
    enabled?: boolean
    // Keep existing items structure for compatibility
    items?: Array<{
      id: string
      name: string
      position: string
      company: string
      content: string
      rating: number
      image: string
      featured: boolean
      order: number
    }>
  }
  
  // Contact Section
  contact: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    ctaEnabled?: boolean
    enabled?: boolean
  }
  
  // Footer Content
  footer: {
    companyDescription?: string
    copyright?: string
    socialLinks?: string // JSON string
    quickLinks?: string // JSON string
    contactInfo?: string // JSON string
    // Keep existing structure for compatibility
    company?: {
      name: string
      description: string
      logo: { text: string; bgGradient: string }
    }
    links?: {
      services: Array<{ id: string; name: string; href: string; order: number }>
      products: Array<{ id: string; name: string; href: string; order: number }>
      company: Array<{ id: string; name: string; href: string; order: number }>
      legal: Array<{ id: string; name: string; href: string; order: number }>
    }
    social?: Array<{
      id: string
      platform: string
      url: string
      icon: string
      order: number
    }>
    tagline?: string
  }
  
  // Allow other sections as needed
  [key: string]: any
}

// Essential default content - modular structure with all sections
const getMinimalDefaultContent = (): WebsiteContent => ({
  header: {
    companyName: "NovaFuze",
    tagline: "Building Tomorrow's Digital Experiences",
    logoUrl: "",
    navigationLinks: JSON.stringify([
      { id: "1", name: "Services", href: "/services", order: 1 },
      { id: "2", name: "Products", href: "/products", order: 2 },
      { id: "3", name: "Portfolio", href: "/portfolio", order: 3 },
      { id: "4", name: "Blog", href: "/blog", order: 4 },
      { id: "5", name: "About", href: "/about", order: 5 },
      { id: "6", name: "Contact", href: "/contact", order: 6 }
    ]),
    ctaText: "Get Started",
    ctaUrl: "/contact",
    ctaEnabled: true,
    // Backward compatibility for existing components
    logo: { text: "NovaFuze", bgGradient: "from-[#4E6BDF] to-[#333FC2]" },
    navigation: [
      { id: "1", name: "Services", href: "/services", order: 1 },
      { id: "2", name: "Products", href: "/products", order: 2 },
      { id: "3", name: "Portfolio", href: "/portfolio", order: 3 },
      { id: "4", name: "Blog", href: "/blog", order: 4 },
      { id: "5", name: "About", href: "/about", order: 5 },
      { id: "6", name: "Contact", href: "/contact", order: 6 }
    ],
    buttons: {
      contact: { text: "Contact Us", href: "/contact" },
      cta: { text: "Get Started", href: "/contact", bgColor: "#4E6BDF", hoverColor: "#3D51D3" }
    }
  },
  
  hero: {
    title: "Building Tomorrow's Digital Experiences Today",
    subtitle: "with NovaFuze",
    description: "We create cutting-edge web applications, mobile solutions, and AI-powered platforms that transform your business ideas into scalable digital realities.",
    ctaText: "Start Your Project",
    ctaUrl: "/contact",
    ctaEnabled: true,
    secondaryCtaText: "View Our Work",
    secondaryCtaUrl: "/portfolio",
    secondaryCtaEnabled: true,
    enabled: true,
    // Backward compatibility for existing components
    badge: { text: "🚀 AI-Powered Development", bgColor: "bg-[#F1F4FD]" },
    headline: "Building Tomorrow's Digital Experiences Today",
    subheadline: "with NovaFuze",
    buttons: {
      primary: { text: "Start Your Project", href: "/contact", bgColor: "#4E6BDF", hoverColor: "#3D51D3" },
      secondary: { text: "View Our Work", href: "/portfolio" }
    },
    stats: [
      { id: "1", number: "500+", label: "Projects Delivered", order: 1 },
      { id: "2", number: "50+", label: "Happy Clients", order: 2 },
      { id: "3", number: "99%", label: "Client Satisfaction", order: 3 },
      { id: "4", number: "24/7", label: "Support Available", order: 4 }
    ]
  },
  
  about: {
    title: "About NovaFuze",
    subtitle: "Innovation Meets Excellence",
    description: "We are a team of passionate developers and designers committed to transforming your digital vision into reality. With years of experience and cutting-edge technology, we deliver solutions that drive business growth.",
    stats: JSON.stringify([
      { id: "1", value: "500+", label: "Projects Delivered", description: "Successfully completed projects" },
      { id: "2", value: "50+", label: "Happy Clients", description: "Satisfied customers worldwide" },
      { id: "3", value: "99%", label: "Client Satisfaction", description: "Customer satisfaction rate" },
      { id: "4", value: "24/7", label: "Support", description: "Round the clock support" }
    ]),
    enabled: true
  },
  
  services: {
    title: "Our Services",
    subtitle: "Comprehensive Digital Solutions",
    description: "From concept to deployment, we offer end-to-end technology services that drive business growth and innovation.",
    ctaText: "View All Services",
    ctaUrl: "/services",
    ctaEnabled: true,
    enabled: true,
    items: [
      {
        id: "1",
        title: "Web Development",
        description: "Custom web applications built with modern frameworks and best practices.",
        icon: "Code",
        features: ["React/Next.js", "Node.js APIs", "Database Design", "Cloud Deployment"],
        price: "Starting from ₹25,000",
        popular: true,
        order: 1
      }
    ]
  },
  
  products: {
    title: "Our Products",
    subtitle: "Ready-to-Use Solutions",
    description: "Powerful software products designed to accelerate your business operations and enhance productivity.",
    ctaText: "Explore Products",
    ctaUrl: "/products",
    ctaEnabled: true,
    enabled: true,
    items: [
      {
        id: "1",
        title: "NovaForms",
        description: "Advanced form builder with AI-powered analytics and automation.",
        price: "₹999/month",
        category: "SaaS",
        features: ["Drag & Drop Builder", "AI Analytics", "Webhook Integration", "Custom Themes"],
        image: "",
        popular: true,
        order: 1
      }
    ]
  },
  
  portfolio: {
    title: "Our Portfolio",
    subtitle: "Featured Projects",
    description: "Discover our latest work and success stories across various industries and technologies.",
    ctaText: "View Full Portfolio",
    ctaUrl: "/portfolio",
    ctaEnabled: true,
    enabled: true,
    items: [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "Modern online marketplace with advanced features and AI recommendations.",
        category: "Web Development",
        image: "",
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
        client: "RetailCorp",
        year: "2024",
        featured: true,
        order: 1
      }
    ]
  },
  
  team: {
    title: "Our Team",
    subtitle: "Meet the Experts",
    description: "Our diverse team of talented professionals brings together creativity, technical expertise, and innovation to deliver exceptional results.",
    ctaText: "Join Our Team",
    ctaUrl: "/careers",
    ctaEnabled: true,
    enabled: true
  },
  
  blog: {
    title: "Latest Insights",
    subtitle: "Our Blog",
    description: "Stay updated with the latest trends, technologies, and insights from our team of experts.",
    ctaText: "Read All Posts",
    ctaUrl: "/blog",
    ctaEnabled: true,
    enabled: true,
    items: [
      {
        id: "1",
        title: "AI in Web Development: 2025 Trends",
        excerpt: "Explore how artificial intelligence is revolutionizing web development and what to expect in 2025.",
        content: "Full blog content here...",
        author: "Priya Sharma",
        date: "2025-01-15",
        readTime: "5 min read",
        category: "Technology",
        tags: ["AI", "Web Development", "Trends"],
        image: "",
        featured: true,
        published: true,
        order: 1
      }
    ]
  },
  
  testimonials: {
    title: "Client Testimonials",
    subtitle: "What Our Clients Say",
    description: "Don't just take our word for it - hear from our satisfied clients about their experience working with NovaFuze.",
    enabled: true,
    items: [
      {
        id: "1",
        name: "Amit Patel",
        position: "CEO",
        company: "TechStart Solutions",
        content: "NovaFuze transformed our business with their innovative web application. The team's expertise and dedication exceeded our expectations.",
        rating: 5,
        image: "",
        featured: true,
        order: 1
      }
    ]
  },
  
  contact: {
    title: "Get In Touch",
    subtitle: "Ready to Start Your Project?",
    description: "Have a project in mind? We'd love to hear from you. Let's discuss how we can bring your vision to life.",
    ctaText: "Contact Us Now",
    ctaUrl: "/contact",
    ctaEnabled: true,
    enabled: true
  },
  
  footer: {
    companyDescription: "Building modern digital experiences with AI-powered solutions. We transform ideas into scalable, innovative technology solutions that drive business growth.",
    copyright: "© 2025 NovaFuze. All rights reserved.",
    socialLinks: JSON.stringify([
      { id: "1", platform: "LinkedIn", url: "https://linkedin.com/company/novafuze", icon: "Linkedin", order: 1 },
      { id: "2", platform: "GitHub", url: "https://github.com/novafuze", icon: "Github", order: 2 },
      { id: "3", platform: "Twitter", url: "https://twitter.com/novafuze", icon: "Twitter", order: 3 },
      { id: "4", platform: "Instagram", url: "https://instagram.com/novafuze", icon: "Instagram", order: 4 }
    ]),
    quickLinks: JSON.stringify([
      { id: "1", name: "About Us", href: "/about", order: 1 },
      { id: "2", name: "Services", href: "/services", order: 2 },
      { id: "3", name: "Portfolio", href: "/portfolio", order: 3 },
      { id: "4", name: "Blog", href: "/blog", order: 4 },
      { id: "5", name: "Contact", href: "/contact", order: 5 },
      { id: "6", name: "Careers", href: "/careers", order: 6 }
    ]),
    contactInfo: JSON.stringify({
      address: "#52, 1st main, 1st cross, prasanth layout, Whitefield, Bangalore, 560066",
      phone: "+91-8074678571",
      email: "support@novafuze.in"
    }),
    // Keep legacy structure for backward compatibility
    company: {
      name: "NovaFuze",
      description: "Building modern digital experiences with AI-powered solutions.",
      logo: { text: "N", bgGradient: "from-[#4E6BDF] to-[#333FC2]" }
    },
    links: {
      services: [
        { id: "1", name: "Web Development", href: "/services/web-development", order: 1 },
        { id: "2", name: "Application Development", href: "/services", order: 2 },
        { id: "3", name: "AI Solutions", href: "/services", order: 3 },
        { id: "4", name: "Consulting", href: "/services", order: 4 }
      ],
      products: [
        { id: "1", name: "NovaForms", href: "/products", order: 1 },
        { id: "2", name: "AI Assistant Pro", href: "/products", order: 2 },
        { id: "3", name: "CloudSync Manager", href: "/products", order: 3 }
      ],
      company: [
        { id: "1", name: "About Us", href: "/about", order: 1 },
        { id: "2", name: "Portfolio", href: "/portfolio", order: 2 },
        { id: "3", name: "Blog", href: "/blog", order: 3 },
        { id: "4", name: "Careers", href: "/careers", order: 4 },
        { id: "5", name: "Contact", href: "/contact", order: 5 }
      ],
      legal: [
        { id: "1", name: "Privacy Policy", href: "/legal/privacy", order: 1 },
        { id: "2", name: "Terms of Service", href: "/legal/terms", order: 2 },
        { id: "3", name: "Refund Policy", href: "/legal/refund", order: 3 }
      ]
    },
    social: [
      { id: "1", platform: "LinkedIn", url: "https://linkedin.com/company/novafuze", icon: "Linkedin", order: 1 },
      { id: "2", platform: "GitHub", url: "https://github.com/novafuze", icon: "Github", order: 2 },
      { id: "3", platform: "Twitter", url: "https://twitter.com/novafuze", icon: "Twitter", order: 3 },
      { id: "4", platform: "Instagram", url: "https://instagram.com/novafuze", icon: "Instagram", order: 4 }
    ],
    tagline: "Made with ❤️ in India"
  }
})

// Content context
interface ContentContextType {
  content: WebsiteContent
  isLoading: boolean
  loadError: string | null
  updateContent: (newContent: Partial<WebsiteContent> | WebsiteContent) => Promise<void>
  updateSection: (section: keyof WebsiteContent, data: any) => Promise<void>
  updateNestedContent: (path: string, data: any) => Promise<void>
  resetContent: () => Promise<void>
  saveContent: () => Promise<void>
  loadContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextType | null>(null)

// Content provider component
interface ContentProviderProps {
  children: ReactNode
}

export function ContentProvider({ children }: ContentProviderProps) {
  const { user } = useAuth()
  const { isOnline } = useNetworkStatus()
  const [content, setContent] = useState<WebsiteContent>(() => getMinimalDefaultContent())
  const [isLoading, setIsLoading] = useState(false) // Start with false to prevent render blocking
  const [loadError, setLoadError] = useState<string | null>(null)

  // Firebase document reference (only if Firebase should be enabled)
  const getContentDocRef = useCallback(() => {
    if (!shouldEnableFirebase()) return null;
    // Only initialize if user is authenticated (admin)
    if (!user) return null;
    initializeFirebaseIfNeeded();
    return db ? doc(db, 'website', 'content') : null;
  }, [user])

  // Load content from Firebase or localStorage (optimized for performance)
  const loadContent = useCallback(async () => {
    try {
      setLoadError(null)
      
      // If Firebase is disabled, use localStorage only (fast path)
      const contentDocRef = getContentDocRef();
      if (!contentDocRef) {
        try {
          const cachedContent = localStorage.getItem('novafuze_content_cache')
          if (cachedContent) {
            const parsedContent = JSON.parse(cachedContent)
            const mergedContent = { ...getMinimalDefaultContent(), ...parsedContent }
            setContent(mergedContent)
          } else {
            setContent(getMinimalDefaultContent())
          }
        } catch (e) {
          console.warn('Failed to load from localStorage:', e)
          setContent(getMinimalDefaultContent())
        }
        return
      }
      
      // Firebase path with shorter timeout to avoid blocking
      try {
        const docSnap = await Promise.race([
          getDoc(contentDocRef),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase request timeout')), 5000) // Reduced timeout
          )
        ]) as any
        
        if (docSnap?.exists()) {
          const firestoreContent = docSnap.data() as WebsiteContent
          const mergedContent = { ...getMinimalDefaultContent(), ...firestoreContent }
          setContent(mergedContent)
          
          // Cache content asynchronously to avoid blocking
          setTimeout(() => {
            try {
              localStorage.setItem('novafuze_content_cache', JSON.stringify(mergedContent))
            } catch (e) {
              console.warn('Failed to cache content:', e)
            }
          }, 0)
        } else {
          // Use defaults and optionally create document
          const defaultContent = getMinimalDefaultContent()
          setContent(defaultContent)
          
          // Create initial document asynchronously if user is admin
          if (user) {
            setTimeout(async () => {
              try {
                await Promise.race([
                  setDoc(contentDocRef, defaultContent),
                  new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Firebase write timeout')), 3000)
                  )
                ])
              } catch (writeError) {
                console.warn('Failed to create initial document:', writeError)
              }
            }, 0)
          }
        }
      } catch (firebaseError: any) {
        console.warn('Firebase load failed, trying cache:', firebaseError.message)
        
        // Try cache fallback
        try {
          const cachedContent = localStorage.getItem('novafuze_content_cache')
          if (cachedContent) {
            const parsedContent = JSON.parse(cachedContent)
            const mergedContent = { ...getMinimalDefaultContent(), ...parsedContent }
            setContent(mergedContent)
            setLoadError('Using cached content (offline mode)')
          } else {
            setContent(getMinimalDefaultContent())
            setLoadError('Using default content (connection issues)')
          }
        } catch (cacheError) {
          console.warn('Cache fallback failed:', cacheError)
          setContent(getMinimalDefaultContent())
          setLoadError('Using default content')
        }
      }
    } catch (error: any) {
      console.warn('Content loading failed:', error)
      setContent(getMinimalDefaultContent())
      setLoadError('Using default content')
    }
  }, [getContentDocRef])

  // Save content to Firebase or localStorage
  const saveContent = useCallback(async () => {
    if (!user) {
      console.warn('Cannot save content: User not authenticated')
      return
    }

    // Always save to localStorage
    try {
      localStorage.setItem('novafuze_content_cache', JSON.stringify(content))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }

    // If Firebase is disabled, only save locally
    const contentDocRef = getContentDocRef();
    if (!contentDocRef) {
      console.log('Content saved locally (Firebase disabled)')
      return
    }

    try {
      setLoadError(null)
      
      // Try to save with timeout
      await Promise.race([
        setDoc(contentDocRef, content, { merge: true }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase save timeout')), 10000)
        )
      ])
      
    } catch (error: any) {
      console.warn('Failed to save content to Firebase:', error)
      
      // Cache the content locally for later sync
      try {
        localStorage.setItem('novafuze_content_pending', JSON.stringify(content))
        setLoadError('Changes saved locally (will sync when online)')
      } catch (cacheError) {
        setLoadError('Failed to save content changes')
        throw error
      }
    }
  }, [content, user, getContentDocRef])

  // Update entire content or merge with existing
  const updateContent = useCallback(async (newContent: Partial<WebsiteContent> | WebsiteContent) => {
    if (!user) {
      console.warn('Cannot update content: User not authenticated')
      return
    }

    try {
      setLoadError(null)
      const updatedContent = { ...content, ...newContent }
      setContent(updatedContent)
      
      const contentDocRef = getContentDocRef();
      if (contentDocRef) {
        // Try to save with timeout
        await Promise.race([
          setDoc(contentDocRef, updatedContent, { merge: true }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase update timeout')), 10000)
          )
        ])
      }
      
      // Update local cache
      try {
        localStorage.setItem('novafuze_content_cache', JSON.stringify(updatedContent))
      } catch (e) {
        console.warn('Failed to update local cache:', e)
      }
      
    } catch (error: any) {
      console.warn('Failed to update content online:', error.message)
      
      // Keep the local changes but cache for later sync
      try {
        localStorage.setItem('novafuze_content_pending', JSON.stringify({ ...content, ...newContent }))
        setLoadError('Changes saved locally (will sync when online)')
      } catch (cacheError) {
        setLoadError('Failed to update content')
        throw error
      }
    }
  }, [content, user, getContentDocRef])

  // Update a specific section
  const updateSection = useCallback(async (section: keyof WebsiteContent, data: any) => {
    if (!user) {
      console.warn('Cannot update section: User not authenticated')
      return
    }

    try {
      setLoadError(null)
      const updatedContent = {
        ...content,
        [section]: data
      }
      setContent(updatedContent)
      
      const contentDocRef = getContentDocRef();
      if (contentDocRef) {
        await setDoc(contentDocRef, { [section]: data }, { merge: true })
      }
    } catch (error) {
      console.error('Failed to update section:', error)
      setLoadError('Failed to update section')
      throw error
    }
  }, [content, user, getContentDocRef])

  // Update nested content using dot notation
  const updateNestedContent = useCallback(async (path: string, data: any) => {
    if (!user) {
      console.warn('Cannot update nested content: User not authenticated')
      return
    }

    try {
      setLoadError(null)
      const pathArray = path.split('.')
      const updatedContent = { ...content }
      let current: any = updatedContent
      
      // Navigate to the parent object
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (current[pathArray[i]]) {
          current = current[pathArray[i]]
        } else {
          current[pathArray[i]] = {}
          current = current[pathArray[i]]
        }
      }
      
      // Update the final property
      current[pathArray[pathArray.length - 1]] = data
      
      setContent(updatedContent)
      
      const contentDocRef = getContentDocRef();
      if (contentDocRef) {
        await setDoc(contentDocRef, updatedContent, { merge: true })
      }
    } catch (error) {
      console.error('Failed to update nested content:', error)
      setLoadError('Failed to update nested content')
      throw error
    }
  }, [content, user, getContentDocRef])

  // Reset content to defaults
  const resetContent = useCallback(async () => {
    if (!user) {
      console.warn('Cannot reset content: User not authenticated')
      return
    }

    try {
      setLoadError(null)
      const defaultContent = getMinimalDefaultContent()
      setContent(defaultContent)
      
      const contentDocRef = getContentDocRef();
      if (contentDocRef) {
        await setDoc(contentDocRef, defaultContent)
      }
    } catch (error) {
      console.error('Failed to reset content:', error)
      setLoadError('Failed to reset content')
      throw error
    }
  }, [user, getContentDocRef])

  // Load content on mount (optimized for performance)
  useEffect(() => {
    // Set immediate default content to prevent undefined errors
    const defaultContent = getMinimalDefaultContent()
    setContent(defaultContent)
    setIsLoading(false)
    
    // Only load content if we should enable Firebase
    if (shouldEnableFirebase()) {
      // Defer content loading to next tick to avoid blocking render
      const timeoutId = setTimeout(() => {
        const initializeContent = async () => {
          try {
            await loadContent()
          } catch (error) {
            console.warn('Failed to initialize content, using defaults:', error)
          }
        }
        
        initializeContent()
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, [loadContent])

  // Set up real-time listener for content updates (only if Firebase is enabled and user is authenticated)
  useEffect(() => {
    if (!user || !shouldEnableFirebase()) return

    const contentDocRef = getContentDocRef();
    if (!contentDocRef) return

    let unsubscribe: (() => void) | null = null

    // Defer listener setup to avoid blocking render
    const timeoutId = setTimeout(() => {
      try {
        unsubscribe = onSnapshot(contentDocRef, {
          next: (doc) => {
            if (doc.exists()) {
              const firestoreContent = doc.data() as WebsiteContent
              const mergedContent = { ...getMinimalDefaultContent(), ...firestoreContent }
              setContent(mergedContent)
              
              // Update local cache
              try {
                localStorage.setItem('novafuze_content_cache', JSON.stringify(mergedContent))
              } catch (e) {
                console.warn('Failed to update local cache from real-time update:', e)
              }
            }
          },
          error: (error) => {
            console.warn('Real-time listener error:', error)
            setLoadError('Real-time updates unavailable')
          }
        })
      } catch (error) {
        console.warn('Failed to set up real-time listener:', error)
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [user, getContentDocRef])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    content,
    isLoading,
    loadError,
    updateContent,
    updateSection,
    updateNestedContent,
    resetContent,
    saveContent,
    loadContent
  }), [
    content,
    isLoading,
    loadError,
    updateContent,
    updateSection,
    updateNestedContent,
    resetContent,
    saveContent,
    loadContent
  ])

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  )
}

// Hook to use the content context
export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

// Hook to use a specific section of content
export function useContentSection<K extends keyof WebsiteContent>(section: K): WebsiteContent[K] {
  const { content } = useContent()
  return content[section]
}

// Hook to check if content is in edit mode (when user is authenticated)
export function useContentEditMode() {
  const { user } = useAuth()
  return !!user
}