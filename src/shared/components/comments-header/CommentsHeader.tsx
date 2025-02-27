import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import More from '@/app/(pages)/post/my-post/More'
import { Post } from '@/entities/posts/types'

import s from './CommentsHeader.module.scss'
import ProfilePhoto from '../profile-photo/ProfilePhoto'
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
