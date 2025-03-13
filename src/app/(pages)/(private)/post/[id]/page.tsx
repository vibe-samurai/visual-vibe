import React, { use } from 'react'

import { PostComponent } from '@/entities/posts/Post'

// type Props = {
//   params: Promise<{ id?: string }>
// }

// const PostPage = ({ params }: Props) => {
//   const { id } = use(params)
//    const postId = id ? Number(id) : undefined

//   return <Post postId={postId} />
// }

// export default PostPage

const PostPage = async ({ params }: { params: { id?: string } }) => {
  const { id } = await params
  const postId = id ? Number(id) : undefined
  let initialPostData = null

  if (postId) {
    const response = await fetch(`https://inctagram.work/api/v1/public-posts/${postId}`)

    initialPostData = await response.json()
  }

  return <PostComponent postId={postId} initialPost={initialPostData} />
}

export default PostPage
