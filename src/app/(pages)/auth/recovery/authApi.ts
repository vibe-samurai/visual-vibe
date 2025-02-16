import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { NewPasswordData } from './page'

export const recoveryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/' }),
  endpoints: build => ({
    checkRecoveryCode: build.mutation<void, { recoveryCode: string }>({
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
  reducerPath: 'recoveryApi',
})

export const { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } = recoveryApi
