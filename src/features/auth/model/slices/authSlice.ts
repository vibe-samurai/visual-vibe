import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MeResponse } from '@/features/auth'
import { deleteCookie } from '@/features/auth/utils'

interface AuthState {
  // Общие данные аутентификации
  isAuthenticated: boolean
  userId: string | null
  isLoading: boolean
  error: string | null
  meData?: MeResponse | null

  // Данные для восстановления пароля
  recoveryCode: string
  recoveryEmail: string

  // Данные для регистрации
  signupData: {
    userName?: string
    email?: string
    password?: string
    passwordConfirm?: string
    agree?: boolean
  }
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  isLoading: false,
  error: null,
  meData: null,
  recoveryCode: '',
  recoveryEmail: '',
  signupData: {
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agree: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Общие действия
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setMeData: (state, action: PayloadAction<MeResponse | null>) => {
      state.meData = action.payload
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    logout: state => {
      state.isAuthenticated = false
      state.userId = null
      state.meData = null
      deleteCookie('accessToken')
      deleteCookie('userData')
    },

    // Действия для восстановления пароля
    setRecoveryCode: (state, action: PayloadAction<string>) => {
      state.recoveryCode = action.payload
    },
    setRecoveryEmail: (state, action: PayloadAction<string>) => {
      state.recoveryEmail = action.payload
    },

    // Действия для регистрации
    setSignupForm: (state, action: PayloadAction<AuthState['signupData']>) => {
      state.signupData = action.payload
    },
  },
})

export const {
  setAuth,
  setMeData,
  setUserId,
  setLoading,
  setError,
  logout,
  setRecoveryCode,
  setRecoveryEmail,
  setSignupForm,
} = authSlice.actions

export default authSlice.reducer
