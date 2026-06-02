'use client'

import { useState, useEffect } from 'react'
import { Project, ProjectStatus } from '../types'
import { mockProjects } from '../data'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProjects([...mockProjects])
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id)
  }

  const createProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setProjects([...projects, newProject])
    return newProject
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(p =>
      p.id === id
        ? { ...p, ...updates, updatedAt: new Date() }
        : p
    ))
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const getProjectsByStatus = (status: ProjectStatus) => {
    return projects.filter(p => p.status === status)
  }

  const getProjectsByMember = (userId: string) => {
    return projects.filter(p => p.teamMembers.includes(userId))
  }

  return {
    projects,
    isLoading,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectsByStatus,
    getProjectsByMember
  }
}
