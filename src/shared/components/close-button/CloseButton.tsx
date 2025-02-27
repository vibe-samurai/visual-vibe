import React, { ComponentPropsWithoutRef } from 'react'

import { CloseIcon } from '@public/icon/CloseIcon'

import s from './CloseButton.module.scss'
type Props = ComponentPropsWithoutRef<'button'> & {
  onClick: () => void
}

const CloseButton = ({ onClick }: Props) => {
  return (
    <button type={'button'} className={s.closeButton} onClick={onClick}>
      <CloseIcon />
    </button>
  )
}

export default CloseButton
