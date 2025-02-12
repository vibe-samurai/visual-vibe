'use client'

import { Alertpopup, Button, Card, Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

import { useLoginMutation } from '@/features/auth/api/authApi'
import { LoginFormValues } from '@/features/auth/model/validationScheme'
import { LoginForm } from '@/features/auth/ui/login/LoginForm'
import { getDecodedToken } from '@/features/auth/utils/getDecodedToken'
import { OAuthBlock } from '@/shared/components'
import { PATH } from '@/shared/constants/PATH'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './LoginPage.module.scss'

export default function Login() {
  const [login, { isError, isLoading, error }] = useLoginMutation()
  const errorMessage = useRequestError(error)
  const { replace } = useRouter()

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    try {
      const data = await login({ email: email!, password: password! }).unwrap()
      const userId = getDecodedToken(data.accessToken)

      replace(`/profile/${userId}`)
    } catch (error) {
      return <Alertpopup alertType={'error'} message={`${error}`} />
    }
  }

  // TODO loading выводить в кастомном loader
  if (isLoading) return <div>loading...</div>

  return (
    <>
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          Sign In
        </Typography>

        <OAuthBlock />

        <LoginForm disabled={isLoading} onSubmit={onSubmit} isError={isError} />

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
