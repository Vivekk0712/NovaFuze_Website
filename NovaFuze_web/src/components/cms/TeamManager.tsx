import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { TeamMember } from '../../types/cms'

export function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const cms = useCMS()

  useEffect(() => {
    loadTeamMembers()
  }, [])

  const loadTeamMembers = async () => {
    try {
      const allMembers = await cms.team.getAll()
      setTeamMembers(allMembers)
    } catch (error) {
      console.error('Error loading team members:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-muted-foreground">
            Manage your team members and their profiles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {teamMembers.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Team Members</CardTitle>
            <CardDescription>
              Add your first team member to get started
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}