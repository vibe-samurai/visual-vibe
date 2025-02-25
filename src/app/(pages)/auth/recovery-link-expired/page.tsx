'use client'
import { Button, Dialog } from '@vibe-samurai/visual-ui-kit'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRecoveryPasswordResendingMutation } from '@/app/services/vibeVisualApi'
import { useAppSelector } from '@/app/store/store'
import { recoverySelector } from '@/features/auth/model/selectors/recoverySelector'
import { EmailLinkExpired } from '@/shared/components/email-link-expired/EmailLinkExpired'

import s from './page.module.scss'

export default function EmailExpired() {
  const [isOpen, setIsOpen] = useState(false)
  const [recoveryPasswordResend] = useRecoveryPasswordResendingMutation()
  const recovery = useAppSelector(recoverySelector)
  const email = recovery.recoveryEmail
  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    if (!email) {
      console.error('Email not found')

      return
    }
    try {
      await recoveryPasswordResend({
        email: email,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
      })
      setIsOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <EmailLinkExpired>
        <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
          <Button className={s.resentButtton} variant={'primary'} fullWidth>
            Resend link
          </Button>
        </form>

        <Dialog
          className={s.dialogButton}
          title={'Email sent'}
          size={'sm'}
          open={isOpen}
          onConfirmButtonClick={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          confirmButtonText={'OK'}
        >
          We have sent a link to confirm your email to {email}.
        </Dialog>
      </EmailLinkExpired>
    </>
  )
}
