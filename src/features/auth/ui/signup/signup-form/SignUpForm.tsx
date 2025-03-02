'use client'

import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

import { SignUpFields } from '@/features/auth'
import { FormCheckbox, FormInput } from '@/shared/components'
import { PATH } from '@/shared/constants'
import { useRequestError } from '@/shared/hooks'

import s from './SignUpForm.module.scss'

type SignUpFormProps<T extends SignUpFields = SignUpFields> = {
  onSubmit: (formData: T) => void
  errorMessage: ReturnType<typeof useRequestError>
  formControlOptions: Pick<UseFormReturn<T>, 'control' | 'handleSubmit' | 'formState'>
} & CheckboxLabelProps

type CheckboxLabelProps = {
  handleTermsClickAction: () => void
}

export const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit, errorMessage, formControlOptions, handleTermsClickAction } = props

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
        label={<CheckboxLabel handleTermsClickAction={handleTermsClickAction} />}
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

export const CheckboxLabel = ({ handleTermsClickAction }: CheckboxLabelProps) => (
  <Typography variant={'small-text'}>
    I agree to the{' '}
    <Link href={PATH.AUTH.TERMS_OF_SERVICE} className={s.link} onClick={handleTermsClickAction}>
      Terms of Service
    </Link>{' '}
    and{' '}
    <Link href={PATH.AUTH.PRIVACY_POLICY} className={s.link} onClick={handleTermsClickAction}>
      Privacy Policy
    </Link>
  </Typography>
)
