import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useUpdatePostDescriptionMutation } from '@/app/services/vibeVisualApi'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { Post } from '@/entities/posts/types'

import s from './CommentsContainer.module.scss'
import { postSelector } from '../../model/selectors/postSelector'
import { setEditMode } from '../../model/slices/postSlice'
import CommentsBody from '../comments-body/CommentsBody'
import CommentsFooter from '../comments-footer/CommentsFooter'
import CommentsHeader from '../comments-header/CommentsHeader'

type Props = {
  post: Post
}
const CommentsContainer = ({ post }: Props) => {
  const [text, setText] = useState('')
  const editMode = useAppSelector(postSelector).editMode

  const [updatePost] = useUpdatePostDescriptionMutation()
  const updateDescriptionHandler = () => {
    updatePost({ description: text, postId: post.id })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setText(e.target.value)
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

          <textarea value={text} onChange={handleChange} className={s.editTextarea} />
          <Typography variant={'small-text'} className={`${s.grayText} ${s.marginLeftAuto}`}>
            {text.length}/500
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
