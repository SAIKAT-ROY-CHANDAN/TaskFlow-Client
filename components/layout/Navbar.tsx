'use client'

import { useState } from 'react'
import { Search, Bell, Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface NavbarProps {
  title?: string
}

export function Navbar({ title = 'Dashboard' }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [unreadCount] = useState(2)

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Title */}
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        {/* Center Section - Search */}
        <div className={`flex-1 max-w-2xl mx-4 ${searchOpen ? 'block' : 'hidden md:block'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks, projects..."
              className="pl-10 h-9 bg-muted/50"
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Search Toggle (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold">Notifications</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-2 px-2">
                <p className="text-sm font-medium">Task assigned</p>
                <p className="text-xs text-muted-foreground">You have been assigned to iOS app development</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2 px-2">
                <p className="text-sm font-medium">Project update</p>
                <p className="text-xs text-muted-foreground">Website Redesign is now 65% complete</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm">View all</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
