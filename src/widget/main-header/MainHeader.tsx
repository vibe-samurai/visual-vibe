'use client'

import { Header } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'

import { PATH } from '@/shared/constants'

import s from './MainHeader.module.scss'

type Props = {
  isAuth: boolean
}

export const MainHeader = ({ isAuth = false }: Props) => {
  return (
    <div className={s.wrapper}>
      <Header
        isAuth={isAuth}
        loginLink={PATH.AUTH.LOGIN}
        signupLink={PATH.AUTH.SIGNUP}
        LinkComponent={Link}
      />
    </div>
  )
}
