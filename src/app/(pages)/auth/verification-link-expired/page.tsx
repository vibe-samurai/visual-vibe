'use client'

import { Button, Input, Modal } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useResendVerificationEmailMutation } from '@/app/services/vibeVisualApi'
import { EmailLinkExpired } from '@/shared/components/email-link-expired/EmailLinkExpired'

import s from './page.module.scss'

export default function EmailExpired() {
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [resendEmail, { isLoading, error, isSuccess }] = useResendVerificationEmailMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await resendEmail(email).unwrap()
    setEmail('')
    setOpen(true)
  }

  function handleModalClosed() {
    setOpen(false)
  }

  return (
    <>
      <EmailLinkExpired>
        <form className={s.formWrapper} onSubmit={handleSubmit}>
          <Input
            className={s.formInput}
            label={'Email'}
            placeholder={'epam@epam.com'}
            title={'Email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            className={s.resentButtton}
            variant={'primary'}
            type={'submit'}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Resend verification link'}
          </Button>
          {isSuccess && (
            <Modal
              open
              showCloseButton
              title={'Email sent'}
              onClose={handleModalClosed}
              size={'md'}
            >
              We have sent a link to confirm your email to epam@epam.com
            </Modal>
          )}
          {error && (
            <Modal
              open
              showCloseButton
              title={'Something went wrong'}
              onClose={handleModalClosed}
              size={'md'}
            >
              Please check your email and try again
            </Modal>
          )}
        </form>
      </EmailLinkExpired>
    </>
  )
}
