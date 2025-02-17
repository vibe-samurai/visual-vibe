'use client'

import { Header } from '@vibe-samurai/visual-ui-kit'

import { useAuth } from '@/app/context/AuthContext'

import s from './MainHeader.module.scss'

export const MainHeader = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className={s.wrapper}>
      <Header isAuth={isAuthenticated} />
    </div>
  )
}
