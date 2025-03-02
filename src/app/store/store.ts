import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import { baseAppApi } from '@/app/services'
import authReducer from '@/features/auth/model/slices/authSlice'

export const store = configureStore({
  reducer: {
    [baseAppApi.reducerPath]: baseAppApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseAppApi.middleware),
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector

setupListeners(store.dispatch)
