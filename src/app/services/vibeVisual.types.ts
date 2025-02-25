export type UpdateTokenResponse = {
  data: { accessToken: string }
}

export type RecoveryPasswordData = {
  email: string
  recaptcha: string
  baseUrl: string
}

export type RecoveryPasswordResending = Omit<RecoveryPasswordData, 'recaptcha'>

export type NewPasswordData = {
  newPassword: string
  recoveryCode: string
}
export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: PostImage[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: PostOwner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type PostOwner = {
  firstName: string
  lastName: string
}

export type From = {
  id: number
  username: string
  avatars: CommentatorAvatar[]
}

export type PostComment = {
  id: number
  postId: number
  from: From
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type PostComments = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: PostComment[]
}

export type CommentatorAvatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type PostLikes = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor?: unknown
  items: Item[]
  isLiked: boolean
}

export type Item = {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: CommentatorAvatar[]
  isFollowing: boolean
  isFollowedBy: boolean
}
