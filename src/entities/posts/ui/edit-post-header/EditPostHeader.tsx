import { Typography } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import CloseButton from '@/shared/components/close-button/CloseButton'

import s from './EditPostHeader.module.scss'

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
