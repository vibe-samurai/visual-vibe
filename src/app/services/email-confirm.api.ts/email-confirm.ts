import { vibeVisualApi } from '../vibeVisualApi'

export type EmailConfirmReq = {
  confirmationCode: string
}

type ConfirmResponse = {
  data: { statusCode: number; messages: Array<{ field: string; message: string }> }
  status: number
}

const signupApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
    confirmEmail: builder.query<void, EmailConfirmReq>({
      query: body => ({
        url: '/v1/auth/registration-confirmation',
        method: 'POST',
        body: { ...body },
      }),
      transformErrorResponse: (response: ConfirmResponse) => response.data.messages[0],
    }),
  }),
})

export const { useConfirmEmailQuery } = signupApi
