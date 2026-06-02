import { ProjectStatus, TaskStatus, TaskPriority, UserRole } from './types'

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
  active: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800'
  },
  'on-hold': {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-700 dark:text-yellow-200',
    border: 'border-yellow-200 dark:border-yellow-800'
  },
  completed: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800'
  },
  cancelled: {
    bg: 'bg-red-50 dark:bg-red-950',
    text: 'text-red-700 dark:text-red-200',
    border: 'border-red-200 dark:border-red-800'
  }
}

export const TASK_STATUS_COLORS: Record<TaskStatus, { bg: string; text: string; border: string }> = {
  todo: {
    bg: 'bg-gray-50 dark:bg-gray-950',
    text: 'text-gray-700 dark:text-gray-200',
    border: 'border-gray-200 dark:border-gray-800'
  },
  'in-progress': {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800'
  },
  'in-review': {
    bg: 'bg-purple-50 dark:bg-purple-950',
    text: 'text-purple-700 dark:text-purple-200',
    border: 'border-purple-200 dark:border-purple-800'
  },
  completed: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800'
  }
}

export const PRIORITY_COLORS: Record<TaskPriority, { bg: string; text: string; border: string }> = {
  low: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800'
  },
  medium: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-700 dark:text-yellow-200',
    border: 'border-yellow-200 dark:border-yellow-800'
  },
  high: {
    bg: 'bg-orange-50 dark:bg-orange-950',
    text: 'text-orange-700 dark:text-orange-200',
    border: 'border-orange-200 dark:border-orange-800'
  },
  urgent: {
    bg: 'bg-red-50 dark:bg-red-950',
    text: 'text-red-700 dark:text-red-200',
    border: 'border-red-200 dark:border-red-800'
  }
}

export const ROLE_COLORS: Record<UserRole, { bg: string; text: string }> = {
  admin: {
    bg: 'bg-red-100 dark:bg-red-950',
    text: 'text-red-700 dark:text-red-200'
  },
  manager: {
    bg: 'bg-purple-100 dark:bg-purple-950',
    text: 'text-purple-700 dark:text-purple-200'
  },
  user: {
    bg: 'bg-blue-100 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-200'
  }
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  'in-review': 'In Review',
  completed: 'Completed'
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  'on-hold': 'On Hold',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  user: 'Team Member'
}
