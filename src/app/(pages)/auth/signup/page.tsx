'use client'

import { Card, Typography, Button, Loader, Dialog } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import { useSignupMutation } from '@/app/services/singup.api.ts/signupApi'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { SignUpForm } from '@/features/auth'
import { resetForm, setForm, SignUpFields, SignUpState } from '@/features/auth/model'
import { signupSelector } from '@/features/auth/model/selectors'
import { PATH } from '@/shared/constants/PATH'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './SignUp.module.scss'

export default function SignUp() {
  const dispatch = useAppDispatch()
  const signup = useAppSelector(signupSelector)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [formState, setFormState] = useState<SignUpState>({})

  const [signUpReq, { isLoading, error }] = useSignupMutation()
  const errorMessage = useRequestError(error)

  useEffect(() => {
    dispatch(setForm(formState))
  }, [formState, dispatch])

  useEffect(() => {
    if (isSubmitSuccess) {
      dispatch(resetForm())
    }
  }, [isSubmitSuccess, dispatch])

  const onSubmit: SubmitHandler<SignUpFields> = async ({ email, password, userName }) => {
    try {
      await signUpReq({ email, password, userName })
      setOpen(true)
      setEmail(email)
    } catch (error) {
      console.error(error)
    }
  }

  function handleModalClosed() {
    setOpen(false)
  }

  return (
    <Card padding={'24px'} className={s.contentWrapper}>
      <Typography variant={'h1'}>Sign Up</Typography>
      <SignUpForm
        signUpState={signup}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        onFormStateChange={setFormState}
        onSuccessSubmit={setIsSubmitSuccess}
      />
      <Typography variant={'regular-text-16'}>Do you have an account?</Typography>
      <Button as={Link} variant={'link'} href={PATH.AUTH.LOGIN} className={s.loginBtn}>
        Sign in
      </Button>
      <Dialog
        open={open}
        showCloseButton
        title={'Email sent'}
        onClose={handleModalClosed}
        onConfirmButtonClick={handleModalClosed}
        size={'md'}
        confirmButtonText={'OK'}
      >
        {`We have sent a link to confirm your email to ${email}`}
      </Dialog>
      {isLoading && <Loader />}
    </Card>
  )
}
