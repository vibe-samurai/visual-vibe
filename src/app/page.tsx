'use client'

import { Alertpopup, Button, Dialog, Typography } from '@vibe-samurai/visual-ui-kit'
import { router } from 'next/client'
import { useState } from 'react'

import { useLogoutMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/PATH'

export default function Home() {
  const [logout] = useLogoutMutation()
  const [isModalActive, setIsModalActive] = useState(false)

  const handleLinkClick = () => {
    setIsModalActive(!isModalActive)
  }
  const handleLogOutClick = () => {
    logout()
      .unwrap()
      .then(() => {
        setIsModalActive(false)
        router.push(PATH.AUTH.LOGIN).then(res => {
          return <Alertpopup alertType={'success'} message={'Log out is finished'} />
        })
      })
      .catch(error => {
        return <Alertpopup alertType={'error'} message={error} />
      })
  }

  return (
    <>
      <Button as={'a'} onClick={handleLinkClick}>
        Log out
      </Button>
      <div>Home</div>
      {isModalActive && (
        <Dialog
          title={'Log out'}
          onClose={handleLinkClick}
          confirmButtonText={'Yes'}
          cancelButtonText={'No'}
          onConfirmButtonClick={handleLogOutClick}
          onCancelButtonClick={handleLinkClick}
          open={isModalActive}
        >
          <Typography variant={'regular-text-16'} style={{ paddingBottom: '30px' }}>
            Are you really want to log out of your account{' '}
            <Typography as={'span'} variant={'bold-text-16'}>
              Тут будет адрес юзера :)
            </Typography>
            ?
          </Typography>
        </Dialog>
      )}
    </>
  )
}
