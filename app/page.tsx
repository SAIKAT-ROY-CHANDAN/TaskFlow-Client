'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Spinner } from '@/components/ui/spinner'

export default function Page() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/auth/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  )
}
