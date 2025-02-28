import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useUpdatePostDescriptionMutation } from '@/app/services/vibeVisualApi'
import { Post } from '@/entities/posts/types'

import s from './CommentsContainer.module.scss'
import CommentsBody from '../comments-body/CommentsBody'
import CommentsFooter from '../comments-footer/CommentsFooter'
import CommentsHeader from '../comments-header/CommentsHeader'

type Props = {
  editMode: boolean
  post: Post
  setEditMode: () => void
}
const CommentsContainer = ({ editMode, post, setEditMode }: Props) => {
  const [text, setText] = useState('')

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
      <CommentsHeader post={post} editMode={editMode} setEditMode={setEditMode} />

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
