import {
  NewPasswordData,
  RecoveryPasswordData,
  RecoveryPasswordResending,
} from '../baseAppApi.types'
import { vibeVisualApi } from '../vibeVisualApi'

const recoveryPasswordApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
    recoveryPassword: builder.mutation<void, RecoveryPasswordData>({
      query: body => ({
        url: 'v1/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    checkRecoveryCode: builder.mutation<{ email: string }, { recoveryCode: string }>({
      query: ({ recoveryCode }) => {
        return {
          method: 'POST',
          url: 'v1/auth/check-recovery-code',
          body: {
            recoveryCode,
          },
        }
      },
    }),
    recoveryPasswordResending: builder.mutation<void, RecoveryPasswordResending>({
      query: body => ({
        url: 'v1/auth/password-recovery-resending',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: builder.mutation<void, NewPasswordData>({
      query: body => {
        return {
          method: 'POST',
          url: 'v1/auth/new-password',
          body,
        }
      },
    }),
  }),
})

export const {
  useRecoveryPasswordMutation,
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
  useRecoveryPasswordResendingMutation,
} = recoveryPasswordApi
