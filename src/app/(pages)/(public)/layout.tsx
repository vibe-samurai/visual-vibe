import { ReactNode } from 'react'

import { MainHeader } from '@/widget/main-header'

import s from './PublicLayout.module.scss'

type Props = {
  children: ReactNode
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <MainHeader isAuth={false} />
      <div className={s.publicContent}>{children}</div>
    </>
  )
}
