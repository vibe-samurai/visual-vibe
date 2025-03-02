'use client'

import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import {
  setAuth,
  setError,
  setLoading,
  setMeData,
  setUserId,
  useGoogleOAuthMutation,
  useLazyMeQuery,
} from '@/features/auth'
import { getDecodedToken, setCookie } from '@/features/auth/utils'
import { PATH } from '@/shared/constants'

export const useGoogleAuth = () => {
  const [authMeGoogle] = useGoogleOAuthMutation()
  const [getMe] = useLazyMeQuery()
  const { replace } = useRouter()
  const dispatch = useDispatch()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: error => {
      console.error('Login Failed:', error)
      dispatch(setError('Google login failed. Please try again.'))
    },
    onSuccess: async (credentialResponse: CodeResponse) => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const { accessToken } = await authMeGoogle({
          code: credentialResponse.code,
        }).unwrap()

        if (accessToken) {
          setCookie('accessToken', accessToken.trim(), 7)

          const userData = await getMe().unwrap()

          if (userData) {
            dispatch(setMeData(userData))
            dispatch(setAuth(true))

            const userId = getDecodedToken(accessToken)

            if (userId) {
              dispatch(setUserId(userId))
            }

            replace(PATH.HOME)
          } else {
            replace(PATH.AUTH.LOGIN)
          }
        }
      } catch (error) {
        console.error('Google auth Error:', error)
        dispatch(setError('Google login failed. Please try again.'))
      } finally {
        dispatch(setLoading(false))
      }
    },
  })

  return {
    login,
  }
}
