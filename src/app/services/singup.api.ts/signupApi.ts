import { PROJECT_HOST } from '@/shared'

import { vibeVisualApi } from '../vibeVisualApi'

export type SignUpReq = {
  userName: string
  email: string
  password: string
}

const signupApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<void, SignUpReq>({
      query: body => ({
        url: '/v1/auth/registration',
        method: 'POST',
        body: { ...body, baseUrl: PROJECT_HOST },
      }),
    }),
  }),
})

export const { useSignupMutation } = signupApi
