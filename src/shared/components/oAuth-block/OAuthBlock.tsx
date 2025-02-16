import React from 'react'

import { useGoogleAuth } from '@/features/auth/hooks/useGoogleAuth'
import GithubIcon from '@public/icon/GithubIcon'
import GoogleIcon from '@public/icon/GoogleIcon'

import s from './OAuthBlock.module.scss'

export const OAuthBlock = () => {
  const { login } = useGoogleAuth()

  const handleGoogleAuthClick = () => login()

  const handleGithubAuthClick = () => {
    window.location.assign(
      'https://inctagram.work/api/v1/auth/github/login?http://localhost:3000/github'
    )
  }

  return (
    <div className={s['auth-providers']}>
      <GoogleIcon onClick={handleGoogleAuthClick} className={s.icon} />
      <GithubIcon onClick={handleGithubAuthClick} className={s.icon} />
    </div>
  )
}
