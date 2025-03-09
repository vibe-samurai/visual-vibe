import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

import { baseAppApi } from '@/app/services/baseAppApi'
import { postSlice } from '@/entities/posts/model'
import { authSlice } from '@/features/auth/model/slices/authSlice'
import recoveryReducer, { recoverySlice } from '@/features/auth/model/slices/recoverySlice'
import signupReducer, { signupSlice } from '@/features/auth/model/slices/signupSlice'

import { vibeVisualApi } from '../services/vibeVisualApi'

export type AppStore = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    [baseAppApi.reducerPath]: baseAppApi.reducer,
    [vibeVisualApi.reducerPath]: vibeVisualApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [recoverySlice.name]: recoveryReducer,
    [signupSlice.name]: signupReducer,
    [postSlice.name]: postSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseAppApi.middleware).concat(vibeVisualApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()

setupListeners(store.dispatch)
