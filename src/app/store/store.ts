import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

import { vibeVisualApi } from '@/app/services/vibeVisualApi'
import { postSlice } from '@/entities/posts/model'
import recoveryReducer, { recoverySlice } from '@/features/auth/model/slices/recoverySlice'
import signupReducer, { signupSlice } from '@/features/auth/model/slices/signupSlice'

export type AppStore = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    [vibeVisualApi.reducerPath]: vibeVisualApi.reducer,
    [recoverySlice.name]: recoveryReducer,
    [signupSlice.name]: signupReducer,
    [postSlice.name]: postSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vibeVisualApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()

setupListeners(store.dispatch)
