'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'
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
import { MainLayout } from '@/components/layout/MainLayout'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PriorityBadge } from '@/components/common/PriorityBadge'
import { useTasks } from '@/lib/hooks/useTasks'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTeam } from '@/lib/hooks/useTeam'
import { TaskStatus, TaskPriority } from '@/lib/types'
import { Calendar } from 'lucide-react'

export default function TasksPage() {
  const { tasks } = useTasks()
  const { projects } = useProjects()
  const { users } = useTeam()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
  const [projectFilter, setProjectFilter] = useState<string>('all')

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      const matchesProject = projectFilter === 'all' || task.projectId === projectFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesProject
    })
  }, [tasks, searchTerm, statusFilter, priorityFilter, projectFilter])

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project'
  }

  const getAssigneeName = (userId?: string) => {
    if (!userId) return 'Unassigned'
    return users.find(u => u.id === userId)?.name || 'Unknown'
  }

  const isOverdue = (dueDate: Date, status: TaskStatus) => {
    return new Date(dueDate) < new Date() && status !== 'completed'
  }

  return (
    <MainLayout title="Tasks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage and track your tasks</p>
          </div>
          <Link href="/tasks/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          {/* Project Filter */}
          <Select value={projectFilter} onValueChange={(value) => setProjectFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tasks Table */}
        {filteredTasks.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Project</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Priority</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Assignee</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Due Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium max-w-xs truncate">{task.title}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{getProjectName(task.projectId)}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-6 py-4">
                          <PriorityBadge priority={task.priority} />
                        </td>
                        <td className="px-6 py-4 text-sm">{getAssigneeName(task.assigneeId)}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className={isOverdue(task.dueDate, task.status) ? 'text-red-600 font-semibold' : ''}>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/tasks/${task.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No tasks found</p>
              <Link href="/tasks/create" className="mt-4 inline-block">
                <Button>Create your first task</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
