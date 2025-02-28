import { baseAppApi } from '@/app/services/baseAppApi'
import {
  GoogleOAuthRequest,
  GoogleOAuthResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
} from '@/features/auth/types/authApi.types'
import { deleteCookie, setCookie } from '@/features/auth/utils/cookieUtils'

export const authApi = baseAppApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }
        setCookie('accessToken', data.accessToken.trim(), 7)
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

        setCookie('accessToken', data.accessToken.trim(), 7)
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
        deleteCookie('accessToken')
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
  useLazyMeQuery,
  useLogoutMutation,
} = authApi
