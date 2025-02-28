import { Card, Input, Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import CloseButton from '@/shared/components/close-button/CloseButton'

import s from './LikesList.module.scss'
import { LikeItem } from '../../types'
import LikeOwner from '../like-owner/LikeOwner'

type Props = {
  likesList: LikeItem[]
}
const LikesList = ({ likesList }: Props) => {
  return (
    <Card className={s.likesList}>
      <div className={s.likesListHeader}>
        <Typography variant={'h1'}>Likes</Typography>
        <CloseButton onClick={() => {}}></CloseButton>
      </div>
      <Input className={s.likesListInput} placeholder={'Search'}></Input>
      <div className={s.likeOwnersList}>
        {likesList.map((like, index) => {
          return (
            <LikeOwner
              followed
              key={index}
              name={like.userName}
              photo={like.avatars?.[1]?.url || like.avatars?.[0]?.url || '/default-avatar.png'}
            />
          )
        })}
      </div>
    </Card>
  )
}

export default LikesList
