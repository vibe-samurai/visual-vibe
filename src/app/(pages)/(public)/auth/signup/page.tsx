import { Metadata } from 'next'

import { SignUpPageContent } from '@/features/auth'
import { metaDataTitleCreator } from '@/shared/utils'

export const metadata: Metadata = {
  title: metaDataTitleCreator('Sign Up'),
}

export default function SignUp() {
  return <SignUpPageContent />
}
