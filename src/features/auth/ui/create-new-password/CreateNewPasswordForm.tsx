'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppSelector } from '@/app/store'
import { errorMessages, password, useCreateNewPasswordMutation } from '@/features/auth'
import { selectRecoveryData } from '@/features/auth/model/selectors'
import { FormInput } from '@/shared/components'
import { PATH } from '@/shared/constants'

import s from './CreateNewPasswordForm.module.scss'

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

export const CreateNewPasswordForm = () => {
  const router = useRouter()
  const [createNewPassword] = useCreateNewPasswordMutation()
  const [serverError, setServerError] = useState<undefined | string>(undefined)
  const recovery = useAppSelector(selectRecoveryData)
  const recoveryCode = recovery.recoveryCode

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
        router.push(PATH.AUTH.LOGIN)
      } catch (error) {
        const err = error as FetchBaseQueryError & { data?: { messages?: { message: string }[] } }

        setServerError(err.data?.messages?.[0]?.message)
      }
    }
  }

  return (
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
  )
}
