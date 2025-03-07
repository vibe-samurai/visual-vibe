import { Button, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { useGetLikesByPostIdQuery } from '@/app/services/vibeVisualApi'
import { useAppDispatch } from '@/app/store/store'
import { Post } from '@/entities/posts/types'
import { SaveButton } from '@/entities/posts/ui/save-button/SaveButton'
import { LikeButton } from '@/shared/components/like-button/LikeButton'
import { formatExactDate } from '@/shared/lib/date/formatExactDate'
import { SendButton } from '@public/icon/SendButton'

import s from './CommentsFooter.module.scss'
import { setLikesList, setLikesListOpen } from '../../model'
import LikesList from '../likes-list/LikesList'

type Props = {
  post: Post
}
const CommentsFooter = ({ post }: Props) => {
  const dispatch = useAppDispatch()

  const { data } = useGetLikesByPostIdQuery({ postId: post.id })

  if (!data) {
    return
  }

  const LikesListHandler = () => {
    dispatch(setLikesList(data.items ?? []))
    dispatch(setLikesListOpen(true))
  }

  return (
    <div className={s.commentsFooter}>
      <div className={s.commentsInfo}>
        <div className={s.commentsActions}>
          <LikeButton likeStatus={data.isLiked} updateLike={() => {}} big />
          <SendButton />
          <SaveButton />
        </div>
        <button onClick={LikesListHandler} type={'button'} className={s.commentsLikes}>
          <div className={s.likeOwnerPhotos}>
            {data.items.map((item, itemIndex) => {
              const avatars = item.avatars.length ? item.avatars : [{ url: '/default-avatar.png' }]

              return avatars.map((avatar, index) => (
                <Image
                  key={`${itemIndex}-${index}`}
                  className={s.likeOwnerPhoto}
                  src={avatar.url}
                  alt={'Like owner photo'}
                  width={36}
                  height={36}
                />
              ))
            })}
          </div>
          <Typography variant={'regular-text-14'} as={'span'}>
            {data.totalCount}{' '}
            <Typography variant={'bold-text-14'} as={'span'}>
              &quot;Like&quot;
            </Typography>
          </Typography>
        </button>
        <Typography className={s.grayText} variant={'small-text'}>
          {formatExactDate(post.createdAt)}
        </Typography>
      </div>
      <div className={s.commentsAddComment}>
        <Input className={s.addCommentInput} type={'text'} placeholder={'Add a Comment...'}></Input>
        <Button variant={'link'}>Publish</Button>
      </div>
      <LikesList />
    </div>
  )
}

export default CommentsFooter
