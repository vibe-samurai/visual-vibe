import { AppStore } from '@/app/store'

// Селектор для данных пользователя
export const selectMeData = (state: AppStore) => state.auth.meData

// Селектор для данных восстановления пароля
export const selectRecoveryData = (state: AppStore) => ({
  recoveryCode: state.auth.recoveryCode,
  recoveryEmail: state.auth.recoveryEmail,
})

// Селектор для данных регистрации
export const selectSignupData = (state: AppStore) => state.auth.signupData
