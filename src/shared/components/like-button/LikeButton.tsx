import { ComponentPropsWithoutRef, useState } from 'react'

import { LikeIconFill } from '@public/icon/LikeIconFill'
import { LikeIconOutline } from '@public/icon/LikeIconOutline'

import s from './LikeButton.module.scss'
type Props = ComponentPropsWithoutRef<'button'> & {
  like?: boolean
  big?: boolean
}
export const LikeButton = ({ like = false, big = false, ...props }: Props) => {
  const [likeStatus, setLikeStatus] = useState<boolean>(like)

  return (
    <button
      type={'button'}
      className={`${s.likeButton} ${big ? s.big : ''}`}
      onClick={() => setLikeStatus(!likeStatus)}
      {...props}
    >
      {likeStatus ? <LikeIconFill /> : <LikeIconOutline />}
    </button>
  )
}
