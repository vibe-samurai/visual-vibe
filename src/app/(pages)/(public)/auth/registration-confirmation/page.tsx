import { redirect } from 'next/navigation'

import { EmailConfirmedContent } from '@/features'
import { PROJECT_API_HOST } from '@/shared'
import { PATH } from '@/shared/constants/PATH'

async function confirmRegistration(code: string) {
  try {
    const response = await fetch(`${PROJECT_API_HOST}/v1/auth/registration-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmationCode: code,
      }),
    })

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`)
    }

    return { success: true, message: 'Confirmation processed' }
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

export default async function EmailConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const { code } = await searchParams

  if (!code) {
    redirect(PATH.AUTH.VERIFICATION_LINK_EXPIRED)
  }

  try {
    await confirmRegistration(code)

    return <EmailConfirmedContent />
  } catch (error) {
    console.error(error)

    redirect(PATH.AUTH.VERIFICATION_LINK_EXPIRED)
  }
}
