import { Button, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React from 'react'

import { LikeButton } from '@/app/(pages)/post/my-post/LikeButton'
import { SaveButton } from '@/app/(pages)/post/my-post/SaveButton'
import { useGetLikesByPostIdQuery } from '@/app/services/vibeVisualApi'
import { Post } from '@/entities/posts/types'
import { formatExactDate } from '@/shared/lib/date/formatExactDate'
import { SendButton } from '@public/icon/SendButton'
import ProfileImage1 from '@public/images/my-post/profile-photo-1.png'

import s from './CommentsFooter.module.scss'

const defaultAvatarArray = [
  {
    url: ProfileImage1,
  },
]

type Props = {
  post: Post
}
const CommentsFooter = ({ post }: Props) => {
  const { data, error, isLoading } = useGetLikesByPostIdQuery({ postId: post.id })

  if (!data) {
    return
  }

  return (
    <div className={s.commentsFooter}>
      <div className={s.commentsInfo}>
        <div className={s.commentsActions}>
          <LikeButton like={post.isLiked} big />
          <SendButton />
          <SaveButton />
        </div>
        <a href={'#'} className={s.commentsLikes}>
          <div className={s.likeOwnerPhotos}>
            {data.items.map((item, itemIndex) =>
              (item.avatars.length ? item.avatars : defaultAvatarArray).map((avatar, index) => (
                <Image
                  key={`${itemIndex}-${index}`}
                  className={s.likeOwnerPhoto}
                  src={avatar.url}
                  alt={'Like owner photo'}
                  width={36}
                  height={36}
                />
              ))
            )}
          </div>
          <Typography variant={'regular-text-14'} as={'span'}>
            {data.totalCount}{' '}
            <Typography variant={'bold-text-14'} as={'span'}>
              &quot;Like&quot;
            </Typography>
          </Typography>
        </a>
        <Typography className={s.grayText} variant={'small-text'}>
          {formatExactDate(post.createdAt)}
        </Typography>
      </div>
      <div className={s.commentsAddComment}>
        <Input className={s.addCommentInput} type={'text'} placeholder={'Add a Comment...'}></Input>
        <Button variant={'link'}>Publish</Button>
      </div>
    </div>
  )
}

export default CommentsFooter
