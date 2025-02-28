import { Button, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React from 'react'

import { useGetLikesByPostIdQuery, useUpdatePostLikeMutation } from '@/app/services/vibeVisualApi'
import { Post } from '@/entities/posts/types'
import { SaveButton } from '@/entities/posts/ui/save-button/SaveButton'
import { LikeButton } from '@/shared/components/like-button/LikeButton'
import { formatExactDate } from '@/shared/lib/date/formatExactDate'
import { SendButton } from '@public/icon/SendButton'
import ProfileImage1 from '@public/images/my-post/profile-photo-1.png'

import s from './CommentsFooter.module.scss'
import LikesList from '../likes-list/LikesList'

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
  const [updateLike] = useUpdatePostLikeMutation()

  if (!data) {
    return
  }

  return (
    <div className={s.commentsFooter}>
      <div className={s.commentsInfo}>
        <div className={s.commentsActions}>
          <LikeButton
            likeStatus={data.isLiked}
            updateLike={() => {
              updateLike({ postId: post.id, likeStatus: 'NONE' })
            }}
            big
          />
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
      <LikesList likesList={data.items} />
    </div>
  )
}

export default CommentsFooter
