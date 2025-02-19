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
