'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Typography, Button, Dialog, Loader } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useSignupMutation } from '@/app/services/singup.api.ts/signupApi'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { SignUpForm } from '@/entities'
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

  const { control, handleSubmit, formState, watch, reset } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { ...signupState },
    mode: 'all',
  })

  const [signUpReq, { isLoading, error }] = useSignupMutation()
  const errorMessage = useRequestError(error)

  useEffect(() => {
    const subscription = watch(values => {
      dispatch(setForm(values))
    })

    return () => subscription.unsubscribe()
  }, [dispatch, watch])

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

  function handleModalClosed() {
    setOpen(false)
  }

  return (
    <Card padding={'24px'} className={s.contentWrapper}>
      <Typography variant={'h1'}>Sign Up</Typography>
      <SignUpForm
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        formControlOptions={{ control, handleSubmit, formState }}
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
