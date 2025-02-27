import { Dialog, Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import s from './ConfirmClosePost.module.scss'

type Props = {
  isOpen: boolean
  setIsOpen: () => void
  offEditMode: () => void
}
const ConfirmClosePost = ({ isOpen, setIsOpen, offEditMode }: Props) => {
  const offEditModeHandler = () => {
    setIsOpen()
    offEditMode()
  }

  return (
    <div className={`${s.opacityLayout} ${isOpen && s.open}`}>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen()
        }}
        size={'md'}
        onConfirmButtonClick={offEditModeHandler}
        onCancelButtonClick={() => {
          setIsOpen()
        }}
        title={'Close Post'}
        confirmButtonText={'Yes'}
        cancelButtonText={'No'}
      >
        <Typography variant={'regular-text-16'}>
          Do you really want to close the edition of the publication? If you close changes won’t be
          saved
        </Typography>
      </Dialog>
    </div>
  )
}

export default ConfirmClosePost
