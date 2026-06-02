'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MainLayout } from '@/components/layout/MainLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: true,
    team: true
  })

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Notification settings updated')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                      alt={user?.name}
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <Button variant="outline" disabled={isLoading}>
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={user?.name}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="px-3 py-2 border border-input rounded-md bg-muted text-sm">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={isLoading}>
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates about your tasks</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in the browser</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                {/* Updates */}
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="space-y-1">
                    <Label>Product Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                  />
                </div>

                {/* Team Activity */}
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="space-y-1">
                    <Label>Team Activity</Label>
                    <p className="text-sm text-muted-foreground">Get notified about team member activities</p>
                  </div>
                  <Switch
                    checked={notifications.team}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, team: checked })}
                  />
                </div>

                {/* Save Button */}
                <div className="border-t pt-6">
                  <Button onClick={handleSaveNotifications} disabled={isLoading}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme */}
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'light'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">☀️</div>
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">🌙</div>
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'system'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">⚙️</div>
                      <p className="text-sm font-medium">System</p>
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div className="space-y-2 border-t pt-6">
                  <Label htmlFor="language">Language</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                {/* Timezone */}
                <div className="space-y-2 border-t pt-6">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>UTC</option>
                    <option>EST (UTC-5)</option>
                    <option>CST (UTC-6)</option>
                    <option>PST (UTC-8)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
