export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type GoogleOAuthRequest = {
  redirectUrl?: string
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

export type SignUpResponse = {
  userName: string
  email: string
  password: string
}

export type EmailConfirmResponse = {
  confirmationCode: string
}

export type ConfirmResponse = {
  data: { statusCode: number; messages: Array<{ field: string; message: string }> }
  status: number
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
