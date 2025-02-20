'use client'

import { Button, Loader, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { useConfirmEmailQuery } from '@/app/services'
import { PATH } from '@/shared/constants/PATH'
import { PATH_PUBLIC } from '@/shared/constants/PATH_PUBLIC'

import s from './EmailConfirmed.module.scss'

const resultText = {
  title: 'Congratulations',
  text: 'Your email has been confirmed!',
}

export const EmailConfirmedContent = () => {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const confirmationCode = searchParams.get('code')

  const { isLoading, isError } = useConfirmEmailQuery({
    confirmationCode: confirmationCode!,
  })

  if (isError) {
    push(PATH.AUTH.VERIFICATION_LINK_EXPIRED)
  }

  if (isLoading || isError) return <Loader />

  return (
    <div className={s.contentWrapper}>
      <Typography as={'h1'} variant={'h1'} className={s.title}>
        {resultText.title}
      </Typography>
      <Typography variant={'bold-text-16'} className={s.text}>
        {resultText.text}
      </Typography>
      <Button as={Link} href={PATH.AUTH.LOGIN} className={s.link}>
        Sign In
      </Button>
      <Image
        src={PATH_PUBLIC.SVG.EMAIL_CONFIRMED.path}
        alt={PATH_PUBLIC.SVG.EMAIL_CONFIRMED.alt}
        width={432}
        height={300}
        priority
      />
    </div>
  )
}
