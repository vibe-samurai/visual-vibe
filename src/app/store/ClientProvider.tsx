'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store/store'
import { MainHeader } from '@/widget/main-header/MainHeader'

import s from './ClientProvider.module.scss'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className={s.container}>
        <MainHeader />
        <div className={s.content}>
          <div className={s['main-content']}>{children}</div>
        </div>
      </div>
    </Provider>
  )
}
