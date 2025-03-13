import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { ProfilePhoto } from '@/shared/components/profile-photo/ProfilePhoto'
import { formatDate } from '@/shared/lib/date/formatDate'

import s from './PostDescription..module.scss'
import { Post } from '../../types'

type Props = {
  post: Post
}
export const PostDescription = ({ post }: Props) => {
  return (
    <div className={s.description}>
      <ProfilePhoto avatar={post.avatarOwner} />
      <div className={s.descriptionBody}>
        <div className={s.descriptionText}>
          <Typography as={'span'} variant={'bold-text-14'}>
            {post.userName}
          </Typography>
          <Typography as={'span'} variant={'regular-text-14'}>
            {post.description}
          </Typography>
        </div>
        <Typography className={s.descriptionInfo} variant={'small-text'}>
          {formatDate(post.createdAt)}
        </Typography>
      </div>
    </div>
  )
}
