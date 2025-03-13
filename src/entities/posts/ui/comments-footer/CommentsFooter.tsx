import { Button, Input, Typography, Loader } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React, { useState } from 'react'

import { useGetLikesByPostIdQuery } from '@/app/services'
import { useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'
import { SaveButton } from '@/entities/posts/ui/save-button/SaveButton'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { LikeButton } from '@/shared/components/like-button/LikeButton'
import { formatExactDate } from '@/shared/lib/date/formatExactDate'
import { SendButton } from '@public/icon/SendButton'

import s from './CommentsFooter.module.scss'
import { LikesList } from '../likes-list/LikesList'

type Props = {
  post: Post
}
export const CommentsFooter = ({ post }: Props) => {
  const [isOpenLikes, setIsOpenLikes] = useState(false)
  const isAuth = useAppSelector(selectIsAuthenticated)
  const { data, isFetching } = useGetLikesByPostIdQuery({ postId: post.id })

  if (!data) {
    return
  }

  if (isFetching) return <Loader />

  const LikesListHandler = () => {
    setIsOpenLikes(true)
  }

  return (
    <div className={s.commentsFooter}>
      <div className={s.commentsInfo}>
        {isAuth && (
          <div className={s.commentsActions}>
            <LikeButton likeStatus={data.isLiked} updateLike={() => {}} big />
            <SendButton />
            <SaveButton />
          </div>
        )}
        {data.totalCount > 0 && (
          <button
            onClick={isAuth ? LikesListHandler : () => {}}
            type={'button'}
            className={s.commentsLikes}
          >
            <div className={s.likeOwnerPhotos}>
              {data.items.map(item => {
                const avatars = item.avatars.length
                  ? item.avatars
                  : [{ url: '/default-avatar.png' }]

                return avatars.map(avatar => (
                  <Image
                    key={item.id}
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
        )}

        <Typography className={s.grayText} variant={'small-text'}>
          {formatExactDate(post.createdAt)}
        </Typography>
      </div>
      {isAuth && (
        <div className={s.commentsAddComment}>
          <Input
            className={s.addCommentInput}
            type={'text'}
            placeholder={'Add a Comment...'}
          ></Input>
          <Button variant={'link'}>Publish</Button>
        </div>
      )}
      <LikesList
        likesList={data.items}
        onClose={() => {
          setIsOpenLikes(false)
        }}
        open={isOpenLikes}
      />
    </div>
  )
}
