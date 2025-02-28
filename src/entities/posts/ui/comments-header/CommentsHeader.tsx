import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'
import More from '@/entities/posts/ui/more-button/More'
import ProfilePhoto from '@/shared/components/profile-photo/ProfilePhoto'

import s from './CommentsHeader.module.scss'
import { postSelector } from '../../model/selectors/postSelector'

type Props = {
  post: Post
}
const CommentsHeader = ({ post }: Props) => {
  const editMode = useAppSelector(postSelector).editMode

  return (
    <div className={s.commentsHeader}>
      <ProfilePhoto photo={post.avatarOwner} />
      <Typography variant={'h3'}>{post.userName}</Typography>
      {editMode || <More id={post.id} />}
    </div>
  )
}

export default CommentsHeader
