'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, Dialog, Card, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import { useRecoveryPasswordMutation } from '@/app/services/vibeVisualApi'
import { errorMessages, email } from '@/features/auth/model/validation/validationScheme'
import { FormInput } from '@/shared/components/form-input/form-input'
import { PATH } from '@/shared/constants/PATH'

import s from './page.module.scss'

type ForgotPasswordFormData = {
  email: string
  recaptcha: string
}

const forgotPasswordSchema = z.object({
  email: email(errorMessages.email),
  recaptcha: z.string().min(1, { message: 'Please complete the reCAPTCHA' }),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const [recoveryPassword, { isLoading, isSuccess }] = useRecoveryPasswordMutation()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [serverError, setServerError] = useState<string | undefined>(undefined)
  const [currentEmail, setCurrentEmail] = useState<string>('')

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    defaultValues: { email: '', recaptcha: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await recoveryPassword({
        ...data,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
      }).unwrap()
      setServerError(undefined)
      setCurrentEmail(watch('email'))
      setIsOpen(true)
      recaptchaRef.current?.reset()
      reset()
    } catch (error) {
      const err = error as FetchBaseQueryError & { data?: { messages?: { message: string }[] } }

      setServerError(err.data?.messages?.[0]?.message)
    }
  }

  return (
    <Card padding={'24px'} className={s.cardWrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Forgot Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={s.cardWrapper}>
        <FormInput
          name={'email'}
          control={control}
          label={'Email'}
          type={'email'}
          placeholder={'Epam@epam.com'}
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
            <Typography className={s.errorText} variant={'regular-text-14'}>
              {errors.recaptcha?.message}
            </Typography>
          )}

          <Controller
            name={'recaptcha'}
            control={control}
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
        We have sent a link to confirm your email to {currentEmail}.
      </Dialog>
    </Card>
  )
}
