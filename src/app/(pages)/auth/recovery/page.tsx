'use client'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, Card, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { AppStore } from '@/app/store/store'

import { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } from './authApi'
import s from './page.module.scss'
import { setRecoveryCode } from './recoverySlice'
export type NewPasswordData = {
  newPassword: string
  recoveryCode: string
}

export default function RecoveryPassword() {
  const router = useRouter()
  const dispatch = useDispatch()
  const recoveryCode = useSelector((state: AppStore) => state.recovery.recoveryCode)

  const [checkRecoverCode, { isLoading, isError }] = useCheckRecoveryCodeMutation()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [serverError, setServerError] = useState<undefined | string>(undefined)

  const searchParams = useSearchParams()

  useEffect(() => {
    // убрать проверку после тестирования
    //   if (!recoveryCode) {
    //    setIsLoadingPage(false)
    // }
    const code = searchParams.get('code')

    if (code && code !== recoveryCode) {
      dispatch(setRecoveryCode(code))
      checkRecoverCode({ recoveryCode: code })
        .unwrap()
        .then(() => {
          setIsLoadingPage(false)
          router.replace('/auth/recovery')
        })
        .catch(() => {
          router.push('/auth/resend-link')
        })
    }
  }, [dispatch, recoveryCode, checkRecoverCode, router, searchParams])

  const {
    control,
    handleSubmit,
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '', passwordConfirmation: '' },
    mode: 'onSubmit',
  })

  const [createNewPassword] = useCreateNewPasswordMutation()
  // const [logout] = useLogoutMutation()

  const onSubmit = async () => {
    const isValid = await trigger('passwordConfirmation')

    if (isValid) {
      const newPassword = getValues('passwordConfirmation')

      try {
        await createNewPassword({ newPassword, recoveryCode }).unwrap()
        reset()
        //logout()
        router.push('/auth/login')
      } catch (error) {
        const err = error as FetchBaseQueryError & { data?: { messages?: { message: string }[] } }

        setServerError(err.data?.messages?.[0]?.message)
      }
    }
  }

  const password = watch('password')

  if (isLoading || isLoadingPage) {
    return <></>
  }

  if (isError) {
    return <div>Error occurred, please try again.</div>
  }

  return (
    <Card padding={'24px'} className={s.wrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Create New Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.buttonsColumn}>
          {' '}
          <Controller
            name={'password'}
            control={control}
            rules={{
              required: { value: true, message: 'Password is required' },
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 20, message: 'Password must be at most 20 characters' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type={'password'}
                errorMessage={errors.password?.message}
                label={'New password'}
                placeholder={'******************'}
              />
            )}
          />
          <Controller
            name={'passwordConfirmation'}
            control={control}
            rules={{
              required: { value: true, message: 'Password is required' },
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 20, message: 'Password must be at most 20 characters' },
              validate: value => value === password || 'The passwords must match',
            }}
            render={({ field }) => (
              <Input
                {...field}
                type={'password'}
                errorMessage={errors.passwordConfirmation?.message}
                label={'Password confirmation'}
                placeholder={'******************'}
              />
            )}
          />
        </div>
        {serverError && (
          <Typography variant={'regular-text-14'} className={s.errorText}>
            {serverError}
          </Typography>
        )}
        <Typography className={s.passwordText} variant={'regular-text-14'}>
          Your password must be between 6 and 20 characters
        </Typography>

        <Button type={'submit'} disabled={false} fullWidth>
          <Typography variant={'h3'}>Create new password</Typography>
        </Button>
      </form>
    </Card>
  )
}
