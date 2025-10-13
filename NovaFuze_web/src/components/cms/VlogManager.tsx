import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { VideoContent } from '../../types/cms'

export function VlogManager() {
  const [vlogs, setVlogs] = useState<VideoContent[]>([])
  const cms = useCMS()

  useEffect(() => {
    loadVlogs()
  }, [])

  const loadVlogs = async () => {
    try {
      const allVlogs = await cms.vlogs.getAll()
      setVlogs(allVlogs)
    } catch (error) {
      console.error('Error loading vlogs:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vlog Management</h2>
          <p className="text-muted-foreground">
            Manage your video content and vlogs
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vlog
        </Button>
      </div>

      {vlogs.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Vlogs</CardTitle>
            <CardDescription>
              Add your first vlog to get started
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}