import Link from 'next/link'

import { ArrowLeftIcon } from '@public/icon/ArrowLeftIcon'

import s from './ReturnLink.module.scss'

type BackToLink = {
  text: string
  backHref: string
}

export const ReturnLink = ({ text, backHref }: BackToLink) => {
  return (
    <Link href={backHref} className={s['back-to-signup']}>
      <ArrowLeftIcon width={'24'} height={'24'} />
      {text}
    </Link>
  )
}
