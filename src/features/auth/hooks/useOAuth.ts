'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import {
  setAuth,
  setError,
  setLoading,
  setMeData,
  setUserId,
  useLazyMeQuery,
} from '@/features/auth'
import { getCookie, getDecodedToken, setCookie } from '@/features/auth/utils'
import { PATH } from '@/shared/constants'

export const useOAuth = () => {
  const [getMe] = useLazyMeQuery()
  const { replace } = useRouter()
  const dispatch = useDispatch()

  const handleOAuth = async (accessToken: string) => {
    if (getCookie('accessToken') === accessToken) {
      return
    }

    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      setCookie('accessToken', accessToken, 7)
      const userId = getDecodedToken(accessToken)

      if (userId) {
        dispatch(setUserId(userId))
      }

      const userData = await getMe().unwrap()

      replace(PATH.HOME, { scroll: false })

      if (userData) {
        dispatch(setMeData(userData))
        dispatch(setAuth(true))
      } else {
        replace(PATH.AUTH.LOGIN, { scroll: false })
      }
    } catch (error) {
      console.error('OAuth Error:', error)
      dispatch(setError('OAuth login failed. Please try again.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    handleOAuth,
  }
}
