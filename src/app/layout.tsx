import React from 'react'

import ClientProvider from '@/app/store/ClientProvider'
import { PROJECT_TITLE } from '@/shared/constants/CONSTANTS'

import type { Metadata } from 'next'

import './globals.scss'

export const metadata: Metadata = {
  title: PROJECT_TITLE,
  description: 'Visual Vibe Next App',
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
