import Image from 'next/image'
import React from 'react'

import { Post } from '@/entities/posts/types'

import s from './ProfilePhoto.module.scss'
type Props = {
  photo: string
}
const ProfilePhoto = ({ photo }: Props) => {
  return (
    <>
      <Image className={s.profilePhoto} src={photo} alt={'Profile Image'} width={36} height={36} />
    </>
  )
}

export default ProfilePhoto
