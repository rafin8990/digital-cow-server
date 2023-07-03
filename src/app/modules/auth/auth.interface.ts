export type ILogin = {
  phoneNumber: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string
  refreshToken?: string
  needsPasswordChange?: boolean
}
