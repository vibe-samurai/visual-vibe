'use client'

import { Button, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React, { use } from 'react'

import Comment from '@/app/(pages)/post/my-post/Comment'
import { LikeButton } from '@/app/(pages)/post/my-post/LikeButton'
import {
  useGetCommentsByPostIdQuery,
  useGetLikesByPostIdQuery,
  useGetPostByIdQuery,
} from '@/app/services/vibeVisualApi'
import PostSlider from '@/shared/components/post-slider/PostSlider'
import { CloseIcon } from '@public/icon/CloseIcon'
import { SendButton } from '@public/icon/SendButton'
import ProfileImage2 from '@public/images/my-post/profile-photo-2.png'

import s from './page.module.scss'
import More from '../my-post/More'
import { SaveButton } from '../my-post/SaveButton'

const defaultAvatarArray = [
  {
    url: ProfileImage2,
  },
]

const formatExactDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
const formatDate = (isoString: string): string => {
  const now = new Date()
  const date = new Date(isoString)

  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else {
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`
  }
}

type PostPageProps = {
  params: Promise<{ id: string }>
}

const MyPost = ({ params }: PostPageProps) => {
  const { id } = use(params)

  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useGetPostByIdQuery({ postId: +id })
  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsIsLoading,
  } = useGetCommentsByPostIdQuery({ postId: +id })
  const {
    data: likesData,
    error: likesError,
    isLoading: likesIsLoading,
  } = useGetLikesByPostIdQuery({ postId: +id })

  if (!postData || !commentsData || !likesData) {
    console.log('data undefined')

    return
  }

  return (
    <div className={s.opacityLayout}>
      <button type={'button'} className={s.closeButton}>
        <CloseIcon />
      </button>

      <div className={s.postContainer}>
        <PostSlider images={postData.images} />

        <div className={s.commentsContainer}>
          <div className={s.commetsHeader}>
            <Image
              className={s.profilePhoto}
              src={postData.avatarOwner}
              alt={'Profile Image'}
              width={36}
              height={36}
            />
            <Typography variant={'h3'}>{postData.userName}</Typography>
            <More id={+id} />
          </div>

          <div className={s.commentsBody}>
            <Comment
              commenter={false}
              photo={postData.avatarOwner}
              text={postData.description}
              userName={postData.userName}
              date={formatDate(postData.createdAt)}
            />
            {commentsData.items.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  commenter
                  photo={
                    comment.from.avatars?.[1]?.url ||
                    comment.from.avatars?.[0]?.url ||
                    '/default-avatar.png'
                  }
                  text={comment.content}
                  userName={comment.from.username}
                  isLiked={comment.isLiked}
                  likeCount={comment.likeCount}
                  date={formatDate(comment.createdAt)}
                />
              )
            })}
          </div>

          <div className={s.commentsFooter}>
            <div className={s.commentsInfo}>
              <div className={s.commentsActions}>
                <LikeButton like={postData.isLiked} big />
                <SendButton />
                <SaveButton />
              </div>
              <a href={'#'} className={s.commentsLikes}>
                <div className={s.likeOwnerPhotos}>
                  {likesData.items.map((item, itemIndex) =>
                    (item.avatars.length ? item.avatars : defaultAvatarArray).map(
                      (avatar, index) => (
                        <Image
                          key={`${itemIndex}-${index}`} // Создаём уникальный ключ
                          className={s.likeOwnerPhoto}
                          src={avatar.url}
                          alt={'Like owner photo'}
                          width={36}
                          height={36}
                        />
                      )
                    )
                  )}
                </div>
                <Typography variant={'regular-text-14'} as={'span'}>
                  {likesData.totalCount}{' '}
                  <Typography variant={'bold-text-14'} as={'span'}>
                    &quot;Like&quot;
                  </Typography>
                </Typography>
              </a>
              <Typography className={s.commentsDate} variant={'small-text'}>
                {formatExactDate(postData.createdAt)}
              </Typography>
            </div>
            <div className={s.commentsAddComment}>
              <Input
                className={s.addCommentInput}
                type={'text'}
                placeholder={'Add a Comment...'}
              ></Input>
              <Button variant={'link'}>Publish</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPost
