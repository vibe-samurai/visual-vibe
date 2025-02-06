'use client'

import { Button, Input } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { EmailLinkExpired } from '@/shared/components/email-link-expired/EmailLinkExpired'

import s from './page.module.scss'

export default function EmailExpired() {
  return (
    <>
      <EmailLinkExpired>
        <form className={s.formWrapper}>
          <Input
            className={s.formInput}
            label={'Email'}
            placeholder={'epam@epam.com'}
            title={'Email'}
          />
          <Button className={s.resentButtton} variant={'primary'} type={'submit'}>
            Resend verification link
          </Button>
        </form>
      </EmailLinkExpired>
    </>
  )
}
