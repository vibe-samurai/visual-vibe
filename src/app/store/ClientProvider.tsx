'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store/store'
import { MainHeader } from '@/widget/main-header/MainHeader'

import s from './ClientProvider.module.scss'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE || ''

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <div className={s.container}>
          <MainHeader />
          <div className={s.content}>{children}</div>
        </div>
      </Provider>
    </GoogleOAuthProvider>
  )
}
