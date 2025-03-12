import { Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useGetAnswersByCommentIdQuery, useGetLikesByCommentIdQuery } from '@/app/services/'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { LikeButton } from '@/shared/components/like-button/LikeButton'
import ProfilePhoto from '@/shared/components/profile-photo/ProfilePhoto'

import s from './Coment.module.scss'
import Answer from '../answer/Answer'
import { setLikesList, setLikesListOpen } from '../posts/model'
import { Post } from '../posts/types'
import LikesList from '../posts/ui/likes-list/LikesList'
type Props = {
  commenter?: boolean
  photo: string
  text: string
  userName: string
  isLiked?: boolean
  date: string
  post: Post
  id: number
  answerCount?: number
}

const Comment = ({
  commenter = true,
  photo,
  text,
  userName,
  isLiked,
  date,
  post,
  id,
  answerCount,
}: Props) => {
  const [isOpenAnswers, setIsOpenAnswers] = useState(false)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const { data: likesData } = useGetLikesByCommentIdQuery({ postId: post.id, commentId: id })
  const { data: answersData } = useGetAnswersByCommentIdQuery({ postId: post.id, commentId: id })

  if (!likesData) {
    return
  }

  const LikesListHandler = () => {
    dispatch(setLikesList(likesData.items ?? []))
    dispatch(setLikesListOpen(true))
  }

  return (
    <div className={s.fullComment}>
      <div className={s.comment}>
        <ProfilePhoto photo={photo} />
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
            {commenter && likesData.items.length > 0 && (
              <Typography as={'button'} onClick={LikesListHandler} variant={'semi-bold-small-text'}>
                Like: {likesData.items.length}
              </Typography>
            )}
            {commenter && (
              <Typography as={'button'} variant={'semi-bold-small-text'}>
                Answer
              </Typography>
            )}
          </div>
        </div>
        {commenter && <LikeButton likeStatus={isLiked} updateLike={() => {}} />}
        <LikesList />
      </div>
      {commenter && answerCount !== undefined && answerCount > 0 && (
        <div className={s.answers}>
          <button
            onClick={() => {
              setIsOpenAnswers(!isOpenAnswers)
            }}
            className={s.answersButton}
            type={'button'}
          >
            <span className={s.answersLine}> </span>
            <Typography as={'span'} variant={'semi-bold-small-text'}>
              {isOpenAnswers ? 'Hide Answers' : `Show Answers`}
              {` (${answerCount})`}
            </Typography>
          </button>
          <div className={`${s.answersList} ${isOpenAnswers ? s.open : ''}`}>
            {answersData &&
              answersData.items.map(answer => {
                return (
                  <Answer
                    commentId={answer.commentId}
                    answerId={answer.id}
                    postId={post.id}
                    text={answer.content}
                    userName={answer.from.username}
                    date={answer.createdAt}
                    photo={
                      answer.from.avatars?.[1]?.url ||
                      answer.from.avatars?.[0]?.url ||
                      '/default-avatar.png'
                    }
                    key={answer.id}
                  ></Answer>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Comment
