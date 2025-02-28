import React from 'react'

import { Post } from '@/entities/posts/types'
import CommentsContainer from '@/entities/posts/ui/comments-container/CommentsContainer'
import PostSlider from '@/shared/components/post-slider/PostSlider'

import s from './PostContainer.module.scss'
import EditPostHeader from '../edit-post-header/EditPostHeader'

type Props = {
  post: Post
  editMode: boolean
  confirmClosePost: () => void
  setEditMode: () => void
}

const PostContainer = ({ post, editMode, confirmClosePost, setEditMode }: Props) => {
  return (
    <div className={s.postContainer}>
      {editMode && <EditPostHeader confirmClosePost={confirmClosePost} />}

      <PostSlider images={post.images} />

      <CommentsContainer setEditMode={setEditMode} post={post} editMode={editMode} />
    </div>
  )
}

export default PostContainer
