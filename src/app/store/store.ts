import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'

import recoveryReducer from '@/app/(pages)/auth/recovery/recoverySlice'
import { vibeVisualApi } from '@/app/services/vibeVisualApi'

export type AppStore = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    [vibeVisualApi.reducerPath]: vibeVisualApi.reducer,
    recovery: recoveryReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vibeVisualApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

setupListeners(store.dispatch)
