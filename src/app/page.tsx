'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useLazyMeQuery } from '@/features/auth/api/authApi'
import { setAuth, setMeData } from '@/features/auth/model/slices/authSlice'

export default function Public() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [getMe] = useLazyMeQuery()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken')

      if (token) {
        try {
          // Запрашиваем данные пользователя
          const userData = await getMe().unwrap()

          // Сохраняем данные в Redux
          dispatch(setMeData(userData))
          dispatch(setAuth(true))

          // Перенаправляем пользователя на главную страницу
          router.push('/home')
        } catch (error) {
          console.log('Failed to fetch user data:', error)

          // Очищаем localStorage и сбрасываем состояние авторизации
          localStorage.removeItem('accessToken')
          dispatch(setAuth(false))
          dispatch(setMeData(null))
        }
      } else {
        // Если токена нет, сбрасываем состояние авторизации
        dispatch(setAuth(false))
        dispatch(setMeData(null))
      }
    }

    fetchUserData()
  }, [dispatch, getMe, router])

  return <div>Public</div>
}
