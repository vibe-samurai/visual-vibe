import { vibeVisualApi } from '../vibeVisualApi'

export type EmailConfirmReq = {
  confirmationCode: string
}

const signupApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
    confirmEmail: builder.mutation<void, EmailConfirmReq>({
      query: body => ({
        url: '/v1/auth/registration-confirmation',
        method: 'POST',
        body: { ...body },
      }),
    }),
  }),
})

export const { useConfirmEmailMutation } = signupApi
