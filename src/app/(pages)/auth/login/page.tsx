'use client'

import { Alertpopup, Button, Card, Loader, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import { useFormAuth } from '@/features/auth/hooks/useFormAuth'
import { LoginFormValues } from '@/features/auth/model/validation/validationScheme'
import { LoginForm } from '@/features/auth/ui/login/LoginForm'
import { OAuthBlock } from '@/shared/components'
import { PATH } from '@/shared/constants/PATH'

import s from './LoginPage.module.scss'

export default function Login() {
  const { login, meErrorMessage, errorMessage } = useFormAuth()
  const { replace } = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    setIsLoading(true)
    setError(null)

    try {
      await login({ email: email!, password: password! })
      replace(PATH.HOME)
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loader />

  return (
    <>
      {meErrorMessage ||
        (errorMessage && (
          <Alertpopup alertType={'error'} message={meErrorMessage || errorMessage} />
        ))}
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          Sign In
        </Typography>

        <OAuthBlock />

        <LoginForm disabled={isLoading} onSubmit={handleSubmit} isError={!!error} />

        <Typography variant={'regular-text-16'} className={s['account-text']}>
          Don’t have an account?
        </Typography>
        <Button asChild variant={'link'}>
          <Link href={PATH.AUTH.SIGNUP}>Sign Up</Link>
        </Button>
      </Card>
    </>
  )
}
