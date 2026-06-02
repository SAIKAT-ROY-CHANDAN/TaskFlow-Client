'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'user' | 'manager'>('user')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Store user session
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role
      }
      
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } catch (err) {
      setError('Signup failed. Please try again.')
      setIsLoading(false)
    }
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
          <p className="text-muted-foreground">Create a new account</p>
        </div>

        {/* Signup Form */}
        <Card>
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>Join and start managing your projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

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

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3 py-2">
                <label className="text-sm font-medium block">Role</label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as 'user' | 'manager')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="font-normal cursor-pointer">Team Member</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manager" id="manager" />
                    <Label htmlFor="manager" className="font-normal cursor-pointer">Project Manager</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
