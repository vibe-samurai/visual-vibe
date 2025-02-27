import { useState } from 'react'

import CloseButton from '@/shared/components/close-button/CloseButton'
import ConfirmCloseDialog from '@/shared/components/confirm-close-dialog/ConfirmCloseDialog'
import PostContainer from '@/shared/components/post-container/PostContainer'
import TransparentBackground from '@/shared/components/transparent-background/TransparentBackground'

import { Post } from './types'

type Props = {
  post: Post
}

export const PostComponent = ({ post }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [confirmClosePost, setConfirmClosePost] = useState(false)

  const editModeHandler = () => {
    setEditMode(!editMode)
  }

  return (
    <TransparentBackground isOpen={isOpen}>
      {editMode || <CloseButton onClick={() => setIsOpen(false)} />}

      <PostContainer
        setEditMode={editModeHandler}
        post={post}
        editMode={editMode}
        confirmClosePost={() => {
          setConfirmClosePost(!confirmClosePost)
        }}
      />

      {confirmClosePost && (
        <ConfirmCloseDialog
          isOpen={confirmClosePost}
          setIsOpen={() => setConfirmClosePost(!confirmClosePost)}
          offEditMode={() => setEditMode(false)}
        />
      )}
    </TransparentBackground>
  )
}

export default PostComponent
