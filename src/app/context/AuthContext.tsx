'use client'

import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { useLoginMutation, useLogoutMutation } from '@/features/auth/api/authApi'
import { LoginRequest, LoginResponse } from '@/features/auth/types/authApi.types'
import { PATH } from '@/shared/constants/PATH'

interface AuthContextType {
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<LoginResponse>
  logout: () => Promise<void>
  setAuth: (token: string) => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()
  const { push } = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (!isAuthenticated && token) {
      setIsAuthenticated(true)
    }
  }, [isAuthenticated])

  const setAuth = (accessToken: string) => {
    setIsAuthenticated(!!accessToken)
  }

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await loginMutation(credentials).unwrap()

      if (result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken.trim())
        setIsAuthenticated(true)
      }

      return result
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await logoutMutation().unwrap()
      localStorage.removeItem('accessToken')
      setIsAuthenticated(false)
    } catch (error) {
      setError('Logout failed. Please try again.')
      throw error
    } finally {
      setIsLoading(false)
      push(PATH.AUTH.LOGIN)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, error, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
