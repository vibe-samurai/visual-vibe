'use client'

import { Button, Card, Checkbox, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import Link from 'next/link'

import { PATH } from '@/shared/constants/PATH'

import s from './SignUpForm.module.scss'

export const SignUpForm = () => {
  return (
    <Card padding={'24px'} className={s.contentWrapper}>
      <Typography variant={'h1'}>Sign Up</Typography>
      <form className={s.form}>
        <Input label={'Username'} />
        <Input label={'Email'} type={'email'} />
        <Input label={'Password'} type={'password'} />
        <Input label={'Password Confirmation'} type={'password'} />
        <Checkbox label={<CheckboxLabel />} />
        <Button fullWidth>Sign up</Button>
      </form>
      <Typography variant={'regular-text-16'} className={''}>
        Do you have an account?
      </Typography>
      <Button as={Link} variant={'link'} href={PATH.AUTH.LOGIN} className={s.loginBtn}>
        Sign in
      </Button>
    </Card>
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
