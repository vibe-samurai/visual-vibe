import { ComponentPropsWithoutRef, useState } from 'react'

import { LikeIconFill } from '@public/icon/LikeIconFill'
import { LikeIconOutline } from '@public/icon/LikeIconOutline'

import s from './LikeButton.module.scss'
type Props = ComponentPropsWithoutRef<'button'> & {
  likeStatus?: boolean
  big?: boolean
  updateLike: () => void
}
export const LikeButton = ({ likeStatus, big = false, updateLike, ...props }: Props) => {
  return (
    <button
      type={'button'}
      className={`${s.likeButton} ${big ? s.big : ''}`}
      onClick={updateLike}
      {...props}
    >
      {likeStatus ? <LikeIconFill /> : <LikeIconOutline />}
    </button>
  )
}
