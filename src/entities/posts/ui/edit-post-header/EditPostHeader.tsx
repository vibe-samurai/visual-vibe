import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useAppDispatch } from '@/app/store/store'
import CloseButton from '@/shared/components/close-button/CloseButton'

import s from './EditPostHeader.module.scss'
import { setConfirmCloseEditing } from '../../model'

const EditPostHeader = () => {
  const dispatch = useAppDispatch()

  const closeConfirmDialog = () => {
    dispatch(setConfirmCloseEditing(true))
  }

  return (
    <div className={s.editHeader}>
      <Typography variant={'h1'}>Edit Post</Typography>
      <CloseButton onClick={closeConfirmDialog} />
    </div>
  )
}

export default EditPostHeader
