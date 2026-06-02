'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Spinner } from '@/components/ui/spinner'

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Navbar */}
        <Navbar title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
