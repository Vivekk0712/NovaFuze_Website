import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { Service } from '../../types/cms'

export function ServiceManager() {
  const [services, setServices] = useState<Service[]>([])
  const cms = useCMS()

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const allServices = await cms.services.getAll()
      setServices(allServices)
    } catch (error) {
      console.error('Error loading services:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Service Management</h2>
          <p className="text-muted-foreground">
            Manage your services and offerings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {services.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Services</CardTitle>
            <CardDescription>
              Add your first service to get started
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}