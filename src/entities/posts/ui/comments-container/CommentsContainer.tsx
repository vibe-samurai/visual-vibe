import { Button, Typography, TextArea } from '@vibe-samurai/visual-ui-kit'
import React from 'react'

import { useUpdatePostDescriptionMutation } from '@/app/services'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'

import s from './CommentsContainer.module.scss'
import { setEditText } from '../../model'
import { postSelector } from '../../model/selectors/postSelector'
import CommentsBody from '../comments-body/CommentsBody'
import CommentsFooter from '../comments-footer/CommentsFooter'
import CommentsHeader from '../comments-header/CommentsHeader'

type Props = {
  post: Post
}
const CommentsContainer = ({ post }: Props) => {
  const dispatch = useAppDispatch()
  const editMode = useAppSelector(postSelector).editMode
  const editText = useAppSelector(postSelector).editText

  const [updatePost] = useUpdatePostDescriptionMutation()
  const updateDescriptionHandler = () => {
    updatePost({ description: editText, postId: post.id })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      dispatch(setEditText(e.target.value))
    }
  }

  return (
    <div className={`${s.commentsContainer} ${editMode && s.editMode}`}>
      <CommentsHeader post={post} />

      {editMode ? (
        <div className={s.editBody}>
          <Typography variant={'regular-text-14'} className={s.grayText}>
            Add publication descriptions
          </Typography>

          <TextArea value={editText} onChange={handleChange} style={{ height: '120px' }}></TextArea>

          <Typography variant={'small-text'} className={`${s.grayText} ${s.marginLeftAuto}`}>
            {editText.length}/500
          </Typography>
        </div>
      ) : (
        <CommentsBody post={post} />
      )}

      {editMode ? (
        <div className={s.editButton}>
          <Button onClick={updateDescriptionHandler}>Save Changes</Button>
        </div>
      ) : (
        <CommentsFooter post={post} />
      )}
    </div>
  )
}

export default CommentsContainer
