'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { MainLayout } from '@/components/layout/MainLayout'
import { useTasks } from '@/lib/hooks/useTasks'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTeam } from '@/lib/hooks/useTeam'
import { toast } from 'sonner'

export default function CreateTaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { createTask } = useTasks()
  const { projects } = useProjects()
  const { users } = useTeam()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: searchParams.get('projectId') || (projects[0]?.id || ''),
    assigneeId: 'unassigned',
    priority: 'medium' as const,
    status: 'todo' as const,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.title.trim()) {
        toast.error('Task title is required')
        setIsLoading(false)
        return
      }

      if (!formData.projectId) {
        toast.error('Project is required')
        setIsLoading(false)
        return
      }

      createTask({
        title: formData.title,
        description: formData.description,
        projectId: formData.projectId,
        assigneeId: formData.assigneeId !== 'unassigned' ? formData.assigneeId : undefined,
        priority: formData.priority,
        status: formData.status,
        dueDate: new Date(formData.dueDate),
        createdBy: 'user-1',
        attachments: []
      })

      toast.success('Task created successfully')
      router.push('/tasks')
    } catch (error) {
      toast.error('Failed to create task')
      setIsLoading(false)
    }
  }

  return (
    <MainLayout title="Create Task">
      <div className="max-w-2xl">
        <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
            <CardDescription>Add a new task to your project</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Implement user authentication"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe the task..."
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Project */}
              <div className="space-y-2">
                <Label htmlFor="project">Project *</Label>
                <Select value={formData.projectId} onValueChange={(value) => setFormData({ ...formData, projectId: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Assignee */}
              <div className="space-y-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select value={formData.assigneeId} onValueChange={(value) => setFormData({ ...formData, assigneeId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/tasks')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create Task
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
