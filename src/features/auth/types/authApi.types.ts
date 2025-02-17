export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type GoogleOAuthRequest = {
  baseUrl?: string
  code: string | string[] | undefined
}

export type GoogleOAuthResponse = {
  accessToken: string
  email: string
}

export type MeResponse = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}
