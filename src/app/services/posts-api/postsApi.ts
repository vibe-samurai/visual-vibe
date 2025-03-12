import { Post, PostLikes } from '@/entities/posts/types'

import { vibeVisualApi } from '../vibeVisualApi'

const postsApi = vibeVisualApi.injectEndpoints({
  endpoints: builder => ({
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
  }),
})

export const {
  useGetPostByIdQuery,
  useGetLikesByPostIdQuery,
  useDeletePostByIdMutation,
  useUpdatePostDescriptionMutation,
} = postsApi
