import { Answers, PostComments, PostLikes } from '@/entities/posts/types'

import { vibeVisualApi } from '../vibeVisualApi'

const commentsApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
    getCommentsByPostId: builder.query<PostComments, { postId: number }>({
      query: ({ postId }) => ({
        url: `v1/posts/${postId}/comments`,
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
})

export const {
  useGetCommentsByPostIdQuery,
  useLazyGetLikesByCommentIdQuery,
  useGetLikesByCommentIdQuery,
  useLazyGetAnswersLikesByIdQuery,
  useGetAnswersByCommentIdQuery,
  useLazyGetAnswersByCommentIdQuery,
  useGetAnswersLikesByIdQuery,
} = commentsApi
