import { Metadata } from 'next'

import { SignUpPageContent } from '@/features'
import { metaDataTitleCreator } from '@/shared/utils/metadataTitleCreator'

export const metadata: Metadata = {
  title: metaDataTitleCreator('Sign Up'),
}

export default function SignUp() {
  return <SignUpPageContent />
}
