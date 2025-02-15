import { vibeVisualApi } from '@/app/services/vibeVisualApi'
import { LoginRequest, LoginResponse } from '@/features/auth/types/authApi.types'

export const authApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }
        localStorage.setItem('accessToken', data.accessToken.trim())
      },
      query: body => ({
        url: `v1/auth/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
