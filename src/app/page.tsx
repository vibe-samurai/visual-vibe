'use client'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setAuth, setMeData, useLazyMeQuery } from '@/features/auth'
import { deleteCookie, getCookie } from '@/features/auth/utils'
import { PATH } from '@/shared/constants'

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
