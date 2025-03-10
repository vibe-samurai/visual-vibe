'use client'

import { PageContainer, Privacy } from '@/shared/components'
import { PATH } from '@/shared/constants/PATH'

export default function PrivacyPolicy() {
  return (
    <PageContainer title={'Back to Sign Up'} backHref={PATH.AUTH.SIGNUP}>
      <Privacy />
    </PageContainer>
  )
}
