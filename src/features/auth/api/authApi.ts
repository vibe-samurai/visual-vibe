import { vibeVisualApi } from '@/app/services/vibeVisualApi'
import {
  GoogleOAuthRequest,
  GoogleOAuthResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
} from '@/features/auth/types/authApi.types'

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
    googleOAuth: builder.mutation<GoogleOAuthResponse, GoogleOAuthRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken.trim())
      },

      invalidatesTags: ['Me'],
      query: args => ({
        body: args,
        method: 'POST',
        url: `v1/auth/google/login`,
      }),
    }),
    updateTokens: builder.mutation<void, void>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `v1/auth/update-tokens`,
      }),
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `v1/auth/me`,
      }),
    }),
    logout: builder.mutation<void, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        localStorage.removeItem('accessToken')
        dispatch(authApi.util.resetApiState())
      },
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/logout',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useGoogleOAuthMutation,
  useUpdateTokensMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi
