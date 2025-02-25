'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { useLogoutMutation } from '@/features/auth/api/authApi'
import { logout, setLoading, setError } from '@/features/auth/model/slices/authSlice'
import { PATH } from '@/shared/constants/PATH'

export const useLogout = () => {
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()
  const { push } = useRouter()

  const handleLogout = async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      await logoutMutation().unwrap()
      dispatch(logout())
    } catch (error) {
      dispatch(setError('Logout failed. Please try again.'))
      throw error
    } finally {
      dispatch(setLoading(false))
      push(PATH.AUTH.LOGIN)
    }
  }

  return { handleLogout }
}
