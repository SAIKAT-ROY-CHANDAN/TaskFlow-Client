'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      if (!email || !password) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      // Store user session in localStorage (demo only)
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: 'user'
      }
      
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } catch (err) {
      setError('Login failed. Please try again.')
      setIsLoading(false)
    }
  }

  const demoLogin = (role: 'admin' | 'manager' | 'user') => {
    const demoUsers = {
      admin: { email: 'admin@example.com', password: 'admin123' },
      manager: { email: 'manager@example.com', password: 'manager123' },
      user: { email: 'user@example.com', password: 'user123' }
    }
    const user = demoUsers[role]
    setEmail(user.email)
    setPassword(user.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block rounded-lg bg-primary/10 p-3 mb-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
              PM
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Project Manager</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue as</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => demoLogin('admin')}
                disabled={isLoading}
                className="text-xs"
              >
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => demoLogin('manager')}
                disabled={isLoading}
                className="text-xs"
              >
                Manager
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => demoLogin('user')}
                disabled={isLoading}
                className="text-xs"
              >
                User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
