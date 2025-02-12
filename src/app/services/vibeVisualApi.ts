import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/app/services/vibeViualApi.fetch-base-query'

export const vibeVisualApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    recoveryPassword: build.mutation<{ email: string }, { email: string; recaptcha: string }>({
      query: body => ({
        url: 'v1/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
  }),
  reducerPath: 'vibeVisualApi',
  tagTypes: ['Me', 'Profile', 'Sessions', 'Posts', 'Payment', 'Comments'],
})

export const { useRecoveryPasswordMutation } = vibeVisualApi
