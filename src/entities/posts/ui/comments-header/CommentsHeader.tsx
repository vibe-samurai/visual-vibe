import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'
import More from '@/entities/posts/ui/more-button/More'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { ProfilePhoto } from '@/shared/components/profile-photo/ProfilePhoto'

import s from './CommentsHeader.module.scss'
import { postSelector } from '../../model/selectors/postSelector'

type Props = {
  post: Post
}
export const CommentsHeader = ({ post }: Props) => {
  const editMode = useAppSelector(postSelector).editMode
  const isAuth = useAppSelector(selectIsAuthenticated)

  return (
    <div className={s.commentsHeader}>
      <ProfilePhoto avatar={post.avatarOwner} />
      <Typography variant={'h3'}>{post.userName}</Typography>
      {isAuth && (editMode || <More id={post.id} />)}
    </div>
  )
}
