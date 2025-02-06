import { ReactNode } from 'react'

import s from './EmailLinkExpired.module.scss'

type Props = {
  children: ReactNode
}
export const EmailLinkExpired = (props: Props) => {
  const { children } = props

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h2 className={s.title}>Email verification link expired</h2>
        <p className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        {children}
        <img alt={'email-expired'} className={s.image} src={'/images/email-expired.png'} />
      </div>
    </div>
  )
}
