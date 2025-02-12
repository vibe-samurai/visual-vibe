import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/app/services/vibeViualApi.fetch-base-query'

export const vibeVisualApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    resendVerificationEmail: builder.mutation<void, string>({
      query: (email: string) => ({
        url: '/v1/auth/registration-email-resending',
        method: 'POST',
        body: {
          email,
          baseUrl: 'http://localhost:3000/',
        },
      }),
    }),
  }),
  reducerPath: 'vibeVisualApi',
  tagTypes: ['Me', 'Profile', 'Sessions', 'Posts', 'Payment', 'Comments'],
})

export const { useResendVerificationEmailMutation } = vibeVisualApi
