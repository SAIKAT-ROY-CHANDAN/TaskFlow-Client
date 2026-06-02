'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  )
}
