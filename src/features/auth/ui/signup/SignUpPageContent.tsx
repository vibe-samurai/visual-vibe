'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Typography, Button, Dialog, Loader } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { useSignupMutation } from '@/features/auth/api'
import { OAuthBlock } from '@/shared'
import { SignUpForm } from '@/shared/components/signup-form'
import { PATH } from '@/shared/constants/PATH'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './SignUpPageContent.module.scss'
import { SignUpFields, signUpSchema, setForm } from '../../model'
import { signupSelector } from '../../model/selectors'

export const SignUpPageContent = () => {
  const dispatch = useAppDispatch()
  const signupState = useAppSelector(signupSelector)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  const { control, handleSubmit, formState, reset, getValues } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { ...signupState },
    mode: 'all',
  })

  const [signUpReq, { isLoading, error }] = useSignupMutation()
  const errorMessage = useRequestError(error)

  const onSubmit = useCallback<SubmitHandler<SignUpFields>>(
    async ({ email, password, userName }) => {
      try {
        const res = await signUpReq({ email, password, userName })

        if (!res.error) {
          setOpen(true)
          setEmail(email)
          reset()
        }
      } catch (error) {
        console.error(error)
      }
    },
    [signUpReq, reset]
  )

  const handleModalClosed = () => {
    setOpen(false)
  }

  const handleTermsClick = () => {
    dispatch(setForm(getValues()))
  }

  return (
    <Card padding={'24px'} className={s.contentWrapper}>
      <Typography variant={'h1'}>Sign Up</Typography>
      <OAuthBlock />
      <SignUpForm
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        formControlOptions={{ control, handleSubmit, formState }}
        handleTermsClick={handleTermsClick}
      />
      <Typography variant={'regular-text-16'}>Do you have an account?</Typography>
      <Button asChild variant={'link'} className={s.loginBtn}>
        <Link href={PATH.AUTH.LOGIN}>Sign In</Link>
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
