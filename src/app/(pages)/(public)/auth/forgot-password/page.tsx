'use client'

import { Dialog, Card, Typography } from '@vibe-samurai/visual-ui-kit'
import { useState } from 'react'

import ForgotPasswordForm from '@/features/auth/ui/forgot-password/ForgotPasswordForm'

import s from './page.module.scss'

export default function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')

  return (
    <Card padding={'24px'} className={s.cardWrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Forgot Password
      </Typography>
      <ForgotPasswordForm setIsOpenAction={setIsOpen} watchEmailAction={setRecoveryEmail} />
      <Dialog
        className={s.dialogButton}
        title={'Email sent'}
        size={'sm'}
        open={isOpen}
        onConfirmButtonClick={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        confirmButtonText={'OK'}
      >
        We have sent a link to confirm your email to {recoveryEmail}.
      </Dialog>
    </Card>
  )
}
