'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useLogoutMutation } from '@/features/auth/api/authApi'
import { logout, setLoading, setError } from '@/features/auth/model/slices/authSlice'
import { PATH } from '@/shared/constants/PATH'

export const useLogout = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()
  const { push } = useRouter()

  const handleLogout = async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      await logoutMutation().unwrap()
      dispatch(logout())
      setIsModalActive(false)
    } catch (error) {
      setAlert({ type: 'error', message: 'Logout failed. Please try again.' })
      console.warn(error)
    } finally {
      dispatch(setLoading(false))
      push(PATH.AUTH.LOGIN)
    }
  }

  return { isModalActive, setIsModalActive, alert, handleLogout }
}
