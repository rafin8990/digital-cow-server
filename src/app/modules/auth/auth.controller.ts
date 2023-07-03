import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.service'

const LoginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body
    const result = await AuthService.loginUser(loginData)

    const { refreshToken, ...others } = result

    // set refresh token into the cookie

    const cookieOption = {
      secure: config.env === 'production' ? true : false,
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOption)

    // delete refresh token
    if ('refreshToken' in result) {
      delete result.refreshToken
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully',
      data: others,
    })
  }
)

export const AuthController = {
  LoginUser,
}
