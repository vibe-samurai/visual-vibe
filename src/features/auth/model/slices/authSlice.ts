import { createSlice } from '@reduxjs/toolkit'

import { MeResponse } from '@/features/auth/types/authApi.types'

interface AuthState {
  isAuthenticated: boolean
  userId: string | null
  isLoading: boolean
  error: string | null
  meData?: MeResponse
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId'),
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setMeData: (state, action) => {
      state.meData = action.payload
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: state => {
      state.isAuthenticated = false
      state.userId = null
      state.meData = undefined
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userId')
    },
  },
})

export const { setAuth, setMeData, setUserId, setLoading, setError, logout } = authSlice.actions
export default authSlice.reducer
export { authSlice }
