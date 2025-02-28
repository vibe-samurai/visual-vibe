import { Dialog, Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import TransparentBackground from '@/shared/components/transparent-background/TransparentBackground'

import s from './ConfirmCloseDialog.module.scss'

type Props = {
  isOpen: boolean
  setIsOpen: () => void
  offEditMode: () => void
}
const ConfirmCloseDialog = ({ isOpen, setIsOpen, offEditMode }: Props) => {
  const offEditModeHandler = () => {
    setIsOpen()
    offEditMode()
  }

  return (
    <TransparentBackground isOpen={isOpen}>
      <Dialog
        className={s.dialog}
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
    </TransparentBackground>
  )
}

export default ConfirmCloseDialog
