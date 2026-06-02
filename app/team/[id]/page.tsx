'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainLayout } from '@/components/layout/MainLayout'
import { useTeam } from '@/lib/hooks/useTeam'
import { useTasks } from '@/lib/hooks/useTasks'
import { ROLE_LABELS } from '@/lib/constants'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PriorityBadge } from '@/components/common/PriorityBadge'

export default function TeamMemberPage() {
  const params = useParams()
  const { users } = useTeam()
  const { tasks } = useTasks()

  const userId = params.id as string
  const user = users.find(u => u.id === userId)

  if (!user) {
    return (
      <MainLayout title="Member Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Team member not found</p>
          <Link href="/team">
            <Button>Back to Team</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const userTasks = tasks.filter(t => t.assigneeId === userId)
  const taskStats = {
    total: userTasks.length,
    completed: userTasks.filter(t => t.status === 'completed').length,
    inProgress: userTasks.filter(t => t.status === 'in-progress').length,
    todo: userTasks.filter(t => t.status === 'todo').length,
    inReview: userTasks.filter(t => t.status === 'in-review').length
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      admin: { bg: 'bg-red-100 dark:bg-red-950', text: 'text-red-700 dark:text-red-200' },
      manager: { bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-200' },
      user: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-200' }
    }
    return colors[role] || colors.user
  }

  const roleColor = getRoleColor(user.role)

  return (
    <MainLayout title={user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link href="/team" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </Link>

          <div className="flex items-start gap-6">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-muted-foreground mt-1">{user.email}</p>
              <div className="mt-3">
                <Badge className={`${roleColor.bg} ${roleColor.text} border-0`}>
                  {ROLE_LABELS[user.role as any]}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {user.department && (
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium">{user.department}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium">{ROLE_LABELS[user.role as any]}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Task Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{taskStats.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{taskStats.todo}</p>
                  <p className="text-xs text-muted-foreground">To Do</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>In Progress</span>
                    <span className="font-semibold">{taskStats.inProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${taskStats.total > 0 ? (taskStats.inProgress / taskStats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Completed</span>
                    <span className="font-semibold">{taskStats.completed}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Tasks</CardTitle>
            <CardDescription>{userTasks.length} total tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {userTasks.length > 0 ? (
              <div className="space-y-3">
                {userTasks.map(task => (
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
              <p className="text-center text-muted-foreground py-8">No tasks assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
