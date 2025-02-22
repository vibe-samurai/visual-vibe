'use client'

import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import s from './ContentWrapper.module.scss'

type Props = {
  title: string
  typographyContent?: React.ReactNode
  content?: React.ReactNode
}

export const ContentWrapper = ({ title, typographyContent, content }: Props) => {
  return (
    <div className={s.container}>
      <Typography as={'h1'} variant={'h1'}>
        {title}
      </Typography>
      <Typography>{typographyContent}</Typography>
      {content}
    </div>
  )
}
