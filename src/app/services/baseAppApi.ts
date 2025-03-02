import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '@/app/services'

export const baseAppApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  reducerPath: 'baseAppApi',
  tagTypes: [
    'Auth',
    'Profile',
    'Posts',
    'Subscriptions',
    'Devices',
    'Notifications',
    'Public-posts',
    'Public-user',
    'Follow',
    'Comments',
    'Me',
  ],
})
