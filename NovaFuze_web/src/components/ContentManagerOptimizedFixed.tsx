import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { doc, setDoc, getDoc } from 'firebase/firestore'
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
  
  // Additional sections...
  about: any
  services: any
  products: any
  portfolio: any
  team: any
  blog: any
  testimonials: any
  contact: any
  footer: any
  
  // Allow other sections as needed
  [key: string]: any
}

// Essential default content - simplified
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
    description: "We are a team of passionate developers and designers committed to transforming your digital vision into reality.",
    enabled: true
  },
  
  services: {
    title: "Our Services",
    subtitle: "Comprehensive Digital Solutions",
    description: "From concept to deployment, we offer end-to-end technology services that drive business growth and innovation.",
    enabled: true,
    items: []
  },
  
  products: {
    title: "Our Products",
    subtitle: "Ready-to-Use Solutions",
    description: "Powerful software products designed to accelerate your business operations and enhance productivity.",
    enabled: true,
    items: []
  },
  
  portfolio: {
    title: "Our Portfolio",
    subtitle: "Featured Projects",
    description: "Discover our latest work and success stories across various industries and technologies.",
    enabled: true,
    items: []
  },
  
  team: {
    title: "Our Team",
    subtitle: "Meet the Experts",
    description: "Our diverse team of talented professionals brings together creativity, technical expertise, and innovation.",
    enabled: true
  },
  
  blog: {
    title: "Latest Insights",
    subtitle: "Our Blog",
    description: "Stay updated with the latest trends, technologies, and insights from our team of experts.",
    enabled: true,
    items: []
  },
  
  testimonials: {
    title: "Client Testimonials",
    subtitle: "What Our Clients Say",
    description: "Don't just take our word for it - hear from our satisfied clients about their experience working with NovaFuze.",
    enabled: true,
    items: []
  },
  
  contact: {
    title: "Get In Touch",
    subtitle: "Ready to Start Your Project?",
    description: "Have a project in mind? We'd love to hear from you. Let's discuss how we can bring your vision to life.",
    enabled: true
  },
  
  footer: {
    companyDescription: "Building modern digital experiences with AI-powered solutions. We transform ideas into scalable, innovative technology solutions that drive business growth.",
    copyright: "© 2025 NovaFuze. All rights reserved.",
    // Keep legacy structure for backward compatibility
    company: {
      name: "NovaFuze",
      description: "Building modern digital experiences with AI-powered solutions.",
      logo: { text: "N", bgGradient: "from-[#4E6BDF] to-[#333FC2]" }
    },
    links: {
      services: [
        { id: "1", name: "Web Development", href: "/services/web-development", order: 1 }
      ],
      products: [
        { id: "1", name: "NovaForms", href: "/products", order: 1 }
      ],
      company: [
        { id: "1", name: "About Us", href: "/about", order: 1 },
        { id: "2", name: "Contact", href: "/contact", order: 2 }
      ],
      legal: [
        { id: "1", name: "Privacy Policy", href: "/legal/privacy", order: 1 },
        { id: "2", name: "Terms of Service", href: "/legal/terms", order: 2 }
      ]
    },
    social: [
      { id: "1", platform: "LinkedIn", url: "https://linkedin.com/company/novafuze", icon: "Linkedin", order: 1 }
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
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Firebase document reference (STRICT GUARDS - only when absolutely needed)
  const getContentDocRef = useCallback(() => {
    // Triple check: Firebase enabled + user authenticated + admin route
    if (!shouldEnableFirebase() || !user || !window.location.hash.startsWith('#admin')) {
      return null;
    }
    
    try {
      // Only attempt Firebase operations if we're actually on an admin route
      if (window.location.hash.startsWith('#admin')) {
        initializeFirebaseIfNeeded();
        return db ? doc(db, 'website', 'content') : null;
      }
      return null;
    } catch (error) {
      console.warn('Failed to get content doc ref:', error);
      return null;
    }
  }, [user])

  // Load content from Firebase or localStorage - NO REAL-TIME LISTENERS
  const loadContent = useCallback(async () => {
    try {
      setLoadError(null)
      
      // Always try localStorage first (fast and reliable)
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

      // Only try Firebase if we're admin and authenticated
      const contentDocRef = getContentDocRef();
      if (!contentDocRef || !user) {
        return; // Exit early for non-admin users
      }
      
      try {
        const docSnap = await Promise.race([
          getDoc(contentDocRef),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase timeout')), 3000)
          )
        ]) as any
        
        if (docSnap?.exists()) {
          const firestoreContent = docSnap.data() as WebsiteContent
          const mergedContent = { ...getMinimalDefaultContent(), ...firestoreContent }
          setContent(mergedContent)
          
          // Update cache
          setTimeout(() => {
            try {
              localStorage.setItem('novafuze_content_cache', JSON.stringify(mergedContent))
            } catch (e) {
              console.warn('Failed to cache content:', e)
            }
          }, 0)
        }
      } catch (firebaseError) {
        console.warn('Firebase load failed, using cache/defaults:', firebaseError)
        // Content is already set from localStorage or defaults above
      }
    } catch (error: any) {
      console.warn('Content loading failed:', error)
      setContent(getMinimalDefaultContent())
      setLoadError('Using default content')
    }
  }, [getContentDocRef, user])

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

    // Only try Firebase if available
    const contentDocRef = getContentDocRef();
    if (!contentDocRef) {
      console.log('Content saved locally (Firebase not available)')
      return
    }

    try {
      setLoadError(null)
      await Promise.race([
        setDoc(contentDocRef, content, { merge: true }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase save timeout')), 8000)
        )
      ])
    } catch (error: any) {
      console.warn('Failed to save content to Firebase:', error)
      localStorage.setItem('novafuze_content_pending', JSON.stringify(content))
      setLoadError('Changes saved locally (will sync when online)')
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
      
      // Update local cache immediately
      try {
        localStorage.setItem('novafuze_content_cache', JSON.stringify(updatedContent))
      } catch (e) {
        console.warn('Failed to update local cache:', e)
      }

      // Try Firebase if available
      const contentDocRef = getContentDocRef();
      if (contentDocRef) {
        try {
          await Promise.race([
            setDoc(contentDocRef, updatedContent, { merge: true }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Firebase update timeout')), 8000)
            )
          ])
        } catch (error) {
          console.warn('Failed to update Firebase, content saved locally:', error)
          localStorage.setItem('novafuze_content_pending', JSON.stringify(updatedContent))
          setLoadError('Changes saved locally (will sync when online)')
        }
      }
    } catch (error: any) {
      console.warn('Failed to update content:', error.message)
      setLoadError('Failed to update content')
      throw error
    }
  }, [content, user, getContentDocRef])

  // Update a specific section
  const updateSection = useCallback(async (section: keyof WebsiteContent, data: any) => {
    if (!user) {
      console.warn('Cannot update section: User not authenticated')
      return
    }

    const updatedContent = { ...content, [section]: data }
    await updateContent(updatedContent)
  }, [content, user, updateContent])

  // Update nested content using dot notation
  const updateNestedContent = useCallback(async (path: string, data: any) => {
    if (!user) {
      console.warn('Cannot update nested content: User not authenticated')
      return
    }

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
    
    await updateContent(updatedContent)
  }, [content, user, updateContent])

  // Reset content to defaults
  const resetContent = useCallback(async () => {
    if (!user) {
      console.warn('Cannot reset content: User not authenticated')
      return
    }

    const defaultContent = getMinimalDefaultContent()
    await updateContent(defaultContent)
  }, [user, updateContent])

  // Initial content load on mount - NO REAL-TIME LISTENERS
  useEffect(() => {
    let isMounted = true
    
    const initializeContent = async () => {
      if (isMounted) {
        setIsLoading(true)
        try {
          await loadContent()
        } finally {
          if (isMounted) {
            setIsLoading(false)
          }
        }
      }
    }
    
    initializeContent()
    
    return () => {
      isMounted = false
    }
  }, [loadContent])

  // Sync pending changes when coming back online
  useEffect(() => {
    if (isOnline && user && shouldEnableFirebase()) {
      const syncPendingChanges = async () => {
        try {
          const pendingContent = localStorage.getItem('novafuze_content_pending')
          if (pendingContent) {
            const parsedContent = JSON.parse(pendingContent)
            await updateContent(parsedContent)
            localStorage.removeItem('novafuze_content_pending')
            setLoadError(null)
          }
        } catch (error) {
          console.warn('Failed to sync pending changes:', error)
        }
      }
      
      const syncTimeout = setTimeout(syncPendingChanges, 2000)
      return () => clearTimeout(syncTimeout)
    }
  }, [isOnline, user, updateContent])

  const contextValue: ContentContextType = {
    content,
    isLoading,
    loadError,
    updateContent,
    updateSection,
    updateNestedContent,
    resetContent,
    saveContent,
    loadContent
  }

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  )
}

// Hook to use content context
export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}