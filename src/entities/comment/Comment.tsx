'use client'

import { Loader, Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import {
  useGetAnswersByCommentIdQuery,
  useLazyGetLikesByCommentIdQuery,
  useLazyGetAnswersByCommentIdQuery,
} from '@/app/services/'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/selectors'
import { LikeButton } from '@/shared/components/like-button/LikeButton'
import { ProfilePhoto } from '@/shared/components/profile-photo/ProfilePhoto'
import { formatDate } from '@/shared/lib/date/formatDate'

import s from './Coment.module.scss'
import { Answer } from '../answer/Answer'
import { Post, PostComment } from '../posts/types'
import { LikesList } from '../posts/ui/likes-list/LikesList'
type Props = {
  post: Post
  comment: PostComment
}

export const Comment = ({ post, comment }: Props) => {
  const [isOpenAnswers, setIsOpenAnswers] = useState(false)
  const isAuth = useAppSelector(selectIsAuthenticated)
  const [isOpenLikes, setIsOpenLikes] = useState(false)

  const [fetchLikes, { data: likesData, isFetching: likesIsLoading }] =
    useLazyGetLikesByCommentIdQuery()
  const [fetchAnswers, { data: answersData, isFetching: answersIsLoading }] =
    useLazyGetAnswersByCommentIdQuery()

  const likesListHandler = () => {
    setIsOpenLikes(true)
    fetchLikes({ postId: post.id, commentId: comment.id })
  }
  const answersListHandler = () => {
    setIsOpenAnswers(!isOpenAnswers)
    if (!isOpenAnswers) {
      fetchAnswers({ postId: post.id, commentId: comment.id })
    }
  }

  return (
    <div className={s.fullComment}>
      <div className={s.comment}>
        <ProfilePhoto
          avatar={
            comment.from.avatars?.[1]?.url ||
            comment.from.avatars?.[0]?.url ||
            '/default-avatar.png'
          }
        />
        <div className={s.commentBody}>
          <div className={s.commentText}>
            <Typography as={'span'} variant={'bold-text-14'}>
              {comment.from.username}
            </Typography>
            <Typography as={'span'} variant={'regular-text-14'}>
              {comment.content}
            </Typography>
          </div>
          <div className={s.commentInfo}>
            <Typography variant={'small-text'}>{formatDate(comment.createdAt)}</Typography>
            {isAuth && comment.likeCount > 0 && (
              <Typography as={'button'} onClick={likesListHandler} variant={'semi-bold-small-text'}>
                Like: {comment.likeCount}
              </Typography>
            )}
            {isAuth && (
              <Typography as={'button'} variant={'semi-bold-small-text'}>
                Answer
              </Typography>
            )}
          </div>
        </div>
        {isAuth && <LikeButton likeStatus={comment.isLiked} updateLike={() => {}} />}
        {comment.likeCount > 0 && likesData && (
          <LikesList
            likesList={likesData.items}
            onClose={() => {
              setIsOpenLikes(false)
            }}
            open={isOpenLikes}
          />
        )}
      </div>
      {comment.answerCount > 0 && (
        <div className={s.answers}>
          <button onClick={answersListHandler} className={s.answersButton} type={'button'}>
            <span className={s.answersLine}> </span>
            <Typography as={'span'} variant={'semi-bold-small-text'}>
              {isOpenAnswers ? 'Hide Answers' : `Show Answers`}
              {` (${comment.answerCount})`}
            </Typography>
          </button>
          <div className={`${s.answersList} ${isOpenAnswers ? s.open : ''}`}>
            {comment.answerCount > 0 &&
              answersData?.items.map(answer => {
                return <Answer answer={answer} postId={post.id} key={answer.id}></Answer>
              })}
          </div>
        </div>
      )}
    </div>
  )
}
