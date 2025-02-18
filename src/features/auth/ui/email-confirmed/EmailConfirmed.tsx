'use client'

import { Alertpopup, Button, Loader, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { useConfirmEmailMutation } from '@/app/services'
import { PATH } from '@/shared/constants/PATH'
import { PATH_PUBLIC } from '@/shared/constants/PATH_PUBLIC'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './EmailConfirmed.module.scss'

const resultText = {
  fail: {
    title: 'Something went wrong!',
  },
  success: {
    title: 'Congratulations',
    text: 'Your email has been confirmed!',
  },
}

export const EmailConfirmedContent = () => {
  const searchParams = useSearchParams()

  const [confirmEmail, { error, isError, isLoading, isUninitialized }] = useConfirmEmailMutation()

  useEffect(() => {
    const confirmationCode = searchParams.get('code')

    async function fetchData() {
      if (confirmationCode) {
        try {
          await confirmEmail({ confirmationCode })
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [])
  const errorMessage = useRequestError(error)

  const title = isError ? resultText.fail.title : resultText.success.title
  const text = isError ? errorMessage : resultText.success.text

  if (isLoading || isUninitialized) return <Loader />

  return (
    <div className={s.contentWrapper}>
      <Typography as={'h1'} variant={'h1'} className={s.title}>
        {title}
      </Typography>
      <Typography variant={'bold-text-16'} className={s.text}>
        {text}
      </Typography>
      {!isError && (
        <Button as={Link} href={PATH.AUTH.LOGIN} className={s.link}>
          Sign In
        </Button>
      )}
      <Image
        src={PATH_PUBLIC.SVG.EMAIL_CONFIRMED.path}
        alt={PATH_PUBLIC.SVG.EMAIL_CONFIRMED.alt}
        width={432}
        height={300}
        priority
      />
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
    </div>
  )
}
