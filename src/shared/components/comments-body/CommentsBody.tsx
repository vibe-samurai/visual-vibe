import React from 'react'

import { useGetCommentsByPostIdQuery } from '@/app/services/vibeVisualApi'
import Comment from '@/entities/comment/Comment'
import { Post } from '@/entities/posts/types'
import { formatDate } from '@/shared/lib/date/formatDate'

import s from './CommentsBody.module.scss'
type Props = {
  post: Post
}
const CommentsBody = ({ post }: Props) => {
  const { data, error, isLoading } = useGetCommentsByPostIdQuery({ postId: post.id })

  if (!data) {
    return
  }

  return (
    <div className={s.commentsBody}>
      <Comment
        post={post}
        commenter={false}
        photo={post.avatarOwner}
        text={post.description}
        userName={post.userName}
        date={formatDate(post.createdAt)}
      />
      {data.items.map((comment, index) => {
        return (
          <Comment
            post={post}
            key={index}
            commenter
            photo={
              comment.from.avatars?.[1]?.url ||
              comment.from.avatars?.[0]?.url ||
              '/default-avatar.png'
            }
            text={comment.content}
            userName={comment.from.username}
            isLiked={comment.isLiked}
            likeCount={comment.likeCount}
            date={formatDate(comment.createdAt)}
          />
        )
      })}
    </div>
  )
}

export default CommentsBody
