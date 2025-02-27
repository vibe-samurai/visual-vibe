import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import s from './EditPostHeader.module.scss'
import CloseButton from '../close-button/CloseButton'
type Props = {
  confirmClosePost: () => void
}
const EditPostHeader = ({ confirmClosePost }: Props) => {
  return (
    <div className={s.editHeader}>
      <Typography variant={'h1'}>Edit Post</Typography>
      <CloseButton onClick={confirmClosePost} />
    </div>
  )
}

export default EditPostHeader
