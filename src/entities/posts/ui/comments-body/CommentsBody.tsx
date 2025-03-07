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
  const { data } = useGetCommentsByPostIdQuery({ postId: post.id })

  if (!data) {
    return
  }

  return (
    <div className={s.commentsBody}>
      <Comment
        id={post.id}
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
            id={comment.id}
            commenter
            photo={
              comment.from.avatars?.[1]?.url ||
              comment.from.avatars?.[0]?.url ||
              '/default-avatar.png'
            }
            text={comment.content}
            userName={comment.from.username}
            isLiked={comment.isLiked}
            date={formatDate(comment.createdAt)}
            answerCount={comment.answerCount}
          />
        )
      })}
    </div>
  )
}

export default CommentsBody
