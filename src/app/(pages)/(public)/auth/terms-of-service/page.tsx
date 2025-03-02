'use client'

import { PageContainer, Terms } from '@/shared/components'
import { PATH } from '@/shared/constants'

export default function TermsOfService() {
  return (
    <PageContainer title={'Back to Sign Up'} backHref={PATH.AUTH.SIGNUP}>
      <Terms />
    </PageContainer>
  )
}
