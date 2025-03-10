'use client'
import { Card } from '@vibe-samurai/visual-ui-kit'

import { PostForm } from '@/entities/posts'

import s from './CreatePost.module.scss'

export default function CreatePost() {
  return (
    <div className={s.overlay}>
      <Card className={s.postFormWrapper}>
        <PostForm />
      </Card>
    </div>
  )
}
