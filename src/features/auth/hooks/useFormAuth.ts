'use client'

import { useDispatch } from 'react-redux'

import { useLazyMeQuery, useLoginMutation } from '@/features/auth/api/authApi'
import {
  setAuth,
  setUserId,
  setLoading,
  setError,
  setMeData,
} from '@/features/auth/model/slices/authSlice'
import { LoginRequest } from '@/features/auth/types/authApi.types'
import { setCookie } from '@/features/auth/utils/cookieUtils'
import { getDecodedToken } from '@/features/auth/utils/getDecodedToken'
import { useRequestError } from '@/shared/hooks/useRequestError'

export const useFormAuth = () => {
  const dispatch = useDispatch()
  const [loginMutation, { error }] = useLoginMutation()
  const [getMe, { error: meError }] = useLazyMeQuery()
  const errorMessage = useRequestError(error)
  const meErrorMessage = useRequestError(meError)

  const login = async (credentials: LoginRequest) => {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const result = await loginMutation(credentials).unwrap()
      const resMe = await getMe().unwrap()

      if (resMe) {
        dispatch(setMeData(resMe))
        dispatch(setAuth(true))
      } else if (result.accessToken) {
        setCookie('accessToken', result.accessToken.trim(), 7)
        dispatch(setAuth(true))
        const userId = getDecodedToken(result.accessToken)

        dispatch(setUserId(userId))
      }

      return result
    } catch (error) {
      dispatch(setError('Login failed. Please check your credentials and try again.'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { login, errorMessage, meErrorMessage }
}
