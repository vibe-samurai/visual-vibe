'use client'

import { Button, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import s from './page.module.scss'
import { useState } from 'react'

export default function ForgotPassword() {
  const ERROR_MESSAGE = "User with this email doesn't exist"
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  return (
  <div className={s.forgotPasswordWrapper}>
    <div className={s.cardWrapper}>
      <Typography className={s.forgotPasswordTitle} as='h1' variant='h1'>Forgot Password</Typography>
      <Input type='email' errorMessage={errorMessage} label='Email' placeholder='Epam@epam.com'></Input>
      <Typography className={s.forgotPasswordText} variant='regular-text-14'>Enter your email address and we will send you further instructions </Typography>
      <div className={s.buttonsColumn}>
        <Button>
          <Typography variant='h3'>Send Link</Typography>
        </Button>
        <Button as='a' variant='outlined'>
          <Typography variant='h3'>Back to Sign In</Typography>
          </Button>
          <div>Recaptcha</div>
      </div>
      </div>
      </div>
  )
}
