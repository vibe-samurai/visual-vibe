import { Loader } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useGetCommentsByPostIdQuery } from '@/app/services'
import { Comment } from '@/entities/comment/Comment'
import { Post } from '@/entities/posts/types'

import { PostDescription } from '../post-description'
import s from './CommentsBody.module.scss'
type Props = {
  post: Post
}
export const CommentsBody = ({ post }: Props) => {
  const { data, isLoading } = useGetCommentsByPostIdQuery({ postId: post.id })

  if (isLoading) return <Loader />
  if (!data) {
    return
  }

  return (
    <div className={s.commentsBody}>
      <PostDescription post={post} />
      {data.items.map(comment => {
        return <Comment comment={comment} post={post} key={comment.id} />
      })}
    </div>
  )
}
