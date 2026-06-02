'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '../types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/auth/login')
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'
  const isManager = user?.role === 'manager'

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isManager,
    logout
  }
}
