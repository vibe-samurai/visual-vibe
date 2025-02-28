'use client'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useMeQuery } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/PATH'

export default function IndexPage() {
  const { data: me, error, isLoading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (error || !me?.userId) {
      router.push(PATH.MAIN)

      return
    }

    router.push(PATH.HOME)
  }, [isLoading, error, me, router])

  return <Loader />
}
