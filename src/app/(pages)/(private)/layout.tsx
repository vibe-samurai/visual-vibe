import { ReactNode } from 'react'

import { MainHeader } from '@/widget/main-header/MainHeader'
import { SideNavBar } from '@/widget/side-nav-bar/SideNavBar'

import s from './AuthorizedLayout.module.scss'

type Props = {
  children: ReactNode
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <MainHeader isAuth />
      <div className={s.container}>
        <div style={{ display: 'flex' }}>
          <SideNavBar isAuth />
          <div className={s.content}>{children}</div>
        </div>
      </div>
    </>
  )
}
