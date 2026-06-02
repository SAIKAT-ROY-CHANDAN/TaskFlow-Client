'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Edit, Send, Calendar, User, Tag } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'
import { useTasks } from '@/lib/hooks/useTasks'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTeam } from '@/lib/hooks/useTeam'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PriorityBadge } from '@/components/common/PriorityBadge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { tasks, updateTask, deleteTask, addComment } = useTasks()
  const { projects } = useProjects()
  const { users } = useTeam()
  const [newComment, setNewComment] = useState('')

  const taskId = params.id as string
  const task = tasks.find(t => t.id === taskId)

  if (!task) {
    return (
      <MainLayout title="Task Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Task not found</p>
          <Link href="/tasks">
            <Button>Back to Tasks</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const project = projects.find(p => p.id === task.projectId)
  const assignee = task.assigneeId ? users.find(u => u.id === task.assigneeId) : null

  const handleStatusChange = (newStatus: string) => {
    updateTask(task.id, { status: newStatus as any })
    toast.success('Task status updated')
  }

  const handlePriorityChange = (newPriority: string) => {
    updateTask(task.id, { priority: newPriority as any })
    toast.success('Task priority updated')
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    addComment(task.id, 'user-1', newComment)
    setNewComment('')
    toast.success('Comment added')
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id)
      toast.success('Task deleted')
      router.push('/tasks')
    }
  }

  return (
    <MainLayout title={task.title}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
              </div>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/tasks/${task.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Metadata Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={task.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="border-0 bg-transparent p-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="in-review">In Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Priority
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={task.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger className="border-0 bg-transparent p-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Discussion about this task</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Comment List */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {task.comments.length > 0 ? (
                    task.comments.map(comment => {
                      const commentAuthor = users.find(u => u.id === comment.author)
                      return (
                        <div key={comment.id} className="flex gap-3 text-sm">
                          <img
                            src={commentAuthor?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${commentAuthor?.name}`}
                            alt={commentAuthor?.name}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{commentAuthor?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-muted-foreground">{comment.text}</p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">No comments yet</p>
                  )}
                </div>

                {/* Add Comment */}
                <form onSubmit={handleAddComment} className="flex gap-2 pt-4 border-t">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!newComment.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Project */}
            {project && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/projects/${project.id}`} className="text-primary hover:underline font-medium">
                    {project.name}
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Assignee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Assignee
                </CardTitle>
              </CardHeader>
              <CardContent>
                {assignee ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={assignee.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee.name}`}
                      alt={assignee.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{assignee.name}</p>
                      <p className="text-xs text-muted-foreground">{assignee.role}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Unassigned</p>
                )}
              </CardContent>
            </Card>

            {/* Due Date */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Due Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
                {new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
                  <p className="text-xs text-red-600 font-semibold mt-1">Overdue</p>
                )}
              </CardContent>
            </Card>

            {/* Status & Priority Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <StatusBadge status={task.status} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Priority</p>
                  <PriorityBadge priority={task.priority} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
