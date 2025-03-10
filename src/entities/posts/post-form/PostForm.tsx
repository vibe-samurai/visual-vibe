import { Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'

import { PATH } from '@/shared/constants/PATH'
import CloseIcon from '@public/icon/CloseIcon'

import s from './PostForm.module.scss'

export const PostForm = () => {
  const { replace } = useRouter()
  const handleClose = () => {
    replace(PATH.HOME)
  }

  return (
    <div className={s.postFormWrapper}>
      <div className={s.title}>
        <Typography variant={'h1'}>Add Photo</Typography>
        <button type={'button'} onClick={handleClose} className={s.closeButton}>
          <CloseIcon />
        </button>
        <form></form>
      </div>
    </div>
  )
}
