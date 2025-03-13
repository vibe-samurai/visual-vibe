'use client'

import { skipToken } from '@reduxjs/toolkit/query'
import { Loader } from '@vibe-samurai/visual-ui-kit'
import { useRouter, usePathname } from 'next/navigation'

import { useGetPostByIdQuery } from '@/app/services'
import { useAppSelector } from '@/app/store/store'
import { ConfirmCloseDialog } from '@/entities/posts/ui/confirm-close-dialog/ConfirmCloseDialog'
import { PostContainer } from '@/entities/posts/ui/post-container/PostContainer'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { TransparentBackground } from '@/shared/components/transparent-background/TransparentBackground'

import { Post } from '../posts/types'
import { postSelector } from './model/selectors/postSelector'

type Props = {
  postId?: number
  initialPost?: Post
}

export const PostComponent = ({ postId, initialPost }: Props) => {
  const router = useRouter()
  const confirmCloseEditing = useAppSelector(postSelector).confirmCloseEditing
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId ? { postId } : skipToken)
  const postData = post || initialPost

  if (isLoading) return <Loader />
  if (error || !postData) return <p>Post not found</p>

  return (
    <TransparentBackground isOpen={!!postId}>
      <PostContainer
        closePost={() => {
          router.replace('/')
        }}
        post={postData}
      />

      {confirmCloseEditing && <ConfirmCloseDialog />}
    </TransparentBackground>
  )
}
