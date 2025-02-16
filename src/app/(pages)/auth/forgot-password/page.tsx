'use client'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, Dialog, Input, Card, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm, Controller } from 'react-hook-form'

import { useRecoveryPasswordMutation } from '@/app/services/vibeVisualApi'
import { PATH } from '@/shared/constants/PATH'

import s from './page.module.scss'

type ForgotPasswordFormData = {
  email: string
  recaptcha: string
}

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', recaptcha: '' },
  })

  const [recoveryPassword, { isLoading, isSuccess }] = useRecoveryPasswordMutation()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await recoveryPassword({ ...data, baseUrl: 'http://localhost:3000' }).unwrap()
      setServerError(null)
      setEmail(watch('email'))
      setIsOpen(true)
      recaptchaRef.current?.reset()
      reset()
    } catch (error: FetchBaseQueryError | unknown) {
      if ('data' in (error as FetchBaseQueryError)) {
        const err = error as FetchBaseQueryError

        setServerError(
          (err.data as { messages?: { message?: string }[] })?.messages?.[0]?.message ||
            'Request Error'
        )
      } else {
        setServerError('Unknown Error')
      }
    }
  }

  return (
    <Card padding={'24px'} className={s.cardWrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Forgot Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={s.cardWrapper}>
        <Controller
          name={'email'}
          control={control}
          rules={{
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type={'email'}
              errorMessage={errors.email?.message}
              label={'Email'}
              placeholder={'Epam@epam.com'}
            />
          )}
        />
        {serverError && (
          <Typography variant={'regular-text-14'} className={s.errorText}>
            {serverError}
          </Typography>
        )}
        <Typography className={s.grayText} variant={'regular-text-14'}>
          Enter your email address and we will send you furthe instructions
        </Typography>

        {isSuccess && (
          <div className={s.marginText}>
            <Typography variant={'regular-text-14'}>The link has been sent by email.</Typography>
            <Typography variant={'regular-text-14'}>
              If you don’t receive an email send link again
            </Typography>
          </div>
        )}
        <div className={s.inputsColumn}>
          <Button disabled={isLoading}>
            <Typography variant={'h3'}>{isSuccess ? 'Send Link Again' : 'Send Link'}</Typography>
          </Button>
          <Button as={Link} href={PATH.AUTH.LOGIN} variant={'link'}>
            <Typography variant={'h3'}>Back to Sign In</Typography>
          </Button>
          {errors.recaptcha && (
            <Typography variant={'regular-text-14'} className={s.errorText}>
              {errors.recaptcha.message}
            </Typography>
          )}
          <Controller
            name={'recaptcha'}
            control={control}
            rules={{ required: 'Please complete the reCAPTCHA' }}
            render={({ field }) => (
              <ReCAPTCHA
                ref={recaptchaRef}
                theme={'dark'}
                className={s.centerElement}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}
                onChange={field.onChange}
              />
            )}
          />
        </div>
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
    </Card>
  )
}
