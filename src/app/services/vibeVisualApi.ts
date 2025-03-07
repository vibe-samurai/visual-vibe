import { createApi } from '@reduxjs/toolkit/query/react'

import { Answers, Post, PostComments, PostLikes } from '@/entities/posts/types'

import { baseQueryWithReAuth } from './BaseQueryWithReAuth'
import {
  NewPasswordData,
  RecoveryPasswordData,
  RecoveryPasswordResending,
} from './vibeVisual.types'

export const vibeVisualApi = createApi({
  baseQuery: baseQueryWithReAuth,
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
    updatePostDescription: builder.mutation<void, { description: string; postId: number }>({
      query: ({ description, postId }) => ({
        url: `v1/posts/${postId}`,
        method: 'PUT',
        body: description,
      }),
    }),
    getLikesByCommentId: builder.query<PostLikes, { postId: number; commentId: number }>({
      query: ({ postId, commentId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/likes`,
      }),
    }),
    getAnswersByCommentId: builder.query<Answers, { postId: number; commentId: number }>({
      query: ({ postId, commentId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    getAnswersLikesById: builder.query<
      PostLikes,
      { postId: number; commentId: number; answerId: number }
    >({
      query: ({ postId, commentId, answerId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
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
  useUpdatePostDescriptionMutation,
  useGetLikesByCommentIdQuery,
  useGetAnswersByCommentIdQuery,
  useGetAnswersLikesByIdQuery,
} = vibeVisualApi
