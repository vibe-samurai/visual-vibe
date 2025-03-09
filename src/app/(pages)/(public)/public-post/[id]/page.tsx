'use client'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import React, { use } from 'react'

import { useGetPostByIdQuery } from '@/app/services/vibeVisualApi'
import Post from '@/entities/posts/Post'

type Props = {
  params: Promise<{ id: string }>
}

const PostPage = ({ params }: Props) => {
  const { id } = use(params)
  const postId = +id
  const { data: post, error, isLoading } = useGetPostByIdQuery({ postId })

  if (isLoading) return <Loader />
  if (!post) return <p>Post not found</p>

  return <Post post={post} />
}

export default PostPage
