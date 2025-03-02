import { Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import { ReactNode } from 'react'

import s from './EmailLinkExpired.module.scss'

type Props = {
  children: ReactNode
}

export const EmailLinkExpired = ({ children }: Props) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant={'h2'} className={s.title}>
          Email verification link expired
        </Typography>
        <Typography variant={'regular-text-16'} className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again.
        </Typography>
        {children}
        <Image
          alt={'email-expired'}
          className={s.image}
          width={473}
          height={352}
          src={'/images/email-expired.png'}
        />
      </div>
    </div>
  )
}
