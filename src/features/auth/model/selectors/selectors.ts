import { AppStore } from '@/app/store/store'

export const selectIsAuthenticated = (state: AppStore) => state.auth.isAuthenticated
export const selectMeData = (state: AppStore) => state.auth.meData
