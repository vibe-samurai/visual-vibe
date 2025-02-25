import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

import { baseAppApi } from '@/app/services/baseAppApi'
import { authSlice } from '@/features/auth/model/slices/authSlice'
import recoveryReducer, { recoverySlice } from '@/features/auth/model/slices/recoverySlice'
import signupReducer, { signupSlice } from '@/features/auth/model/slices/signupSlice'

export type AppStore = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    [baseAppApi.reducerPath]: baseAppApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [recoverySlice.name]: recoveryReducer,
    [signupSlice.name]: signupReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseAppApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()

setupListeners(store.dispatch)
