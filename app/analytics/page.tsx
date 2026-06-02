'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTasks } from '@/lib/hooks/useTasks'
import { useTeam } from '@/lib/hooks/useTeam'
import { useMemo } from 'react'

export default function AnalyticsPage() {
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const { users } = useTeam()

  // Project Progress Trend (last 6 months)
  const projectProgressData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, index) => ({
      name: month,
      progress: Math.min(100, (index + 1) * 15 + Math.random() * 10)
    }))
  }, [])

  // Team Productivity
  const teamProductivityData = useMemo(() => {
    return users.map(user => ({
      name: user.name.split(' ')[0],
      completed: tasks.filter(t => t.assigneeId === user.id && t.status === 'completed').length,
      inProgress: tasks.filter(t => t.assigneeId === user.id && t.status === 'in-progress').length
    }))
  }, [users, tasks])

  // Task Status Distribution
  const taskStatusData = useMemo(() => {
    return [
      { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
      { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
      { name: 'In Review', value: tasks.filter(t => t.status === 'in-review').length },
      { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length }
    ]
  }, [tasks])

  // Tasks by Priority
  const tasksPriorityData = useMemo(() => {
    return [
      { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
      { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
      { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
      { name: 'Urgent', value: tasks.filter(t => t.priority === 'urgent').length }
    ]
  }, [tasks])

  // Project Status Overview
  const projectStatusData = useMemo(() => {
    return [
      { name: 'Active', value: projects.filter(p => p.status === 'active').length },
      { name: 'On Hold', value: projects.filter(p => p.status === 'on-hold').length },
      { name: 'Completed', value: projects.filter(p => p.status === 'completed').length },
      { name: 'Cancelled', value: projects.filter(p => p.status === 'cancelled').length }
    ]
  }, [projects])

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']

  // Key Metrics
  const metrics = useMemo(() => {
    const completionRate = tasks.length > 0 ? ((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100).toFixed(1) : 0
    const avgTasksPerProject = projects.length > 0 ? (tasks.length / projects.length).toFixed(1) : 0
    const activeProjects = projects.filter(p => p.status === 'active').length
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length

    return {
      completionRate,
      avgTasksPerProject,
      activeProjects,
      overdueTasks
    }
  }, [projects, tasks])

  return (
    <MainLayout title="Analytics">
      <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{metrics.completionRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Tasks completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{metrics.activeProjects}</p>
              <p className="text-xs text-muted-foreground mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Avg Tasks/Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{metrics.avgTasksPerProject}</p>
              <p className="text-xs text-muted-foreground mt-1">Average per project</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Overdue Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{metrics.overdueTasks}</p>
              <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Progress Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Project Progress Trend</CardTitle>
              <CardDescription>Overall project completion over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#6366f1"
                    dot={{ fill: '#6366f1', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Progress %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Productivity */}
          <Card>
            <CardHeader>
              <CardTitle>Team Productivity</CardTitle>
              <CardDescription>Completed vs In Progress</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamProductivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="inProgress" fill="#06b6d4" name="In Progress" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Status */}
          <Card>
            <CardHeader>
              <CardTitle>Task Status Distribution</CardTitle>
              <CardDescription>Current task breakdown</CardDescription>
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

          {/* Task Priority */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Priority</CardTitle>
              <CardDescription>Priority distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tasksPriorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Status */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
              <CardDescription>Projects by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
