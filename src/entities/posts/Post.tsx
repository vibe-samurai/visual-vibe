import { useState } from 'react'

import { useAppSelector } from '@/app/store/store'
import ConfirmCloseDialog from '@/entities/posts/ui/confirm-close-dialog/ConfirmCloseDialog'
import PostContainer from '@/entities/posts/ui/post-container/PostContainer'
import CloseButton from '@/shared/components/close-button/CloseButton'
import TransparentBackground from '@/shared/components/transparent-background/TransparentBackground'

import { postSelector } from './model/selectors/postSelector'
import { Post } from './types'

type Props = {
  post: Post
}

export const PostComponent = ({ post }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const editMode = useAppSelector(postSelector).editMode
  const confirmCloseEditing = useAppSelector(postSelector).confirmCloseEditing

  return (
    <TransparentBackground isOpen={isOpen}>
      {editMode || <CloseButton onClick={() => setIsOpen(false)} />}

      <PostContainer post={post} />

      {confirmCloseEditing && <ConfirmCloseDialog />}
    </TransparentBackground>
  )
}

export default PostComponent
