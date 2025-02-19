'use client'

import { Button } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { EmailLinkExpired } from '@/shared/components/email-link-expired/EmailLinkExpired'

import s from './page.module.scss'

export default function EmailExpired() {
  return (
    <>
      <EmailLinkExpired>
        <form className={s.formWrapper}>
          <Button className={s.resentButtton} variant={'primary'} type={'submit'} fullWidth>
            Resend link
          </Button>
        </form>
      </EmailLinkExpired>
    </>
  )
}
