import { Dialog, Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useDeletePostByIdMutation } from '@/app/services/vibeVisualApi'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { DeleteIcon } from '@public/icon/DeleteIcon'
import { EditIcon } from '@public/icon/EditIcon'

import s from './More.module.scss'
import { postSelector } from '../../model/selectors/postSelector'
import { setEditMode } from '../../model/slices/postSlice'
type Props = {
  id: number
}
const More = ({ id }: Props) => {
  const [isOpenMenu, setOpenMenu] = useState(false)
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false)

  const editMode = useAppSelector(postSelector).editMode
  const dispatch = useAppDispatch()

  const [deletePost] = useDeletePostByIdMutation()
  const editModeHandler = () => {
    dispatch(setEditMode(!editMode))
  }
  const deletePostHandler = () => {
    deletePost({ postId: id })
  }

  return (
    <div className={s.moreWrapper}>
      <div className={`${s.moreBody} ${isOpenMenu ? s.open : ''}`}>
        <button className={s.moreItem} type={'button'} onClick={editModeHandler}>
          <EditIcon />
          <Typography variant={'regular-text-14'} as={'span'}>
            Edit Post
          </Typography>
        </button>
        <button className={s.moreItem} type={'button'} onClick={() => setOpenDeleteDialog(true)}>
          <DeleteIcon />
          <Typography variant={'regular-text-14'} as={'span'}>
            Delete Post
          </Typography>
        </button>
      </div>
      <button type={'button'} onClick={() => setOpenMenu(!isOpenMenu)} className={s.moreDots}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <Dialog
        className={s.dialog}
        title={'Delete Post'}
        size={'sm'}
        open={isOpenDeleteDialog}
        onConfirmButtonClick={deletePostHandler}
        onCancelButtonClick={() => setOpenDeleteDialog(false)}
        onClose={() => setOpenDeleteDialog(false)}
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
