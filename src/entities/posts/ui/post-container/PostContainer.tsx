import React from 'react'

import { useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'
import { CommentsContainer } from '@/entities/posts/ui/comments-container/CommentsContainer'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { CloseButton } from '@/shared/components/close-button/CloseButton'
import { PostSlider } from '@/shared/components/post-slider/PostSlider'

import s from './PostContainer.module.scss'
import { postSelector } from '../../model/selectors/postSelector'
import { EditPostHeader } from '../edit-post-header/EditPostHeader'

type Props = {
  post: Post
  closePost: () => void
}

export const PostContainer = ({ post, closePost }: Props) => {
  const editMode = useAppSelector(postSelector).editMode
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <div className={s.postContainer}>
      {editMode || (
        <CloseButton
          onClick={() => {
            closePost()
          }}
        />
      )}
      {editMode && <EditPostHeader />}

      <PostSlider images={post.images} />

      <CommentsContainer post={post} />
    </div>
  )
}
