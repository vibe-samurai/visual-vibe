import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { LikeButton } from '@/shared/components/like-button/LikeButton'
import ProfilePhoto from '@/shared/components/profile-photo/ProfilePhoto'

import s from './Coment.module.scss'
import { Post } from '../posts/types'
import LikesList from '../posts/ui/likes-list/LikesList'

type Props = {
  commenter?: boolean
  photo: string
  text: string
  userName: string
  likeCount?: number
  isLiked?: boolean
  date: string
  post: Post
}

const Comment = ({
  commenter = true,
  photo,
  text,
  userName,
  likeCount,
  isLiked,
  date,
  post,
}: Props) => {
  return (
    <div className={s.comment}>
      <ProfilePhoto photo={photo} />
      <div className={s.commentBody}>
        <div className={s.commentText}>
          <Typography as={'span'} variant={'bold-text-14'}>
            {userName}
          </Typography>
          <Typography as={'span'} variant={'regular-text-14'}>
            {text}
          </Typography>
        </div>
        <div className={s.commentInfo}>
          <Typography variant={'small-text'}>{date}</Typography>
          {commenter && (
            <Typography as={'button'} variant={'semi-bold-small-text'}>
              Like: {likeCount}
            </Typography>
          )}
          {commenter && (
            <Typography as={'button'} variant={'semi-bold-small-text'}>
              Answer
            </Typography>
          )}
        </div>
      </div>
      {commenter && <LikeButton likeStatus={isLiked} updateLike={() => {}} />}
    </div>
  )
}

export default Comment
