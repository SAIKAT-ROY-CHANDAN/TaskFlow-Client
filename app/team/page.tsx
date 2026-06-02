'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainLayout } from '@/components/layout/MainLayout'
import { useTeam } from '@/lib/hooks/useTeam'
import { useTasks } from '@/lib/hooks/useTasks'
import { ROLE_LABELS } from '@/lib/constants'

export default function TeamPage() {
  const { users } = useTeam()
  const { tasks } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  const getUserStats = (userId: string) => {
    const userTasks = tasks.filter(t => t.assigneeId === userId)
    const completedTasks = userTasks.filter(t => t.status === 'completed').length
    return {
      total: userTasks.length,
      completed: completedTasks,
      inProgress: userTasks.filter(t => t.status === 'in-progress').length
    }
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      admin: { bg: 'bg-red-100 dark:bg-red-950', text: 'text-red-700 dark:text-red-200' },
      manager: { bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-200' },
      user: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-200' }
    }
    return colors[role] || colors.user
  }

  return (
    <MainLayout title="Team">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage and view your team</p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => {
            const stats = getUserStats(user.id)
            const roleColor = getRoleColor(user.role)

            return (
              <Link key={user.id} href={`/team/${user.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="truncate">{user.name}</CardTitle>
                        <CardDescription className="truncate">{user.email}</CardDescription>
                      </div>
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Role Badge */}
                    <div>
                      <Badge className={`${roleColor.bg} ${roleColor.text} border-0`}>
                        {ROLE_LABELS[user.role as any]}
                      </Badge>
                    </div>

                    {/* Department */}
                    {user.department && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Department</p>
                        <p className="text-sm font-medium">{user.department}</p>
                      </div>
                    )}

                    {/* Task Stats */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-2">Task Stats</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className="text-lg font-bold">{stats.total}</p>
                          <p className="text-xs text-muted-foreground">Total</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">{stats.inProgress}</p>
                          <p className="text-xs text-muted-foreground">Active</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">{stats.completed}</p>
                          <p className="text-xs text-muted-foreground">Done</p>
                        </div>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground uppercase mb-1">Joined</p>
                      <p className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No team members found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
