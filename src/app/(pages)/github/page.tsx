'use client'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { useOAuth } from '@/features/auth/hooks/useOAuth'
import { PageContainer } from '@/shared/components'
import { PATH } from '@/shared/constants/PATH'

export default function GithubPage() {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const { handleOAuth } = useOAuth()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')

    if (accessToken) {
      handleOAuth(accessToken)
    } else {
      // Если accessToken отсутствует, перенаправляем на страницу входа
      push(PATH.AUTH.LOGIN, { scroll: false })
    }
  }, [push, searchParams, handleOAuth])

  return (
    <PageContainer title={'Back to home page'} backHref={PATH.HOME}>
      <Loader />
      Processing GitHub authorization...
    </PageContainer>
  )
}
