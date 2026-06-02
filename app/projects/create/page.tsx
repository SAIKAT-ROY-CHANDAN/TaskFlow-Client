'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTeam } from '@/lib/hooks/useTeam'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function CreateProjectPage() {
  const router = useRouter()
  const { createProject } = useProjects()
  const { users } = useTeam()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as const,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.name.trim()) {
        toast.error('Project name is required')
        setIsLoading(false)
        return
      }

      createProject({
        name: formData.name,
        description: formData.description,
        status: formData.status,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        progress: 0,
        teamMembers: selectedMembers,
        createdBy: 'user-1'
      })

      toast.success('Project created successfully')
      router.push('/projects')
    } catch (error) {
      toast.error('Failed to create project')
      setIsLoading(false)
    }
  }

  return (
    <MainLayout title="Create Project">
      <div className="max-w-2xl">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>Add a new project to your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Website Redesign"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe your project..."
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <Label>Team Members</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={user.id}
                        checked={selectedMembers.includes(user.id)}
                        onCheckedChange={(checked) => {
                          setSelectedMembers(prev =>
                            checked
                              ? [...prev, user.id]
                              : prev.filter(id => id !== user.id)
                          )
                        }}
                        disabled={isLoading}
                      />
                      <Label htmlFor={user.id} className="font-normal cursor-pointer flex items-center gap-2 flex-1">
                        <img
                          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                          alt={user.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{user.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/projects')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create Project
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
