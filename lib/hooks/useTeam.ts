'use client'

import { useState, useEffect } from 'react'
import { User } from '../types'
import { mockUsers } from '../data'

export function useTeam() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUsers([...mockUsers])
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const getUserById = (id: string) => {
    return users.find(u => u.id === id)
  }

  const getUsersByRole = (role: string) => {
    return users.filter(u => u.role === role)
  }

  const getUsersByDepartment = (department: string) => {
    return users.filter(u => u.department === department)
  }

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`
    }
    setUsers([...users, newUser])
    return newUser
  }

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(users.map(u =>
      u.id === id
        ? { ...u, ...updates }
        : u
    ))
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return {
    users,
    isLoading,
    getUserById,
    getUsersByRole,
    getUsersByDepartment,
    addUser,
    updateUser,
    deleteUser
  }
}
