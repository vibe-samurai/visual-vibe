'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { getDecodedToken } from '@/features/auth/utils/getDecodedToken'
import { PageContainer } from '@/shared/components'
import { PATH } from '@/shared/constants/PATH'

export default function GithubPage() {
  const { push } = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')

    if (accessToken) {
      try {
        localStorage.setItem('accessToken', accessToken)
        const userId = getDecodedToken(String(accessToken))

        if (userId) {
          push(`/profile/${userId}`)
        } else {
          console.error('Ошибка: userId не найден')
          push(PATH.AUTH.LOGIN)
        }
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error)
        push(PATH.AUTH.LOGIN)
      }
    }
  }, [push, searchParams])

  return (
    <PageContainer title={'Back to home page'} backHref={PATH.HOME}>
      Processing GitHub authorization...
    </PageContainer>
  )
}
