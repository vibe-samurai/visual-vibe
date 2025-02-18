'use client'

import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PATH } from '@/shared/constants/PATH'
import { PATH_PUBLIC } from '@/shared/constants/PATH_PUBLIC'

import s from './EmailConfirmed.module.scss'

export const EmailConfirmedContent = () => (
  <div className={s.contentWrapper}>
    <Typography as={'h1'} variant={'h1'} className={s.title}>
      Congratulations
    </Typography>
    <Typography variant={'bold-text-16'} className={s.text}>
      Your email has been confirmed!
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
