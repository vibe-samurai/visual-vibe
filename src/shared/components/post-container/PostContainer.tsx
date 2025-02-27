import React from 'react'

import { Post } from '@/entities/posts/types'

import s from './PostContainer.module.scss'
import CommentsContainer from '../comments-container/CommentsContainer'
import EditPostHeader from '../edit-post-header/EditPostHeader'
import PostSlider from '../post-slider/PostSlider'

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
