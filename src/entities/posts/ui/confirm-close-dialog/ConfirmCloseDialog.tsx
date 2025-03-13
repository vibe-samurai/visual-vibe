import { Dialog, Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'

import s from './ConfirmCloseDialog.module.scss'
import { postSelector } from '../../model/selectors/postSelector'
import { setConfirmCloseEditing, setEditMode, setEditText } from '../../model/slices/postSlice'

export const ConfirmCloseDialog = () => {
  const confirmCloseEditing = useAppSelector(postSelector).confirmCloseEditing
  const dispatch = useAppDispatch()

  const closeConfirmDialog = () => {
    dispatch(setConfirmCloseEditing(!confirmCloseEditing))
  }

  const offEditModeHandler = () => {
    closeConfirmDialog()
    dispatch(setEditText(''))
    dispatch(setEditMode(false))
  }

  return (
    <Dialog
      className={s.dialog}
      open={confirmCloseEditing}
      onClose={closeConfirmDialog}
      size={'md'}
      onConfirmButtonClick={offEditModeHandler}
      onCancelButtonClick={closeConfirmDialog}
      title={'Close Post'}
      confirmButtonText={'Yes'}
      cancelButtonText={'No'}
    >
      <Typography variant={'regular-text-16'}>
        Do you really want to close the edition of the publication? If you close changes won’t be
        saved
      </Typography>
    </Dialog>
  )
}
