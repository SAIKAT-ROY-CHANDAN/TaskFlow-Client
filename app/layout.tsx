import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { RootLayoutClient } from './layout-client'

export const metadata: Metadata = {
  title: 'Project Manager - Task & Team Management',
  description: 'A modern project and task management application for teams',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <RootLayoutClient>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </RootLayoutClient>
      </body>
    </html>
  )
}
