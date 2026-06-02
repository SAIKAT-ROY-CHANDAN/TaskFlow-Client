'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'
import { KPICard } from '@/components/dashboard/KPICard'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTasks } from '@/lib/hooks/useTasks'
import { useTeam } from '@/lib/hooks/useTeam'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PriorityBadge } from '@/components/common/PriorityBadge'

export default function DashboardPage() {
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const { users } = useTeam()

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length
    const pendingTasks = tasks.filter(t => t.status !== 'completed').length
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length

    return {
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks,
      overdueTasks
    }
  }, [projects, tasks])

  const taskStatusData = useMemo(() => {
    const statusCounts = {
      'todo': tasks.filter(t => t.status === 'todo').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      'in-review': tasks.filter(t => t.status === 'in-review').length,
      'completed': tasks.filter(t => t.status === 'completed').length
    }
    return [
      { name: 'To Do', value: statusCounts['todo'] },
      { name: 'In Progress', value: statusCounts['in-progress'] },
      { name: 'In Review', value: statusCounts['in-review'] },
      { name: 'Completed', value: statusCounts['completed'] }
    ]
  }, [tasks])

  const priorityData = useMemo(() => {
    const priorityCounts = {
      'low': tasks.filter(t => t.priority === 'low').length,
      'medium': tasks.filter(t => t.priority === 'medium').length,
      'high': tasks.filter(t => t.priority === 'high').length,
      'urgent': tasks.filter(t => t.priority === 'urgent').length
    }
    return [
      { name: 'Low', value: priorityCounts['low'] },
      { name: 'Medium', value: priorityCounts['medium'] },
      { name: 'High', value: priorityCounts['high'] },
      { name: 'Urgent', value: priorityCounts['urgent'] }
    ]
  }, [tasks])

  const teamWorkloadData = useMemo(() => {
    return users.map(user => ({
      name: user.name.split(' ')[0],
      tasks: tasks.filter(t => t.assigneeId === user.id).length
    }))
  }, [users, tasks])

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']

  const upcomingTasks = useMemo(() => {
    const now = new Date()
    return tasks
      .filter(t => t.status !== 'completed' && new Date(t.dueDate) > now)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5)
  }, [tasks])

  const highPriorityTasks = useMemo(() => {
    return tasks
      .filter(t => t.status !== 'completed' && t.priority === 'urgent')
      .slice(0, 5)
  }, [tasks])

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <KPICard
            title="Total Projects"
            value={stats.totalProjects}
            icon="📁"
          />
          <KPICard
            title="Total Tasks"
            value={stats.totalTasks}
            icon="✓"
          />
          <KPICard
            title="Completed"
            value={stats.completedTasks}
            change={20}
            trend="up"
            icon="✅"
          />
          <KPICard
            title="Pending"
            value={stats.pendingTasks}
            icon="⏳"
          />
          <KPICard
            title="Overdue"
            value={stats.overdueTasks}
            change={5}
            trend="down"
            icon="⚠️"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Task Status Distribution</CardTitle>
              <CardDescription>Overview of tasks by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Priority Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Priority</CardTitle>
              <CardDescription>Distribution across priority levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Workload */}
          <Card>
            <CardHeader>
              <CardTitle>Team Workload</CardTitle>
              <CardDescription>Tasks assigned per team member</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={teamWorkloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Next 5 tasks due</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.length > 0 ? (
                  upcomingTasks.map(task => (
                    <div key={task.id} className="flex items-start justify-between pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <StatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2 shrink-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming tasks</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* High Priority Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>High Priority Tasks</CardTitle>
                <CardDescription>Urgent tasks that need attention</CardDescription>
              </div>
              <Link href="/tasks">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highPriorityTasks.length > 0 ? (
                highPriorityTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{task.description.substring(0, 50)}...</p>
                    </div>
                    <Link href={`/tasks/${task.id}`} className="ml-4">
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No urgent tasks</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
