'use client'

import { Button, Input, Modal } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { EmailLinkExpired } from '@/shared/components/email-link-expired/EmailLinkExpired'

import s from './page.module.scss'

import { useResendVerificationEmailMutation } from '@/app/services/vibeVisualApi'

export default function EmailExpired() {
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [resendEmail, { isLoading, error, isSuccess }] = useResendVerificationEmailMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await resendEmail(email).unwrap()
      setEmail('')
    } catch (error) {
      console.error('Failed to resend verification email:', error)
    } finally {
      setOpen(true)
    }
  }

  const handleModalClosed = () => {
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
          <Button variant={'primary'} type={'submit'} fullWidth disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Resend verification link'}
          </Button>
          {isSuccess && (
            <Modal
              open={open}
              showCloseButton
              title={'Email sent'}
              onClose={handleModalClosed}
              size={'md'}
            >
              We have sent a link to confirm your email to {email}
            </Modal>
          )}
          {error && (
            <Modal
              open={open}
              showCloseButton
              title={'Something went wrong'}
              onClose={handleModalClosed}
              size={'md'}
            >
              <div className={s.modal}>
                Please check your email and try again
                <Button variant={'primary'} onClick={handleModalClosed} className={s.button}>
                  OK
                </Button>
              </div>
            </Modal>
          )}
        </form>
      </EmailLinkExpired>
    </>
  )
}
