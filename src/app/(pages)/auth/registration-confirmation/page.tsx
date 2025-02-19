import { Metadata } from 'next'

import { EmailConfirmedContent } from '@/features'
import { metaDataTitleCreator } from '@/shared/utils/metadataTitleCreator'

export const metadata: Metadata = {
  title: metaDataTitleCreator('Email Confirmed'),
}
export default function EmailConfirmed() {
  return <EmailConfirmedContent />
}
