import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helper/jwtHelper'
import { User } from '../user/user.model'
import {
  ILogin,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'

const loginUser = async (payload: ILogin): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload
  const user = new User()

  const isUserExist = await user.isUserExist(phoneNumber)
  // check user exist in the database s
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not exist')
  }

  // check password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create a access and refresh token
  const accessToken = jwtHelpers.createToken(
    { phoneNumber: isUserExist.phoneNumber, role: isUserExist.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )
  const { needsPasswordChange } = isUserExist
  const refreshToken = jwtHelpers.createToken(
    { phoneNumber: isUserExist.phoneNumber, role: isUserExist.role },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User()
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token')
  }

  // checking deleted users refresh token
  const { phoneNumber } = verifiedToken
  const isUserExist = await user.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { phoneNumber: isUserExist.phoneNumber, role: isUserExist.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}
export const AuthService = {
  loginUser,
  refreshToken,
}
