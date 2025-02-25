'use client'

import { Alertpopup, Dialog, Sidebar, SidebarItem, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/store/store'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { selectIsAuthenticated, selectMeData } from '@/features/auth/model/selectors/selectors'
import { getSidebarOptions } from '@/widget/side-nav-bar/options/getSidebarOptions'

import s from './SideNavBar.module.scss'

export const SideNavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const meData = useAppSelector(selectMeData)
  const [isModalActive, setIsModalActive] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const router = useRouter()

  const { handleLogout } = useLogout()

  const handleLinkClick = (index: number, href: string, userId: number | string) => {
    setActiveIndex(index)

    if (index === 2) {
      router.replace(`${href}/${userId}`)
    } else {
      router.replace(href)
    }
  }

  const handleLogOutClick = async () => {
    try {
      await handleLogout()
      setIsModalActive(false)
    } catch (error) {
      setAlert({ type: 'error', message: 'Logout failed. Please try again.' })
      console.error('Logout failed: ', error)
    }
  }

  const closeModal = () => {
    setIsModalActive(false)
  }

  const sidebarOptions = getSidebarOptions(`${meData?.userId}` || null)

  return (
    isAuthenticated && (
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
                        index === 7
                          ? setIsModalActive(true)
                          : handleLinkClick(index, href, meData?.userId || '')
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
            onClose={closeModal}
            confirmButtonText={'Yes'}
            cancelButtonText={'No'}
            onConfirmButtonClick={handleLogOutClick}
            onCancelButtonClick={closeModal}
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
  )
}
