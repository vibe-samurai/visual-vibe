'use client'

import { Alertpopup, Dialog, Sidebar, SidebarItem, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'

import { useAppSelector } from '@/app/store'
import { useLogout, useSidebarNavigation } from '@/features/auth'
import { selectMeData } from '@/features/auth/model/selectors'
import { getSidebarOptions } from '@/widget/side-nav-bar/options'

import s from './SideNavBar.module.scss'

type Props = {
  isAuth: boolean
}
export const SideNavBar = ({ isAuth = false }: Props) => {
  const meData = useAppSelector(selectMeData)
  const { activeIndex, handleLinkClick } = useSidebarNavigation(meData?.userId || null)
  const { isModalActive, setIsModalActive, alert, handleLogout } = useLogout()

  const sidebarOptions = getSidebarOptions(`${meData?.userId}` || null)

  if (!isAuth) return null

  return (
    <>
      <aside className={s.wrapper}>
        <nav>
          <Sidebar style={{ backgroundColor: '#000000FF' }}>
            {sidebarOptions.map((option, index) => (
              <SidebarItem
                key={index}
                {...option}
                isActive={index === activeIndex}
                LinkComponent={({ href, className, children }) => (
                  <Link
                    href={href}
                    className={className}
                    onClick={() =>
                      index === 7 ? setIsModalActive(true) : handleLinkClick(index, href)
                    }
                  >
                    {children}
                  </Link>
                )}
              />
            ))}
          </Sidebar>
        </nav>
      </aside>
      {isModalActive && (
        <Dialog
          aria-describedby={'logoutDescription'}
          title={'Log out'}
          onClose={() => setIsModalActive(false)}
          confirmButtonText={'Yes'}
          cancelButtonText={'No'}
          onConfirmButtonClick={handleLogout}
          onCancelButtonClick={() => setIsModalActive(false)}
          open={isModalActive}
        >
          <Typography
            id={'logoutDescription'}
            variant={'regular-text-16'}
            style={{ paddingBottom: '30px' }}
          >
            Are you really want to log out of your account{' '}
            <Typography as={'span'} variant={'bold-text-16'}>
              {meData?.email || 'your account'}
            </Typography>
            ?
          </Typography>
        </Dialog>
      )}
      {alert && <Alertpopup alertType={alert.type} message={alert.message} />}
    </>
  )
}
