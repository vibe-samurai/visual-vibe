import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { Post } from '@/entities/posts/types'
import More from '@/entities/posts/ui/more-button/More'
import ProfilePhoto from '@/shared/components/profile-photo/ProfilePhoto'

import s from './CommentsHeader.module.scss'

type Props = {
  post: Post
  editMode: boolean
  setEditMode: () => void
}
const CommentsHeader = ({ post, editMode, setEditMode }: Props) => {
  return (
    <div className={s.commentsHeader}>
      <ProfilePhoto photo={post.avatarOwner} />
      <Typography variant={'h3'}>{post.userName}</Typography>
      {editMode || <More setEditMode={setEditMode} id={post.id} />}
    </div>
  )
}

export default CommentsHeader
