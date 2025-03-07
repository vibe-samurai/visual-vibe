import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useGetAnswersLikesByIdQuery } from '@/app/services/vibeVisualApi'
import { useAppDispatch } from '@/app/store/store'
import { LikeButton } from '@/shared/components'
import ProfilePhoto from '@/shared/components/profile-photo/ProfilePhoto'

import s from './Answer.module.scss'
import { setLikesList, setLikesListOpen } from '../posts/model'
import LikesList from '../posts/ui/likes-list/LikesList'
type Props = {
  photo: string
  text: string
  userName: string
  isLiked?: boolean
  date: string
  commentId: number
  answerId: number
  postId: number
}
const Answer = ({ photo, text, userName, isLiked, date, commentId, answerId, postId }: Props) => {
  const dispatch = useAppDispatch()
  const { data } = useGetAnswersLikesByIdQuery({ postId, commentId, answerId })

  if (!data) {
    return
  }
  const LikesListHandler = () => {
    dispatch(setLikesList(data.items ?? []))
    dispatch(setLikesListOpen(true))
  }

  return (
    <div className={s.answer}>
      <ProfilePhoto photo={photo} />
      <div className={s.answerBody}>
        <div className={s.answerText}>
          <Typography as={'span'} variant={'bold-text-14'}>
            {userName}
          </Typography>
          <Typography as={'span'} variant={'regular-text-14'}>
            {text}
          </Typography>
        </div>
        <div className={s.answerInfo}>
          <Typography variant={'small-text'}>{date}</Typography>
          {data.items.length > 0 && (
            <Typography as={'button'} onClick={LikesListHandler} variant={'semi-bold-small-text'}>
              Like: {data.items.length}
            </Typography>
          )}

          <Typography as={'button'} variant={'semi-bold-small-text'}>
            Answer
          </Typography>
        </div>
      </div>
      <LikeButton likeStatus={isLiked} updateLike={() => {}} />
      <LikesList />
    </div>
  )
}

export default Answer
