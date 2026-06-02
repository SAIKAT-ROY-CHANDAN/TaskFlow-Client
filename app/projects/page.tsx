'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'
import { ProjectStatusBadge } from '@/components/common/ProjectStatusBadge'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTasks } from '@/lib/hooks/useTasks'
import { useTeam } from '@/lib/hooks/useTeam'
import { Progress } from '@/components/ui/progress'

export default function ProjectsPage() {
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const { users } = useTeam()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [projects, searchTerm])

  const getProjectStats = (projectId: string) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId)
    const completedTasks = projectTasks.filter(t => t.status === 'completed').length
    return {
      total: projectTasks.length,
      completed: completedTasks
    }
  }

  const getProjectMembers = (projectId: string, memberIds: string[]) => {
    return users.filter(u => memberIds.includes(u.id))
  }

  return (
    <MainLayout title="Projects">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and track your projects</p>
          </div>
          <Link href="/projects/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => {
            const stats = getProjectStats(project.id)
            const members = getProjectMembers(project.id, project.teamMembers)

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="truncate">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">
                          {project.description}
                        </CardDescription>
                      </div>
                      <ProjectStatusBadge status={project.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Progress</span>
                        <span className="text-xs font-semibold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Task Count */}
                    <div className="text-sm text-muted-foreground">
                      {stats.completed} of {stats.total} tasks completed
                    </div>

                    {/* Team Members */}
                    {members.length > 0 && (
                      <div className="flex items-center -space-x-2">
                        {members.slice(0, 3).map(member => (
                          <img
                            key={member.id}
                            src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                            alt={member.name}
                            className="w-8 h-8 rounded-full border-2 border-card"
                            title={member.name}
                          />
                        ))}
                        {members.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-semibold">
                            +{members.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dates */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Start: {new Date(project.startDate).toLocaleDateString()}</p>
                      <p>End: {new Date(project.endDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects found</p>
              <Link href="/projects/create" className="mt-4 inline-block">
                <Button>Create your first project</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
