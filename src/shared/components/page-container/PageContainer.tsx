'use client'

import React from 'react'

import { ReturnLink } from '@/shared/components'

import s from './PageContainer.module.scss'

type Props = {
  title?: string
  backHref?: string
  children: React.ReactNode
}

export const PageContainer = ({ title, backHref, children }: Props) => {
  return (
    <div className={s.container}>
      {title && backHref && <ReturnLink text={title} backHref={backHref} />}
      {children}
    </div>
  )
}
