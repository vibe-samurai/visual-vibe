'use client'

import { Header } from '@vibe-samurai/visual-ui-kit'

import s from './MainHeader.module.scss'

export const MainHeader = () => {
  return (
    <div className={s.wrapper}>
      <Header />
    </div>
  )
}
