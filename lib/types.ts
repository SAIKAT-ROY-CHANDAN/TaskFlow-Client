export type UserRole = 'admin' | 'manager' | 'user'
export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'cancelled'
export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  joinDate: Date
  department?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  startDate: Date
  endDate: Date
  progress: number
  teamMembers: string[] // User IDs
  createdBy: string // User ID
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId?: string // User ID
  dueDate: Date
  createdBy: string // User ID
  createdAt: Date
  updatedAt: Date
  attachments: string[]
  comments: Comment[]
}

export interface Comment {
  id: string
  author: string // User ID
  text: string
  createdAt: Date
}

export interface Activity {
  id: string
  type: 'task-created' | 'task-updated' | 'project-created' | 'project-updated' | 'member-added' | 'comment-added'
  userId: string
  description: string
  resourceId: string // Task or Project ID
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  read: boolean
  createdAt: Date
}
