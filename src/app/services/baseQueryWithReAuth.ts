'use client'

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { baseAppApi } from '@/app/services/baseAppApi'
import { UpdateTokenResponse } from '@/app/services/baseAppApi.types'
import { deleteCookie, getCookie, setCookie } from '@/features/auth/utils'
import { BASE_URL, PATH } from '@/shared/constants'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  credentials: 'include',

  prepareHeaders: headers => {
    const token = getCookie('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = (await baseQuery(
          {
            method: 'POST',
            url: PATH.AUTH.UPDATE_TOKENS,
          },
          api,
          extraOptions
        )) as UpdateTokenResponse

        if (refreshResult.data) {
          setCookie('accessToken', refreshResult.data.accessToken.trim(), 7)
          result = await baseQuery(args, api, extraOptions)
        } else {
          baseAppApi.util.resetApiState()

          deleteCookie('accessToken')
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
    }
  }

  return result
}
