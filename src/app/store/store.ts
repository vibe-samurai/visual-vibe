import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

import { vibeVisualApi } from '@/app/services/vibeVisualApi'
import signupReducer, { signupSlice } from '@/features/auth/model/slices/signupSlice'

export type AppStore = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    [vibeVisualApi.reducerPath]: vibeVisualApi.reducer,
    [signupSlice.name]: signupReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vibeVisualApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()

setupListeners(store.dispatch)
