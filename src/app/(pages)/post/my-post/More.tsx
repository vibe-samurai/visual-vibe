import { Dialog, Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useDeletePostByIdMutation } from '@/app/services/vibeVisualApi'
import { DeleteIcon } from '@public/icon/DeleteIcon'
import { EditIcon } from '@public/icon/EditIcon'

import s from './More.module.scss'
type Props = {
  id: number
}
const More = ({ id }: Props) => {
  const [isOpenBody, setOpenBody] = useState(false)
  const [isOpenDialog, setOpenDialog] = useState(true)
  const [deletePost] = useDeletePostByIdMutation()

  return (
    <div className={s.moreWrapper}>
      <div className={`${s.moreBody} ${isOpenBody ? s.open : ''}`}>
        <button className={s.moreItem} type={'button'}>
          <EditIcon />
          <Typography variant={'regular-text-14'} as={'span'}>
            Edit Post
          </Typography>
        </button>
        <button className={s.moreItem} type={'button'} onClick={() => setOpenDialog(true)}>
          <DeleteIcon />
          <Typography variant={'regular-text-14'} as={'span'}>
            Delete Post
          </Typography>
        </button>
      </div>
      <button type={'button'} onClick={() => setOpenBody(!isOpenBody)} className={s.moreDots}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <Dialog
        className={s.dialog}
        title={'Delete Post'}
        size={'sm'}
        open={isOpenDialog}
        onConfirmButtonClick={() => deletePost({ postId: id })}
        onCancelButtonClick={() => setOpenDialog(false)}
        onClose={() => setOpenDialog(false)}
        confirmButtonText={'Yes'}
        cancelButtonText={'No'}
      >
        <Typography as={'span'} variant={'regular-text-16'}>
          Are you sure you want to delete this post?
        </Typography>
      </Dialog>
    </div>
  )
}

export default More
