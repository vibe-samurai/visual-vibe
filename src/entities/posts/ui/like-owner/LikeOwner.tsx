import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import ProfilePhoto from '@/shared/components/profile-photo/ProfilePhoto'

import s from './LikeOwner.module.scss'
type Props = {
  followed: boolean
  photo: string
  name: string
}
const LikeOwner = ({ followed, photo, name }: Props) => {
  return (
    <div className={s.LikeOwner}>
      <ProfilePhoto photo={photo} />
      <Typography variant={'regular-text-16'}>{name}</Typography>
      <Button className={s.marginLeftAuto} variant={followed ? 'outlined' : 'primary'}>
        {followed ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  )
}

export default LikeOwner
