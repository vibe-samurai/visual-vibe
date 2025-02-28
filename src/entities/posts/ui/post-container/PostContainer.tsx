import React from 'react'

import { useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'
import CommentsContainer from '@/entities/posts/ui/comments-container/CommentsContainer'
import PostSlider from '@/shared/components/post-slider/PostSlider'

import s from './PostContainer.module.scss'
import { postSelector } from '../../model/selectors/postSelector'
import EditPostHeader from '../edit-post-header/EditPostHeader'

type Props = {
  post: Post
}

const PostContainer = ({ post }: Props) => {
  const editMode = useAppSelector(postSelector).editMode

  return (
    <div className={s.postContainer}>
      {editMode && <EditPostHeader />}

      <PostSlider images={post.images} />

      <CommentsContainer post={post} />
    </div>
  )
}

export default PostContainer
