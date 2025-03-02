'use client'

import { PageContainer, Privacy } from '@/shared/components'
import { PATH } from '@/shared/constants'

export default function PrivacyPolicy() {
  return (
    <PageContainer title={'Back to Sign Up'} backHref={PATH.AUTH.SIGNUP}>
      <Privacy />
    </PageContainer>
  )
}
