import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/app/services/vibeViualApi.fetch-base-query'
import { Post, PostComments, PostLikes } from '@/entities/posts/types'

import {
  NewPasswordData,
  RecoveryPasswordData,
  RecoveryPasswordResending,
} from './vibeVisual.types'

export const vibeVisualApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    resendVerificationEmail: builder.mutation<void, string>({
      query: (email: string) => ({
        url: '/v1/auth/registration-email-resending',
        method: 'POST',
        body: {
          email,
          baseUrl: 'http://localhost:3000/',
        },
      }),
    }),
    recoveryPassword: builder.mutation<void, RecoveryPasswordData>({
      query: body => ({
        url: 'v1/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    checkRecoveryCode: builder.mutation<{ email: string }, { recoveryCode: string }>({
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
    recoveryPasswordResending: builder.mutation<void, RecoveryPasswordResending>({
      query: body => ({
        url: 'v1/auth/password-recovery-resending',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: builder.mutation<void, NewPasswordData>({
      query: body => {
        return {
          method: 'POST',
          url: 'v1/auth/new-password',
          body,
        }
      },
    }),
    getPostById: builder.query<Post, { postId: number }>({
      query: ({ postId }) => ({
        url: `v1/posts/id/${postId}`,
      }),
    }),
    getLikesByPostId: builder.query<PostLikes, { postId: number }>({
      query: ({ postId }) => ({
        url: `v1/posts/${postId}/likes`,
      }),
    }),
    getCommentsByPostId: builder.query<PostComments, { postId: number }>({
      query: ({ postId }) => ({
        url: `v1/posts/${postId}/comments`,
      }),
    }),
    deletePostById: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `v1/posts/${postId}/comments`,
        method: 'DELETE',
      }),
    }),
  }),
  reducerPath: 'vibeVisualApi',
  tagTypes: ['Me', 'Profile', 'Sessions', 'Posts', 'Payment', 'Comments'],
})
export const {
  useResendVerificationEmailMutation,
  useRecoveryPasswordMutation,
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
  useRecoveryPasswordResendingMutation,
  useGetPostByIdQuery,
  useGetCommentsByPostIdQuery,
  useGetLikesByPostIdQuery,
  useDeletePostByIdMutation,
} = vibeVisualApi
