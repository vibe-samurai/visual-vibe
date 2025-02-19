import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/app/services/vibeViualApi.fetch-base-query'

export const vibeVisualApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'vibeVisualApi',
  tagTypes: ['Me', 'Profile', 'Sessions', 'Posts', 'Payment', 'Comments'],
})
