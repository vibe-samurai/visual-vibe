import { Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useGetAnswersLikesByIdQuery, useLazyGetAnswersLikesByIdQuery } from '@/app/services'
import { useAppSelector } from '@/app/store/store'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { LikeButton } from '@/shared/components'
import { ProfilePhoto } from '@/shared/components/profile-photo/ProfilePhoto'
import { formatDate } from '@/shared/lib/date/formatDate'

import s from './Answer.module.scss'
import { AnswerItem } from '../posts/types'
import { LikesList } from '../posts/ui/likes-list/LikesList'

type Props = {
  answer: AnswerItem
  postId: number
}

export const Answer = ({ answer, postId }: Props) => {
  const [isOpenLikes, setIsOpenLikes] = useState(false)
  const [fetchLikes, { data }] = useLazyGetAnswersLikesByIdQuery()
  const isAuth = useAppSelector(selectIsAuthenticated)

  const handleLikesList = () => {
    setIsOpenLikes(true)
    fetchLikes({ postId, commentId: answer.commentId, answerId: answer.id })
  }

  return (
    <div className={s.answer}>
      <ProfilePhoto
        avatar={
          answer.from.avatars?.[1]?.url || answer.from.avatars?.[0]?.url || '/default-avatar.png'
        }
      />
      <div className={s.answerBody}>
        <div className={s.answerText}>
          <Typography as={'span'} variant={'bold-text-14'}>
            {answer.from.username}
          </Typography>
          <Typography as={'span'} variant={'regular-text-14'}>
            {answer.content}
          </Typography>
        </div>
        <div className={s.answerInfo}>
          <Typography variant={'small-text'}>{formatDate(answer.createdAt)}</Typography>
          {answer.likeCount > 0 && (
            <Typography as={'button'} onClick={handleLikesList} variant={'semi-bold-small-text'}>
              Like: {answer.likeCount}
            </Typography>
          )}
          {isAuth && (
            <Typography as={'button'} variant={'semi-bold-small-text'}>
              Answer
            </Typography>
          )}
        </div>
      </div>
      {isAuth && (
        <>
          <LikeButton likeStatus={answer.isLiked} updateLike={() => {}} />
          {answer.likeCount > 0 && (
            <LikesList
              likesList={data?.items || []}
              onClose={() => setIsOpenLikes(false)}
              open={isOpenLikes}
            />
          )}
        </>
      )}
    </div>
  )
}
