import React from 'react'
import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Visual Vibe App',
  description: 'Visual Vibe next app',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
