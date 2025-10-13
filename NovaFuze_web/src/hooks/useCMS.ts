import { useState, useEffect, useCallback } from 'react'
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import type { 
  PageContent, 
  ComponentContent, 
  SiteSettings, 
  BlogPost, 
  Product, 
  Service, 
  TeamMember, 
  Testimonial, 
  Portfolio, 
  VideoContent 
} from '../types/cms'
import { toast } from 'sonner@2.0.3'

export function useCMS() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generic CRUD operations
  const create = useCallback(async <T>(collection: string, id: string, data: T): Promise<void> => {
    setLoading(true)
    try {
      await setDoc(doc(db, collection, id), {
        ...data,
        lastModified: new Date(),
        lastModifiedBy: 'admin@novafuze.in' // TODO: Get from auth context
      })
      toast.success('Content created successfully')
    } catch (error) {
      console.error('Error creating content:', error)
      setError('Failed to create content')
      toast.error('Failed to create content')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async <T>(collection: string, id: string, data: Partial<T>): Promise<void> => {
    setLoading(true)
    try {
      await updateDoc(doc(db, collection, id), {
        ...data,
        lastModified: new Date(),
        lastModifiedBy: 'admin@novafuze.in' // TODO: Get from auth context
      })
      toast.success('Content updated successfully')
    } catch (error) {
      console.error('Error updating content:', error)
      setError('Failed to update content')
      toast.error('Failed to update content')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (collection: string, id: string): Promise<void> => {
    setLoading(true)
    try {
      await deleteDoc(doc(db, collection, id))
      toast.success('Content deleted successfully')
    } catch (error) {
      console.error('Error deleting content:', error)
      setError('Failed to delete content')
      toast.error('Failed to delete content')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const get = useCallback(async <T>(collection: string, id: string): Promise<T | null> => {
    setLoading(true)
    try {
      const docRef = doc(db, collection, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T
      }
      return null
    } catch (error) {
      console.error('Error getting content:', error)
      setError('Failed to get content')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const getAll = useCallback(async <T>(collection: string, orderByField: string = 'lastModified'): Promise<T[]> => {
    setLoading(true)
    try {
      const q = query(
        collection(db, collection),
        orderBy(orderByField, 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
    } catch (error) {
      console.error('Error getting all content:', error)
      setError('Failed to get content')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const getBySlug = useCallback(async <T>(collection: string, slug: string): Promise<T | null> => {
    setLoading(true)
    try {
      const q = query(
        collection(db, collection),
        where('slug', '==', slug)
      )
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        return { id: doc.id, ...doc.data() } as T
      }
      return null
    } catch (error) {
      console.error('Error getting content by slug:', error)
      setError('Failed to get content')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Image upload functionality
  const uploadImage = useCallback(async (file: File, path: string): Promise<string> => {
    setLoading(true)
    try {
      const storageRef = ref(storage, `cms/${path}/${Date.now()}_${file.name}`)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      toast.success('Image uploaded successfully')
      return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Failed to upload image')
      toast.error('Failed to upload image')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteImage = useCallback(async (imageUrl: string): Promise<void> => {
    setLoading(true)
    try {
      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)
      toast.success('Image deleted successfully')
    } catch (error) {
      console.error('Error deleting image:', error)
      setError('Failed to delete image')
      toast.error('Failed to delete image')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Specific content type operations
  const pages = {
    create: (id: string, data: PageContent) => create('pages', id, data),
    update: (id: string, data: Partial<PageContent>) => update('pages', id, data),
    delete: (id: string) => remove('pages', id),
    get: (id: string) => get<PageContent>('pages', id),
    getAll: () => getAll<PageContent>('pages'),
    getBySlug: (slug: string) => getBySlug<PageContent>('pages', slug)
  }

  const components = {
    create: (id: string, data: ComponentContent) => create('components', id, data),
    update: (id: string, data: Partial<ComponentContent>) => update('components', id, data),
    delete: (id: string) => remove('components', id),
    get: (id: string) => get<ComponentContent>('components', id),
    getAll: () => getAll<ComponentContent>('components')
  }

  const siteSettings = {
    update: (data: Partial<SiteSettings>) => update('settings', 'site', data),
    get: () => get<SiteSettings>('settings', 'site')
  }

  const blog = {
    create: (id: string, data: BlogPost) => create('blog', id, data),
    update: (id: string, data: Partial<BlogPost>) => update('blog', id, data),
    delete: (id: string) => remove('blog', id),
    get: (id: string) => get<BlogPost>('blog', id),
    getAll: () => getAll<BlogPost>('blog', 'publishDate'),
    getBySlug: (slug: string) => getBySlug<BlogPost>('blog', slug)
  }

  const products = {
    create: (id: string, data: Product) => create('products', id, data),
    update: (id: string, data: Partial<Product>) => update('products', id, data),
    delete: (id: string) => remove('products', id),
    get: (id: string) => get<Product>('products', id),
    getAll: () => getAll<Product>('products'),
    getBySlug: (slug: string) => getBySlug<Product>('products', slug)
  }

  const services = {
    create: (id: string, data: Service) => create('services', id, data),
    update: (id: string, data: Partial<Service>) => update('services', id, data),
    delete: (id: string) => remove('services', id),
    get: (id: string) => get<Service>('services', id),
    getAll: () => getAll<Service>('services'),
    getBySlug: (slug: string) => getBySlug<Service>('services', slug)
  }

  const team = {
    create: (id: string, data: TeamMember) => create('team', id, data),
    update: (id: string, data: Partial<TeamMember>) => update('team', id, data),
    delete: (id: string) => remove('team', id),
    get: (id: string) => get<TeamMember>('team', id),
    getAll: () => getAll<TeamMember>('team')
  }

  const testimonials = {
    create: (id: string, data: Testimonial) => create('testimonials', id, data),
    update: (id: string, data: Partial<Testimonial>) => update('testimonials', id, data),
    delete: (id: string) => remove('testimonials', id),
    get: (id: string) => get<Testimonial>('testimonials', id),
    getAll: () => getAll<Testimonial>('testimonials')
  }

  const portfolio = {
    create: (id: string, data: Portfolio) => create('portfolio', id, data),
    update: (id: string, data: Partial<Portfolio>) => update('portfolio', id, data),
    delete: (id: string) => remove('portfolio', id),
    get: (id: string) => get<Portfolio>('portfolio', id),
    getAll: () => getAll<Portfolio>('portfolio', 'completedDate'),
    getBySlug: (slug: string) => getBySlug<Portfolio>('portfolio', slug)
  }

  const vlogs = {
    create: (id: string, data: VideoContent) => create('vlogs', id, data),
    update: (id: string, data: Partial<VideoContent>) => update('vlogs', id, data),
    delete: (id: string) => remove('vlogs', id),
    get: (id: string) => get<VideoContent>('vlogs', id),
    getAll: () => getAll<VideoContent>('vlogs', 'publishDate'),
    getBySlug: (slug: string) => getBySlug<VideoContent>('vlogs', slug)
  }

  return {
    loading,
    error,
    uploadImage,
    deleteImage,
    pages,
    components,
    siteSettings,
    blog,
    products,
    services,
    team,
    testimonials,
    portfolio,
    vlogs
  }
}