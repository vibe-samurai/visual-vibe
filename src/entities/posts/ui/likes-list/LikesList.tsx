import { Card, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'
import { createPortal } from 'react-dom'

import { CloseButton } from '@/shared/components/close-button/CloseButton'
import { TransparentBackground } from '@/shared/components/transparent-background/TransparentBackground'

import s from './LikesList.module.scss'
import { LikeItem } from '../../types'
import { LikeOwner } from '../like-owner/LikeOwner'
type Props = {
  open: boolean
  onClose: () => void
  likesList: LikeItem[]
}
export const LikesList = ({ open, onClose, likesList }: Props) => {
  return createPortal(
    <TransparentBackground isOpen={open}>
      {' '}
      <Card className={s.likesList}>
        <div className={s.likesListHeader}>
          <Typography variant={'h1'}>Likes</Typography>
          <CloseButton onClick={onClose}></CloseButton>
        </div>
        <Input className={s.likesListInput} placeholder={'Search'}></Input>
        <div className={s.likeOwnersList}>
          {likesList.map(like => {
            return (
              <LikeOwner
                followed
                key={like.id}
                name={like.userName}
                avatar={
                  like.avatars?.[1]?.url || like.avatars?.[0]?.url || '/images/default-avatar.ong'
                }
              />
            )
          })}
        </div>
      </Card>
    </TransparentBackground>,
    document.body
  )
}
