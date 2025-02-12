import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { errorMessages, LoginFormValues, loginScheme } from '@/features/auth/model/validationScheme'
import { PATH } from '@/shared/constants/PATH'

import s from './LoginForm.module.scss'

type LoginFormProps = {
  disabled?: boolean

  onSubmit: (formData: LoginFormValues) => void
  isError: boolean
}

export const LoginForm = ({ disabled, onSubmit, isError }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(loginScheme(errorMessages)),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      {/* Input for email */}
      <Input
        className={s.fullWidth}
        type={'email'}
        label={'Email'}
        placeholder={'Email'}
        disabled={disabled}
        {...register('email')}
        onBlur={async () => {
          await trigger('email')
        }}
        errorMessage={(isError || errors.email) && ''}
      />

      {/* Input for password */}
      <Input
        className={s.fullWidth}
        type={'password'}
        label={'Password'}
        placeholder={'********'}
        disabled={disabled}
        {...register('password')}
        onBlur={async () => {
          await trigger('password')
        }}
        errorMessage={
          (isError || errors.password || errors.email) &&
          'The email or password are incorrect. Try again please'
        }
      />

      {/* Forgot password link */}
      <div className={s['forgot-password-wrapper']}>
        <Link href={PATH.AUTH.FORGOT_PASSWORD}>
          <Typography className={s['forgot-password']}>Forgot Password</Typography>
        </Link>
      </div>

      {/* Submit button */}
      <Button variant={'primary'} fullWidth type={'submit'} disabled={disabled || !isValid}>
        Sign In
      </Button>
    </form>
  )
}
