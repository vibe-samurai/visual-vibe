'use client'

import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PATH, PATH_PUBLIC } from '@/shared/constants'

import s from './EmailConfirmed.module.scss'

const resultText = {
  title: 'Congratulations',
  text: 'Your email has been confirmed!',
}

export const EmailConfirmedContent = () => {
  return (
    <div className={s.contentWrapper}>
      <Typography as={'h1'} variant={'h1'} className={s.title}>
        {resultText.title}
      </Typography>
      <Typography variant={'bold-text-16'} className={s.text}>
        {resultText.text}
      </Typography>
      <Button asChild className={s.link}>
        <Link href={PATH.AUTH.LOGIN}>Sign In</Link>
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
