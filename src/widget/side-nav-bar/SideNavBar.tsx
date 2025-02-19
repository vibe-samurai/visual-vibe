'use client'

import {
  Alertpopup,
  Dialog,
  Loader,
  Sidebar,
  SidebarItem,
  Typography,
} from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAuth } from '@/app/context/AuthContext'
import { useMeQuery } from '@/features/auth/api/authApi'
import { sidebarOptions } from '@/widget/side-nav-bar/options/sidebarOptions'

import s from './SideNavBar.module.scss'

export const SideNavBar = () => {
  const { logout, isLoading: isAuthLoading, isAuthenticated } = useAuth()
  const { data: meData, isLoading: isMeLoading } = useMeQuery()
  const [isModalActive, setIsModalActive] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const router = useRouter()

  const isLoading = isAuthLoading || isMeLoading

  const handleLinkClick = (index: number, href: string) => {
    setActiveIndex(index)
    if (index !== 7) {
      router.push(href)
    }
  }

  const handleLogOutClick = async () => {
    try {
      await logout()
      setIsModalActive(false)
    } catch (error) {
      setAlert({ type: 'error', message: 'Logout failed. Please try again.' })
    }
  }

  const closeModal = () => {
    setIsModalActive(false)
  }

  if (isLoading) return <Loader />

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
