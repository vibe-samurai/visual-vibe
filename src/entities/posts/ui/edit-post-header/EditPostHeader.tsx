import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import CloseButton from '@/shared/components/close-button/CloseButton'

import s from './EditPostHeader.module.scss'
import { postSelector, setConfirmCloseEditing, setEditMode, setEditText } from '../../model'

const EditPostHeader = () => {
  const dispatch = useAppDispatch()
  const editText = useAppSelector(postSelector).editText

  const closeConfirmDialog = () => {
    if (editText.trim().length > 0) {
      dispatch(setConfirmCloseEditing(true))
    } else {
      dispatch(setEditMode(false))
      dispatch(setEditText(''))
    }
  }

  return (
    <div className={s.editHeader}>
      <Typography variant={'h1'}>Edit Post</Typography>
      <CloseButton onClick={closeConfirmDialog} />
    </div>
  )
}

export default EditPostHeader
