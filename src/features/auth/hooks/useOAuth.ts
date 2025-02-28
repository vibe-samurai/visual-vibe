'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { useLazyMeQuery } from '@/features/auth/api/authApi'
import {
  setAuth,
  setUserId,
  setMeData,
  setLoading,
  setError,
} from '@/features/auth/model/slices/authSlice'
import { getCookie, setCookie } from '@/features/auth/utils/cookieUtils'
import { getDecodedToken } from '@/features/auth/utils/getDecodedToken'
import { PATH } from '@/shared/constants/PATH'

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

      const userData = await getMe().unwrap()

      if (userData) {
        dispatch(setMeData(userData))
        dispatch(setAuth(true))

        const userId = getDecodedToken(accessToken)

        if (userId) {
          dispatch(setUserId(userId))
        }

        replace(PATH.HOME, { scroll: false })
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
