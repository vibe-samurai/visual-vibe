import Image from 'next/image'
import React from 'react'

import { Post } from '@/entities/posts/types'

import s from './ProfilePhoto.module.scss'
type Props = {
  avatar: string
}
export const ProfilePhoto = ({ avatar }: Props) => {
  return (
    <>
      <Image
        className={s.profilePhoto}
        src={avatar}
        alt={'Profile Image'}
        width={36}
        height={36}
        priority
      />
    </>
  )
}
