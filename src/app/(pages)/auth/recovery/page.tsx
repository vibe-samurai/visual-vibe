'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, Card, Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

import {
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
} from '@/app/services/vibeVisualApi'
import { AppStore } from '@/app/store/store'
import { errorMessages, password } from '@/features/auth/model/validation/validationScheme'
import { FormInput } from '@/shared/components/form-input/form-input'
import { PATH } from '@/shared/constants/PATH'

import s from './page.module.scss'
import { setRecoveryCode } from './recoverySlice'

const newPasswordSchema = z
  .object({
    password: password(errorMessages.password),
    passwordConfirmation: z.string(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })

type newPasswordValues = z.infer<typeof newPasswordSchema>

export default function RecoveryPassword() {
  const router = useRouter()
  const dispatch = useDispatch()
  const recoveryCode = useSelector((state: AppStore) => state.recovery.recoveryCode)

  const [createNewPassword] = useCreateNewPasswordMutation()

  const [checkRecoverCode, { isLoading }] = useCheckRecoveryCodeMutation()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [serverError, setServerError] = useState<undefined | string>(undefined)
  const searchParams = useSearchParams()

  useEffect(() => {
    //убрать проверку после тестирования
    if (!recoveryCode) {
      setIsLoadingPage(false)
    }
    const code = searchParams.get('code')

    if (code && code !== recoveryCode) {
      dispatch(setRecoveryCode(code))
      checkRecoverCode({ recoveryCode: code })
        .unwrap()
        .then(() => {
          setIsLoadingPage(false)
          router.replace(PATH.AUTH.RECOVERY)
        })
        .catch(() => {
          router.push('/auth/resend-link')
        })
    }
  }, [dispatch, recoveryCode, checkRecoverCode, router, searchParams])

  const { control, handleSubmit, reset, trigger, getValues } = useForm<newPasswordValues>({
    defaultValues: { password: '', passwordConfirmation: '' },
    mode: 'onSubmit',
    resolver: zodResolver(newPasswordSchema),
  })

  const onSubmit = async () => {
    const isValid = await trigger('passwordConfirmation')

    if (isValid) {
      const newPassword = getValues('passwordConfirmation')

      try {
        await createNewPassword({ newPassword, recoveryCode }).unwrap()
        reset()
        //logout()
        router.push(PATH.AUTH.LOGIN)
      } catch (error) {
        const err = error as FetchBaseQueryError & { data?: { messages?: { message: string }[] } }

        setServerError(err.data?.messages?.[0]?.message)
      }
    }
  }

  if (isLoading || isLoadingPage) {
    return <></>
  }

  return (
    <Card padding={'24px'} className={s.wrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Create New Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.buttonsColumn}>
          {' '}
          <FormInput
            name={'password'}
            control={control}
            label={'New password'}
            type={'password'}
            placeholder={'******************'}
          />
          <FormInput
            name={'passwordConfirmation'}
            control={control}
            label={'Password confirmation'}
            type={'password'}
            placeholder={'******************'}
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
