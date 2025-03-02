'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE || ''

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  )
}
