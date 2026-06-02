'use client'

import { useState, useEffect } from 'react'
import { Task, TaskStatus, TaskPriority } from '../types'
import { mockTasks } from '../data'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTasks([...mockTasks])
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const getTaskById = (id: string) => {
    return tasks.find(t => t.id === id)
  }

  const getTasksByProject = (projectId: string) => {
    return tasks.filter(t => t.projectId === projectId)
  }

  const getTasksByAssignee = (userId: string) => {
    return tasks.filter(t => t.assigneeId === userId)
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(t => t.status === status)
  }

  const getTasksByPriority = (priority: TaskPriority) => {
    return tasks.filter(t => t.priority === priority)
  }

  const getOverdueTasks = () => {
    const now = new Date()
    return tasks.filter(t => t.dueDate < now && t.status !== 'completed')
  }

  const createTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: []
    }
    setTasks([...tasks, newTask])
    return newTask
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(t =>
      t.id === id
        ? { ...t, ...updates, updatedAt: new Date() }
        : t
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const addComment = (taskId: string, author: string, text: string) => {
    setTasks(tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            comments: [
              ...t.comments,
              {
                id: `comment-${Date.now()}`,
                author,
                text,
                createdAt: new Date()
              }
            ],
            updatedAt: new Date()
          }
        : t
    ))
  }

  return {
    tasks,
    isLoading,
    getTaskById,
    getTasksByProject,
    getTasksByAssignee,
    getTasksByStatus,
    getTasksByPriority,
    getOverdueTasks,
    createTask,
    updateTask,
    deleteTask,
    addComment
  }
}
