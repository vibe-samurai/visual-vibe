'use client'

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { UpdateTokenResponse } from '@/app/services/vibeVisual.types'
import { vibeVisualApi } from '@/app/services/vibeVisualApi'
import { PATH } from '@/shared/constants/PATH'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/',

  credentials: 'include',

  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

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
          localStorage.setItem('accessToken', refreshResult.data.accessToken.trim())
          result = await baseQuery(args, api, extraOptions)
        } else {
          vibeVisualApi.util.resetApiState()
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
