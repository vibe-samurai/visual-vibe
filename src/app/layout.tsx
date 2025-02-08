import React from 'react'

import ClientProvider from '@/app/store/ClientProvider'

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
    <html lang={'en'}>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
