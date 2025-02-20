'use client'

import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

import { FormCheckbox, FormInput } from '@/shared'
import { PATH } from '@/shared/constants/PATH'
import { useRequestError } from '@/shared/hooks/useRequestError'

import s from './SignUpForm.module.scss'
import { SignUpFields } from '../../features/auth/model'

type SignUpFormProps<T extends SignUpFields = SignUpFields> = {
  onSubmit: (formData: T) => void
  errorMessage: ReturnType<typeof useRequestError>
  formControlOptions: Pick<UseFormReturn<T>, 'control' | 'handleSubmit' | 'formState'>
} & CheckboxLabelProps

type CheckboxLabelProps = {
  handleTermsClick: () => void
}

export const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit, errorMessage, formControlOptions, handleTermsClick } = props

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = formControlOptions

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
      <FormCheckbox
        control={control}
        name={'agree'}
        label={<CheckboxLabel handleTermsClick={handleTermsClick} />}
      />
      {errorMessage && (
        <Typography variant={'regular-text-16'} className={s.error}>
          {errorMessage}
        </Typography>
      )}
      <Button fullWidth disabled={!isValid}>
        Sign up
      </Button>
    </form>
  )
}

export const CheckboxLabel = ({ handleTermsClick }: CheckboxLabelProps) => (
  <Typography variant={'small-text'}>
    I agree to the{' '}
    <Link href={PATH.AUTH.TERMS_OF_SERVICE} className={s.link} onClick={handleTermsClick}>
      Terms of Service
    </Link>{' '}
    and{' '}
    <Link href={PATH.AUTH.PRIVACY_POLICY} className={s.link} onClick={handleTermsClick}>
      Privacy Policy
    </Link>
  </Typography>
)
