'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { useForm, useWatch } from 'react-hook-form'

import { FormCheckbox, FormInput } from '@/shared'
import { PATH } from '@/shared/constants/PATH'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './SignUpForm.module.scss'
import { SignUpFields, signUpSchema, SignUpState } from '../../model'

type SignUpFormProps = {
  onSubmit: (formData: SignUpFields) => void
  signUpState: SignUpState
  errorMessage: ReturnType<typeof useRequestError>
  onFormStateChange: (formState: SignUpState) => void
  onSuccessSubmit: (isSuccess: boolean) => void
}

export const SignUpForm = (props: SignUpFormProps) => {
  const { signUpState, onSubmit, errorMessage, onFormStateChange, onSuccessSubmit } = props

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, isValid },
    reset,
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { ...signUpState },
    mode: 'onTouched',
  })

  const formStateWatcher = useWatch({ control })

  onFormStateChange(formStateWatcher)

  if (isSubmitSuccessful) {
    reset({
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      agree: false,
    })
    onSuccessSubmit(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <FormInput name={'userName'} control={control} label={'Username'} placeholder={'Epam11'} />
      <FormInput name={'email'} control={control} label={'Email'} placeholder={'Epam@epam.com'} />
      <FormInput
        name={'password'}
        control={control}
        label={'Password'}
        type={'password'}
        placeholder={'******************'}
      />
      <FormInput
        name={'passwordConfirm'}
        control={control}
        label={'Password Confirmation'}
        type={'password'}
        placeholder={'******************'}
      />
      <FormCheckbox control={control} name={'agree'} label={<CheckboxLabel />} />
      <Button fullWidth disabled={!isValid}>
        Sign up
      </Button>
      {errorMessage && (
        <Typography variant={'bold-text-16'} className={s.error}>
          {errorMessage}
        </Typography>
      )}
    </form>
  )
}

export const CheckboxLabel = () => (
  <Typography variant={'small-text'}>
    I agree to the{' '}
    <Link href={PATH.AUTH.TERMS_OF_SERVICE} className={s.link}>
      Terms of Service
    </Link>{' '}
    and{' '}
    <Link href={PATH.AUTH.PRIVACY_POLICY} className={s.link}>
      Privacy Policy
    </Link>
  </Typography>
)
