import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { Portfolio } from '../../types/cms'

export function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([])
  const cms = useCMS()

  useEffect(() => {
    loadPortfolio()
  }, [])

  const loadPortfolio = async () => {
    try {
      const allItems = await cms.portfolio.getAll()
      setPortfolioItems(allItems)
    } catch (error) {
      console.error('Error loading portfolio:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Management</h2>
          <p className="text-muted-foreground">
            Showcase your projects and case studies
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {portfolioItems.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Portfolio Items</CardTitle>
            <CardDescription>
              Add your first project to get started
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}