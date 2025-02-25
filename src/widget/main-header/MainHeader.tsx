'use client'

import { Header } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'

import { useAppSelector } from '@/app/store/store'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { PATH } from '@/shared/constants/PATH'

import s from './MainHeader.module.scss'

export const MainHeader = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <div className={s.wrapper}>
      <Header
        isAuth={isAuthenticated}
        loginLink={PATH.AUTH.LOGIN}
        signupLink={PATH.AUTH.SIGNUP}
        LinkComponent={Link}
      />
    </div>
  )
}
