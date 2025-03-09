import { useState } from 'react'

import { useAppSelector } from '@/app/store/store'
import ConfirmCloseDialog from '@/entities/posts/ui/confirm-close-dialog/ConfirmCloseDialog'
import PostContainer from '@/entities/posts/ui/post-container/PostContainer'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import TransparentBackground from '@/shared/components/transparent-background/TransparentBackground'

import { postSelector } from './model/selectors/postSelector'
import { Post } from './types'

type Props = {
  post: Post
}

export const PostComponent = ({ post }: Props) => {
  const confirmCloseEditing = useAppSelector(postSelector).confirmCloseEditing
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <TransparentBackground isOpen={isOpen}>
      <PostContainer
        closePost={() => {
          setIsOpen(false)
        }}
        post={post}
      />

      {isAuthenticated && confirmCloseEditing && <ConfirmCloseDialog />}
    </TransparentBackground>
  )
}

export default PostComponent
