'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
  icon: React.ReactNode
  roles?: ('admin' | 'manager' | 'user')[]
}

const navLinks: NavLink[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: <Folder className="w-5 h-5" />
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: <CheckSquare className="w-5 h-5" />
  },
  {
    label: 'Team',
    href: '/team',
    icon: <Users className="w-5 h-5" />
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />
  }
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredLinks = navLinks.filter(
    link => !link.roles || link.roles.includes(user?.role as any)
  )

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40 md:z-0 md:relative md:translate-x-0 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 p-6 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-sidebar-primary rounded-md flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
              PM
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">Project Manager</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-sm',
                  isActive(link.href)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          {user && (
            <div className="border-t border-sidebar-border p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">{user.role}</p>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
