import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/app/context/AuthContext'
import { useGoogleOAuthMutation } from '@/features/auth/api/authApi'
import { getDecodedToken } from '@/features/auth/utils/getDecodedToken'
import { PATH } from '@/shared/constants/PATH'

export const useGoogleAuth = () => {
  const { setAuth } = useAuth()
  const [authMeGoogle] = useGoogleOAuthMutation()
  const { push } = useRouter()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: error => {
      console.error('Login Failed:', error)
    },
    onSuccess: async (credentialResponse: CodeResponse) => {
      try {
        const { accessToken } = await authMeGoogle({
          code: credentialResponse.code,
        }).unwrap()

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          setAuth(accessToken)
          const userId = getDecodedToken(String(accessToken))

          if (userId) {
            push(`/profile/${userId}`)
          } else {
            push(PATH.AUTH.LOGIN)
          }
        }
      } catch (error) {
        console.error('auth me Error', error)
      }
    },
  })

  return {
    login,
  }
}
