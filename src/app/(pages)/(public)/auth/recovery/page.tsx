'use client'

import { Card, Typography, Loader } from '@vibe-samurai/visual-ui-kit'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { recoverySelector } from '@/features/auth/model/selectors/recoverySelector'
import { setRecoveryCode, setRecoveryEmail } from '@/features/auth/model/slices/recoverySlice'
import CreateNewPasswordForm from '@/features/auth/ui/create-new-password/CreateNewPasswordForm'
import { PATH } from '@/shared/constants/PATH'

import s from './page.module.scss'

import { useCheckRecoveryCodeMutation } from '@/app/services/vibeVisualApi'

function RecoveryPasswordContent() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const recovery = useAppSelector(recoverySelector)
  const recoveryCode = recovery.recoveryCode

  const [checkRecoverCode, { isLoading }] = useCheckRecoveryCodeMutation()

  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const email = searchParams.get('email')

    if (code && code !== recoveryCode && email) {
      dispatch(setRecoveryCode(code))
      dispatch(setRecoveryEmail(email))
      checkRecoverCode({ recoveryCode: code })
        .unwrap()
        .then(() => {
          setIsLoadingPage(false)
          router.replace(PATH.AUTH.RECOVERY)
        })
        .catch(() => {
          router.push(PATH.AUTH.RECOVERY_LINK_EXPIRED)
        })
    }
  }, [dispatch, checkRecoverCode, router, searchParams, recoveryCode])

  if (isLoading || isLoadingPage) return <Loader />

  return (
    <Card padding={'24px'} className={s.wrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Create New Password
      </Typography>
      <CreateNewPasswordForm />
    </Card>
  )
}

export default function RecoveryPassword() {
  return (
    <Suspense fallback={<Loader />}>
      <RecoveryPasswordContent />
    </Suspense>
  )
}
