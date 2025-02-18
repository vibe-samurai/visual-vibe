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
        body: { ...body, baseUrl: 'http://localhost:3000' },
      }),
    }),
  }),
})

export const { useSignupMutation } = signupApi
