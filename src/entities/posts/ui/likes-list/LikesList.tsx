import { Card, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'
import { createPortal } from 'react-dom'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import CloseButton from '@/shared/components/close-button/CloseButton'
import TransparentBackground from '@/shared/components/transparent-background/TransparentBackground'

import s from './LikesList.module.scss'
import { clearLikesList, postSelector, setLikesListOpen } from '../../model'
import { LikeItem } from '../../types'
import LikeOwner from '../like-owner/LikeOwner'

const LikesList = () => {
  const dispatch = useAppDispatch()
  const likesList = useAppSelector(postSelector).likesList
  const likesListIsOpen = useAppSelector(postSelector).likesListIsOpen
  const likesListCloseHandler = () => {
    dispatch(setLikesListOpen(false))
    dispatch(clearLikesList())
  }

  return (
    <>
      {createPortal(
        <TransparentBackground isOpen={likesListIsOpen}>
          {' '}
          <Card className={s.likesList}>
            <div className={s.likesListHeader}>
              <Typography variant={'h1'}>Likes</Typography>
              <CloseButton onClick={likesListCloseHandler}></CloseButton>
            </div>
            <Input className={s.likesListInput} placeholder={'Search'}></Input>
            <div className={s.likeOwnersList}>
              {likesList.map(like => {
                return (
                  <LikeOwner
                    followed
                    key={like.id}
                    name={like.userName}
                    photo={
                      like.avatars?.[1]?.url || like.avatars?.[0]?.url || '/default-avatar.png'
                    }
                  />
                )
              })}
            </div>
          </Card>
        </TransparentBackground>,
        document.body
      )}
    </>
  )
}

export default LikesList
