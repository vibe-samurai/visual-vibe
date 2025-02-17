import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/app/services/vibeViualApi.fetch-base-query'

import { NewPasswordData, RecoveryPassword } from './vibeVisual.types'

export const vibeVisualApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    recoveryPassword: build.mutation<void, RecoveryPassword>({
      query: body => ({
        url: 'v1/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    checkRecoveryCode: build.mutation<{ email: string }, { recoveryCode: string }>({
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
    createNewPassword: build.mutation<void, NewPasswordData>({
      query: body => {
        return {
          method: 'POST',
          url: 'v1/auth/new-password',
          body,
        }
      },
    }),
  }),

  reducerPath: 'vibeVisualApi',
  tagTypes: ['Me', 'Profile', 'Sessions', 'Posts', 'Payment', 'Comments'],
})

export const {
  useRecoveryPasswordMutation,
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
} = vibeVisualApi
