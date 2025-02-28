'use client'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useLazyMeQuery } from '@/features/auth/api/authApi'
import { setAuth, setMeData } from '@/features/auth/model/slices/authSlice'
import { deleteCookie, getCookie } from '@/features/auth/utils/cookieUtils'
import { PATH } from '@/shared/constants/PATH'

export default function IndexPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [getMe] = useLazyMeQuery()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie('accessToken')

      if (token) {
        try {
          const userData = await getMe().unwrap()

          dispatch(setMeData(userData))
          dispatch(setAuth(true))

          router.push(PATH.HOME)
        } catch (error) {
          console.warn('Failed to fetch user data:', error)

          deleteCookie('accessToken')
          dispatch(setAuth(false))
          dispatch(setMeData(null))
        }
      } else {
        dispatch(setAuth(false))
        dispatch(setMeData(null))
        router.push(PATH.PUBLIC_PAGE)
      }
    }

    fetchUserData()
  }, [dispatch, getMe, router])

  return <Loader />
}
