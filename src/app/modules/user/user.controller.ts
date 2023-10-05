/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UsersService } from './user.service'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { ...user } = req.body
      const result = await UsersService.createUser(user)
      res.status(200).json({
        success: true,
        message: 'user create successfully',
        data: result,
      })
    } catch (error: any) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.phoneNumber
      ) {
        // MongoDB duplicate key error
        throw new ApiError(500, 'Phone Number already exist')
      }
    }
  }
)

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getAllUsers()
  console.log(req.user)

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UsersService.getSingleUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await UsersService.updateUser(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UsersService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  })
})

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
