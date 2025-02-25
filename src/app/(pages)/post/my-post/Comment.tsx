import { Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React from 'react'

import { LikeButton } from '@/app/(pages)/post/my-post/LikeButton'

import s from './Coment.module.scss'

type Props = {
  commenter?: boolean
  photo: string
  text: string
  userName: string
  likeCount?: number
  isLiked?: boolean
  date: string
}

const Comment = ({ commenter = true, photo, text, userName, likeCount, isLiked, date }: Props) => {
  return (
    <div className={s.comment}>
      <Image className={s.profilePhoto} src={photo} alt={'Profile Image'} width={36} height={36} />
      <div className={s.commentBody}>
        <div className={s.commentText}>
          <Typography as={'span'} variant={'bold-text-14'}>
            {userName}
          </Typography>
          <Typography as={'span'} variant={'regular-text-14'}>
            {text}
          </Typography>
        </div>
        <div className={s.commentInfo}>
          <Typography variant={'small-text'}>{date}</Typography>
          {commenter && (
            <Typography as={'button'} variant={'semi-bold-small-text'}>
              Like: {likeCount}
            </Typography>
          )}
          {commenter && (
            <Typography as={'button'} variant={'semi-bold-small-text'}>
              Answer
            </Typography>
          )}
        </div>
      </div>
      {commenter && <LikeButton like={isLiked} />}
    </div>
  )
}

export default Comment
