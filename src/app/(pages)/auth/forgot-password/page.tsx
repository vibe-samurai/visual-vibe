'use client'

import { Button,  Dialog,  Input,  Modal,  Typography } from '@vibe-samurai/visual-ui-kit'
import { ChangeEvent, useState } from 'react'
import ReCAPTCHA  from 'react-google-recaptcha'

import s from './page.module.scss'

export default function ForgotPassword() {
  const ERROR_MESSAGE = "User with this email doesn't exist"
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [modalMode, setModalMode] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const onChangeRecaptcha = (token: any) => {
    console.log("ReCAPTCHA Token:", token);
  };

  return (
  <div className={s.passwordWrapper}>
    <div className={s.cardWrapper}>
      <Typography  as={"h1"} variant={"h1"}>Forgot Password</Typography>
      <Input onChange={onChangeEmailHandler} type={"email"} errorMessage={errorMessage} label={"Email"} placeholder={"Epam@epam.com"}></Input>
      <Typography className={s.passwordText} variant={"regular-text-14"}>Enter your email address and we will send you further instructions </Typography>
      <div className={s.buttonsColumn}>
        <Button onClick={()=>setModalMode(true)}>
          <Typography variant={"h3"}>Send Link</Typography>
        </Button>
        <Button as={"a"} href={""} variant={"outlined"}>
          <Typography variant={"h3"}>Back to Sign In</Typography>
          </Button>
          <ReCAPTCHA theme={"dark"}   onChange={onChangeRecaptcha} sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}/>
      </div>
      </div>

      <Dialog className={s.passwordDialog} title={"Email sent"} size={"sm"} open={modalMode} onConfirmButtonClick={() => { setModalMode(false) }} onClose={ () => { setModalMode(false) }} confirmButtonText={ 'OK'}>We have sent a link to confirm your email to {email}</Dialog>
     
    </div>
  
  )
}
