'use client'

import { Alertpopup, Button, Card, Loader, Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

import { useAuth } from '@/app/context/AuthContext'
import { LoginFormValues } from '@/features/auth/model/validationScheme'
import { LoginForm } from '@/features/auth/ui/login/LoginForm'
import { getDecodedToken } from '@/features/auth/utils/getDecodedToken'
import { OAuthBlock } from '@/shared/components'
import { PATH } from '@/shared/constants/PATH'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './LoginPage.module.scss'

export default function Login() {
  const { login, isLoading, error } = useAuth()
  const { replace } = useRouter()
  const errorMessage = useRequestError(error)

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    try {
      const data = await login({ email: email!, password: password! })
      const userId = getDecodedToken(data.accessToken)

      replace(`/profile/${userId}`)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  if (isLoading) return <Loader />

  return (
    <>
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          Sign In
        </Typography>

        <OAuthBlock />

        <LoginForm disabled={isLoading} onSubmit={onSubmit} isError={!!error} />

        <Typography variant={'regular-text-16'} className={s['account-text']}>
          Don’t have an account?
        </Typography>
        <Button as={'a'} variant={'link'} href={PATH.AUTH.SIGNUP}>
          Sign Up
        </Button>
      </Card>
    </>
  )
}
