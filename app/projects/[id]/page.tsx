'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Edit, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTasks } from '@/lib/hooks/useTasks'
import { useTeam } from '@/lib/hooks/useTeam'
import { ProjectStatusBadge } from '@/components/common/ProjectStatusBadge'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PriorityBadge } from '@/components/common/PriorityBadge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { projects, deleteProject } = useProjects()
  const { tasks } = useTasks()
  const { users } = useTeam()

  const projectId = params.id as string
  const project = projects.find(p => p.id === projectId)
  const projectTasks = tasks.filter(t => t.projectId === projectId)

  if (!project) {
    return (
      <MainLayout title="Project Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const teamMembers = users.filter(u => project.teamMembers.includes(u.id))
  const taskStats = {
    total: projectTasks.length,
    todo: projectTasks.filter(t => t.status === 'todo').length,
    inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
    inReview: projectTasks.filter(t => t.status === 'in-review').length,
    completed: projectTasks.filter(t => t.status === 'completed').length
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id)
      toast.success('Project deleted')
      router.push('/projects')
    }
  }

  return (
    <MainLayout title={project.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                <ProjectStatusBadge status={project.status} />
              </div>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/projects/${project.id}/edit`}>
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

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall</span>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">End Date</p>
                <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-2 text-sm">
                    <img
                      src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                      alt={member.name}
                      className="w-6 h-6 rounded-full"
                      title={member.name}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>{taskStats.total} total tasks</CardDescription>
              </div>
              <Link href={`/tasks/create?projectId=${project.id}`}>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {/* Task Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-xs text-muted-foreground uppercase">To Do</p>
                <p className="text-2xl font-bold">{taskStats.todo}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">In Progress</p>
                <p className="text-2xl font-bold">{taskStats.inProgress}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">In Review</p>
                <p className="text-2xl font-bold">{taskStats.inReview}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Completed</p>
                <p className="text-2xl font-bold">{taskStats.completed}</p>
              </div>
            </div>

            {/* Task List */}
            {projectTasks.length > 0 ? (
              <div className="space-y-3">
                {projectTasks.map(task => (
                  <Link key={task.id} href={`/tasks/${task.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{task.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{task.description.substring(0, 60)}...</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        <StatusBadge status={task.status} />
                        <PriorityBadge priority={task.priority} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No tasks yet. Create one to get started!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
