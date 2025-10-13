import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { Testimonial } from '../../types/cms'

export function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const cms = useCMS()

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const allTestimonials = await cms.testimonials.getAll()
      setTestimonials(allTestimonials)
    } catch (error) {
      console.error('Error loading testimonials:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Testimonial Management</h2>
          <p className="text-muted-foreground">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Testimonials</CardTitle>
            <CardDescription>
              Add your first testimonial to get started
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}